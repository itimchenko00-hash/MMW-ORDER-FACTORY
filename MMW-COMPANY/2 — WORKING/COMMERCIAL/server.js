const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { Pool } = require("pg");

const PORT = Number(process.env.PORT || 3000);
const DATABASE_URL = process.env.DATABASE_URL || "";
const ACCESS_CODE_SECRET = process.env.ACCESS_CODE_SECRET || DATABASE_URL;
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || "itimchenko00@gmail.com";
const COMPANY_NAME = "MMW-COMPANY";
const COMPANY_TAGLINE = "Развитие проектов от возможности до результата";

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("render.com") ? { rejectUnauthorized: false } : undefined,
      max: 5
    })
  : null;

const schemaPath = path.join(__dirname, "schema.sql");

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function text(res, status, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, {"Content-Type": contentType, "Cache-Control": "no-store"});
  res.end(body);
}

function normalizePhone(value) {
  const raw = String(value || "").trim();
  const compact = raw.replace(/[\s().-]/g, "");
  if (/^00[1-9][0-9]{7,14}$/.test(compact)) return "+" + compact.slice(2);
  if (/^\+[1-9][0-9]{7,14}$/.test(compact)) return compact;
  throw new Error("invalid_phone");
}

function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error("invalid_email");
  }
  return email;
}

function normalizeName(value) {
  const name = String(value || "").trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 160) throw new Error("invalid_name");
  return name;
}

function normalizeItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) throw new Error("invalid_items");
  const seen = new Set();
  return items.map((item) => {
    const id = String(item?.id || "").trim();
    const quantity = Number(item?.quantity);
    if (!id || seen.has(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
      throw new Error("invalid_items");
    }
    seen.add(id);
    return { id, quantity };
  });
}

function makeOrderNumber() {
  const first = String(crypto.randomInt(1, 10));
  let rest = "";
  for (let i = 0; i < 11; i++) rest += String(crypto.randomInt(0, 10));
  return first + rest;
}

function deriveAccessCode(orderNumber) {
  const key = ACCESS_CODE_SECRET || "MMW-COMPANY-commercial-development-secret";
  const digest = crypto.createHmac("sha256", key).update(orderNumber).digest();
  return String(digest.readUInt32BE(0) % 100000).padStart(5, "0");
}

function hashAccessCode(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

function safeEqualHex(a, b) {
  const aa = Buffer.from(String(a), "hex");
  const bb = Buffer.from(String(b), "hex");
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 256 * 1024) throw new Error("payload_too_large");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function ensureSchema() {
  if (!pool) return false;
  const schema = fs.readFileSync(schemaPath, "utf8");
  await pool.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");
  await pool.query(schema);
  return true;
}

async function getCatalog() {
  if (!pool) return {version: 3, status: "not_configured", currency: "UAH", items: []};
  const result = await pool.query(
    `SELECT id, kind, project, name, description, price_uah, price_note, sort_order
     FROM catalog_items WHERE active = TRUE
     ORDER BY sort_order ASC, id ASC`
  );
  return {
    version: 3,
    status: "ready",
    currency: "UAH",
    items: result.rows.map((row) => ({...row, price_uah: Number(row.price_uah)}))
  };
}

async function getOrCreateCustomer(client, name, phone, email) {
  const existing = await client.query(
    `SELECT id FROM customers WHERE phone_e164 = $1 AND email = $2 ORDER BY created_at ASC LIMIT 1`,
    [phone, email]
  );
  if (existing.rowCount) {
    await client.query("UPDATE customers SET name = $1 WHERE id = $2", [name, existing.rows[0].id]);
    return existing.rows[0].id;
  }
  const created = await client.query(
    `INSERT INTO customers (name, phone_e164, email) VALUES ($1, $2, $3) RETURNING id`,
    [name, phone, email]
  );
  return created.rows[0].id;
}

async function uniqueOrderNumber(client) {
  for (let attempt = 0; attempt < 30; attempt++) {
    const number = makeOrderNumber();
    const found = await client.query("SELECT 1 FROM orders WHERE order_number = $1 LIMIT 1", [number]);
    if (!found.rowCount) return number;
  }
  throw new Error("order_number_generation_failed");
}

async function createOrder(input) {
  if (!pool) {
    const e = new Error("database_not_configured"); e.status = 503; throw e;
  }

  const name = normalizeName(input?.name);
  const phone = normalizePhone(input?.phone);
  const email = normalizeEmail(input?.email);
  const note = input?.comment == null ? "" : String(input.comment).trim();
  const project = input?.project == null ? null : String(input.project).trim().slice(0, 160);
  if (note.length > 2000) throw new Error("invalid_comment");

  const requested = normalizeItems(input.items);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const ids = requested.map((item) => item.id);
    const catalog = await client.query(
      `SELECT id, kind, project, name, description, price_uah
       FROM catalog_items
       WHERE active = TRUE AND id = ANY($1::text[])
       FOR SHARE`,
      [ids]
    );
    const byId = new Map(catalog.rows.map((row) => [row.id, row]));
    if (byId.size !== ids.length) throw new Error("catalog_item_unavailable");

    const lines = requested.map((item) => {
      const row = byId.get(item.id);
      const unit = Number(row.price_uah);
      return {
        id: row.id, kind: row.kind, project: row.project, name: row.name,
        description: row.description, quantity: item.quantity,
        unitPrice: unit, lineTotal: unit * item.quantity
      };
    });
    const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const customerId = await getOrCreateCustomer(client, name, phone, email);
    const orderNumber = await uniqueOrderNumber(client);
    const accessCode = deriveAccessCode(orderNumber);

    const order = await client.query(
      `INSERT INTO orders
       (order_number, access_code_hash, customer_id, project, total_uah, note)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, order_number, status, currency, total_uah, created_at`,
      [orderNumber, hashAccessCode(accessCode), customerId, project || null, total.toFixed(2), note]
    );

    for (const line of lines) {
      await client.query(
        `INSERT INTO order_items
         (order_id, catalog_item_id, item_kind, item_project, item_name, item_description,
          quantity, unit_price_uah, line_total_uah)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [order.rows[0].id, line.id, line.kind, line.project, line.name, line.description,
         line.quantity, line.unitPrice.toFixed(2), line.lineTotal.toFixed(2)]
      );
    }

    await client.query(
      `INSERT INTO order_documents (order_id, type, version) VALUES ($1,'statement',1)`,
      [order.rows[0].id]
    );
    await client.query(
      `INSERT INTO order_events (order_id,event_type,status,details)
       VALUES ($1,'created',$2,$3)`,
      [order.rows[0].id, "new", JSON.stringify({source:"commercial_api"})]
    );
    await client.query("COMMIT");

    return {
      order: {
        id: order.rows[0].id,
        order_number: order.rows[0].order_number,
        access_code: accessCode,
        status: order.rows[0].status,
        currency: order.rows[0].currency,
        total_uah: Number(order.rows[0].total_uah),
        created_at: order.rows[0].created_at
      },
      customer: {name, phone, email},
      items: lines
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function authorizeOrder(input) {
  if (!pool) { const e = new Error("database_not_configured"); e.status = 503; throw e; }
  const phone = normalizePhone(input?.phone);
  const orderNumber = String(input?.orderNumber || "").trim();
  const code = String(input?.code || "").trim();
  if (!/^\d{12}$/.test(orderNumber) || !/^\d{5}$/.test(code)) throw new Error("invalid_credentials");

  const result = await pool.query(
    `SELECT o.*, c.name AS customer_name, c.phone_e164, c.email
     FROM orders o JOIN customers c ON c.id=o.customer_id
     WHERE o.order_number=$1 AND c.phone_e164=$2`,
    [orderNumber, phone]
  );
  if (!result.rowCount || !safeEqualHex(result.rows[0].access_code_hash, hashAccessCode(code))) {
    const e = new Error("invalid_credentials"); e.status = 401; throw e;
  }
  return result.rows[0];
}

async function journal(input) {
  const order = await authorizeOrder(input);
  const items = await pool.query(
    `SELECT catalog_item_id AS id,item_kind,item_project,item_name,item_description,
            quantity,unit_price_uah,line_total_uah
     FROM order_items WHERE order_id=$1 ORDER BY id ASC`,
    [order.id]
  );
  const messages = await pool.query(
    `SELECT id,author_type,message,created_at,read_at
     FROM order_messages WHERE order_id=$1 ORDER BY id ASC`,
    [order.id]
  );
  if (messages.rowCount) {
    await pool.query(
      `UPDATE order_messages SET read_at=NOW()
       WHERE order_id=$1 AND author_type='company' AND read_at IS NULL`,
      [order.id]
    );
  }
  return {
    order: {
      order_number: order.order_number,
      project: order.project,
      status: order.status,
      currency: order.currency,
      total_uah: Number(order.total_uah),
      note: order.note,
      created_at: order.created_at,
      updated_at: order.updated_at
    },
    customer: {name: order.customer_name, phone: order.phone_e164, email: order.email},
    items: items.rows.map(r => ({
      ...r, unit_price_uah:Number(r.unit_price_uah), line_total_uah:Number(r.line_total_uah)
    })),
    messages: messages.rows
  };
}

async function addMessage(input) {
  const order = await authorizeOrder(input);
  const message = String(input?.message || "").trim();
  if (!message || message.length > 4000) throw new Error("invalid_message");
  const result = await pool.query(
    `INSERT INTO order_messages (order_id,author_type,message)
     VALUES ($1,'customer',$2) RETURNING id,author_type,message,created_at`,
    [order.id, message]
  );
  await pool.query(
    `INSERT INTO order_events (order_id,event_type,status,details)
     VALUES ($1,'customer_message',$2,$3)`,
    [order.id, order.status, JSON.stringify({message_id:result.rows[0].id})]
  );
  return result.rows[0];
}

function statusLabel(status) {
  return ({
    new:"Заявка получена", review:"Заявка рассматривается", contact:"Связываемся с вами",
    proposal:"Готовим предложение", confirmed:"Работа подтверждена",
    in_progress:"Проект в работе", completed:"Завершено", cancelled:"Заявка отменена"
  })[status] || status;
}

async function getPdfData(input) {
  const order = await authorizeOrder(input);
  const data = await journal(input);
  return {order, data};
}

function buildPdf(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({size:"A4", margin:48, info:{
      Title:"MMW-COMPANY — заявление",
      Author:COMPANY_NAME,
      Subject:"Детальная выписка по заявке"
    }});
    const chunks=[];
    doc.on("data", c=>chunks.push(c));
    doc.on("end", ()=>resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(22).fillColor("#17352b").text(COMPANY_NAME);
    doc.moveDown(0.2).fontSize(10).fillColor("#5b756b").text(COMPANY_TAGLINE);
    doc.moveDown().strokeColor("#cfe1d9").moveTo(48,96).lineTo(547,96).stroke();
    doc.y=112;

    doc.fontSize(16).fillColor("#17352b").text("Заявка / выписка");
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor("#38544a")
      .text(`Номер заявки: ${data.order.order_number}`)
      .text(`Дата: ${new Date(data.order.created_at).toLocaleString("uk-UA")}`)
      .text(`Статус: ${statusLabel(data.order.status)}`);
    doc.moveDown();

    doc.fontSize(12).fillColor("#17352b").text("Клиент");
    doc.fontSize(10).fillColor("#38544a")
      .text(`Имя: ${data.customer.name}`)
      .text(`Телефон: ${data.customer.phone}`)
      .text(`Email: ${data.customer.email}`);
    if (data.order.project) doc.text(`Проект: ${data.order.project}`);
    doc.moveDown();

    doc.fontSize(12).fillColor("#17352b").text("Состав заявки");
    doc.moveDown(0.3);
    data.items.forEach((item, i) => {
      doc.fontSize(10).fillColor("#38544a")
        .text(`${i+1}. ${item.item_name} — ${item.quantity} × ${item.unit_price_uah.toFixed(2)} UAH = ${item.line_total_uah.toFixed(2)} UAH`);
      if (item.item_description) doc.fontSize(9).fillColor("#687f76").text(item.item_description, {indent:14});
    });
    doc.moveDown();
    doc.fontSize(13).fillColor("#17352b").text(`Итого: ${data.order.total_uah.toFixed(2)} ${data.order.currency}`);
    if (data.order.note) {
      doc.moveDown();
      doc.fontSize(12).fillColor("#17352b").text("Комментарий");
      doc.fontSize(10).fillColor("#38544a").text(data.order.note);
    }
    doc.moveDown(1.5);
    doc.fontSize(10).fillColor("#5b756b")
      .text("Для входа в журнал заявки используются номер заявки, телефон клиента и отдельный 5-значный код, выданный при создании заявки.");
    doc.moveDown();
    doc.fontSize(10).fillColor("#17352b").text(`Контакт MMW-COMPANY: ${COMPANY_EMAIL}`);
    doc.end();
  });
}

async function handle(req,res) {
  const url=new URL(req.url,"http://localhost");

  if ((url.pathname==="/health" || url.pathname==="/healthz") && req.method==="GET") {
    let db="not_configured";
    if(pool){try{await pool.query("SELECT 1");db="ready";}catch{db="unavailable";}}
    return json(res,db==="unavailable"?503:200,{ok:db!=="unavailable",service:"mmw-company-commercial",stage:"commercial-core-v1",database:db});
  }

  if(url.pathname==="/api/catalog" && req.method==="GET") return json(res,200,await getCatalog());

  if(url.pathname==="/api/orders" && req.method==="POST"){
    try{return json(res,201,await createOrder(await readBody(req)));}
    catch(error){
      const status=error.status || ([
        "invalid_items","invalid_customer_data","catalog_item_unavailable","invalid_name",
        "invalid_phone","invalid_email","invalid_comment","payload_too_large"
      ].includes(error.message)?400:500);
      return json(res,status,{ok:false,error:error.message||"internal_error"});
    }
  }

  if(url.pathname==="/api/journal" && req.method==="POST"){
    try{return json(res,200,{ok:true,...await journal(await readBody(req))});}
    catch(error){return json(res,error.status||400,{ok:false,error:error.message||"invalid_credentials"});}
  }

  if(url.pathname==="/api/messages" && req.method==="POST"){
    try{return json(res,201,{ok:true,message:await addMessage(await readBody(req))});}
    catch(error){return json(res,error.status||400,{ok:false,error:error.message||"invalid_message"});}
  }

  if(url.pathname==="/api/orders/pdf" && req.method==="POST"){
    try{
      const {data}=await getPdfData(await readBody(req));
      const pdf=await buildPdf(data);
      const hash=crypto.createHash("sha256").update(pdf).digest("hex");
      await pool.query(
        `UPDATE order_documents SET content_hash=$1
         WHERE order_id=(SELECT id FROM orders WHERE order_number=$2)
           AND type='statement' AND version=1`,
        [hash,data.order.order_number]
      );
      res.writeHead(200,{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="MMW-${data.order.order_number}.pdf"`,"Cache-Control":"no-store"});
      return res.end(pdf);
    }catch(error){return json(res,error.status||400,{ok:false,error:error.message||"pdf_generation_failed"});}
  }

  if(url.pathname==="/"){
    return text(res,200,`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MMW-COMPANY — коммерческий контур</title><style>body{font-family:Arial,sans-serif;margin:0;background:#f5faf7;color:#17352b}main{max-width:760px;margin:10vh auto;padding:32px}.card{background:#fff;border:1px solid #dcebe4;border-radius:20px;padding:32px;box-shadow:0 12px 40px rgba(23,53,43,.08)}h1{margin-top:0}p{line-height:1.6;color:#4d665d}</style></head><body><main><section class="card"><h1>MMW-COMPANY</h1><p>Коммерческий контур работает отдельно от публичного слоя компании.</p><p>Серверная основа заявок, журнала, сообщений и документов готова. Публичные точки входа подключаются отдельным этапом.</p></section></main></body></html>`,"text/html; charset=utf-8");
  }

  return json(res,404,{ok:false,error:"not_found"});
}

(async()=>{
  try{
    await ensureSchema();
    const server=http.createServer((req,res)=>{
      handle(req,res).catch(error=>{console.error(error);json(res,500,{ok:false,error:"internal_error"});});
    });
    server.listen(PORT,"0.0.0.0",()=>console.log(`MMW commercial contour listening on :${PORT}; database=${pool?"configured":"not_configured"}`));
  }catch(error){console.error("Commercial contour startup failed:",error);process.exit(1);}
})();
