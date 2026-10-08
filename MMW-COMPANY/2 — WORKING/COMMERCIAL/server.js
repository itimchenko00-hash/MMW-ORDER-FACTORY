const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const PORT = Number(process.env.PORT || 3000);
const DATABASE_URL = process.env.DATABASE_URL || "";

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("render.com") ? { rejectUnauthorized: false } : undefined,
      max: 5
    })
  : null;

const schemaPath = path.join(__dirname, "schema.sql");

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function html(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

async function ensureSchema() {
  if (!pool) return false;
  const schema = fs.readFileSync(schemaPath, "utf8");
  await pool.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");
  await pool.query(schema);
  return true;
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

function normalizeItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    throw new Error("invalid_items");
  }
  return items.map((item) => {
    const id = String(item?.id || "").trim();
    const quantity = Number(item?.quantity);
    if (!id || !Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
      throw new Error("invalid_items");
    }
    return { id, quantity };
  });
}

async function uniqueAccessCode(client) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = String(crypto.randomInt(0, 100000)).padStart(5, "0");
    const exists = await client.query("SELECT 1 FROM orders WHERE access_code = $1 LIMIT 1", [code]);
    if (exists.rowCount === 0) return code;
  }
  throw new Error("access_code_generation_failed");
}

async function getCatalog() {
  if (!pool) {
    return { version: 2, status: "not_configured", currency: "UAH", items: [] };
  }
  const result = await pool.query(
    `SELECT id, kind, project, name, description, price_uah, price_note, sort_order
     FROM catalog_items
     WHERE active = TRUE
     ORDER BY sort_order ASC, id ASC`
  );
  return {
    version: 2,
    status: "ready",
    currency: "UAH",
    items: result.rows.map((row) => ({
      ...row,
      price_uah: Number(row.price_uah)
    }))
  };
}

async function createOrder(input) {
  if (!pool) {
    const error = new Error("database_not_configured");
    error.status = 503;
    throw error;
  }

  const phone = String(input?.customerPhone || "").trim();
  const email = input?.customerEmail == null ? null : String(input.customerEmail).trim();
  const note = input?.note == null ? "" : String(input.note).trim();
  if (!phone || phone.length > 64 || (email && email.length > 254) || note.length > 2000) {
    throw new Error("invalid_customer_data");
  }

  const requested = normalizeItems(input.items);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const ids = requested.map((item) => item.id);
    const catalog = await client.query(
      `SELECT id, name, price_uah
       FROM catalog_items
       WHERE active = TRUE AND id = ANY($1::text[])
       FOR SHARE`,
      [ids]
    );

    const byId = new Map(catalog.rows.map((row) => [row.id, row]));
    if (byId.size !== new Set(ids).size) throw new Error("catalog_item_unavailable");

    const lines = requested.map((item) => {
      const row = byId.get(item.id);
      const unit = Number(row.price_uah);
      return {
        id: row.id,
        name: row.name,
        quantity: item.quantity,
        unitPrice: unit,
        lineTotal: unit * item.quantity
      };
    });
    const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const code = await uniqueAccessCode(client);

    const order = await client.query(
      `INSERT INTO orders (access_code, customer_phone, customer_email, total_uah, note)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, access_code, status, currency, total_uah, created_at`,
      [code, phone, email || null, total.toFixed(2), note]
    );

    for (const line of lines) {
      await client.query(
        `INSERT INTO order_items (order_id, catalog_item_id, quantity, unit_price_uah, line_total_uah)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.rows[0].id, line.id, line.quantity, line.unitPrice.toFixed(2), line.lineTotal.toFixed(2)]
      );
    }

    await client.query("COMMIT");
    return {
      order: {
        ...order.rows[0],
        total_uah: Number(order.rows[0].total_uah)
      },
      items: lines
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function lookupOrder(code) {
  if (!pool) {
    const error = new Error("database_not_configured");
    error.status = 503;
    throw error;
  }
  const accessCode = String(code || "").trim();
  if (!/^\d{5}$/.test(accessCode)) throw new Error("invalid_access_code");

  const order = await pool.query(
    `SELECT id, access_code, status, currency, total_uah, note, created_at, updated_at
     FROM orders
     WHERE access_code = $1`,
    [accessCode]
  );
  if (!order.rowCount) {
    const error = new Error("order_not_found");
    error.status = 404;
    throw error;
  }

  const items = await pool.query(
    `SELECT oi.catalog_item_id AS id, ci.name, oi.quantity, oi.unit_price_uah, oi.line_total_uah
     FROM order_items oi
     JOIN catalog_items ci ON ci.id = oi.catalog_item_id
     WHERE oi.order_id = $1
     ORDER BY oi.id ASC`,
    [order.rows[0].id]
  );

  return {
    ...order.rows[0],
    total_uah: Number(order.rows[0].total_uah),
    items: items.rows.map((row) => ({
      id: row.id,
      name: row.name,
      quantity: row.quantity,
      unit_price_uah: Number(row.unit_price_uah),
      line_total_uah: Number(row.line_total_uah)
    }))
  };
}

async function handle(req, res) {
  const url = new URL(req.url, "http://localhost");

  if ((url.pathname === "/health" || url.pathname === "/healthz") && req.method === "GET") {
    let db = "not_configured";
    if (pool) {
      try {
        await pool.query("SELECT 1");
        db = "ready";
      } catch {
        db = "unavailable";
      }
    }
    return json(res, db === "unavailable" ? 503 : 200, {
      ok: db !== "unavailable",
      service: "mmw-company-commercial",
      stage: "catalog-and-order-api",
      database: db
    });
  }

  if (url.pathname === "/api/catalog" && req.method === "GET") {
    return json(res, 200, await getCatalog());
  }

  if (url.pathname === "/api/orders" && req.method === "POST") {
    try {
      const input = await readBody(req);
      return json(res, 201, await createOrder(input));
    } catch (error) {
      const status = error.status || (
        ["invalid_items", "invalid_customer_data", "catalog_item_unavailable"].includes(error.message) ? 400 : 500
      );
      return json(res, status, { ok: false, error: error.message || "internal_error" });
    }
  }

  if (url.pathname === "/api/orders/lookup" && req.method === "GET") {
    try {
      return json(res, 200, { ok: true, order: await lookupOrder(url.searchParams.get("code")) });
    } catch (error) {
      const status = error.status || (error.message === "invalid_access_code" ? 400 : 500);
      return json(res, status, { ok: false, error: error.message || "internal_error" });
    }
  }

  if (url.pathname === "/") {
    return html(res, 200, `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MMW-COMPANY — коммерческий контур</title>
<style>
body{font-family:Arial,sans-serif;margin:0;background:#f5faf7;color:#17352b}
main{max-width:760px;margin:10vh auto;padding:32px}
.card{background:#fff;border:1px solid #dcebe4;border-radius:20px;padding:32px;box-shadow:0 12px 40px rgba(23,53,43,.08)}
h1{margin-top:0}p{line-height:1.6;color:#4d665d}
</style>
</head>
<body><main><section class="card">
<h1>MMW-COMPANY</h1>
<p>Коммерческий контур работает отдельно от публичного слоя компании.</p>
<p>Каталог и заказы подготовлены как управляемая серверная основа. Наполнение каталога и публичные точки входа подключаются следующим этапом.</p>
</section></main></body>
</html>`);
  }

  return json(res, 404, { ok: false, error: "not_found" });
}

(async () => {
  try {
    await ensureSchema();
    const server = http.createServer((req, res) => {
      handle(req, res).catch((error) => {
        console.error(error);
        json(res, 500, { ok: false, error: "internal_error" });
      });
    });
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`MMW commercial contour listening on :${PORT}; database=${pool ? "configured" : "not_configured"}`);
    });
  } catch (error) {
    console.error("Commercial contour startup failed:", error);
    process.exit(1);
  }
})();
