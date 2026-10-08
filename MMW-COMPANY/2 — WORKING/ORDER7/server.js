const http = require("node:http");
const crypto = require("node:crypto");
const { Pool } = require("pg");

const PORT = Number(process.env.PORT || 10000);
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined
});

const schema = `
CREATE TABLE IF NOT EXISTS catalog_items (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('service','module','package')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  currency TEXT NOT NULL DEFAULT 'UAH',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  access_code CHAR(5) NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  items JSONB NOT NULL,
  total NUMERIC(12,2) NOT NULL CHECK (total >= 0),
  currency TEXT NOT NULL DEFAULT 'UAH',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','review','confirmed','in_progress','completed','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_access_code_idx ON orders(access_code);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
`;

async function init() {
  await pool.query(schema);
}

function json(res, status, body) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });
  res.end(JSON.stringify(body));
}

async function body(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 1000000) throw new Error("payload too large");
  }
  return raw ? JSON.parse(raw) : {};
}

function accessCode() {
  return String(crypto.randomInt(10000, 100000));
}

async function uniqueAccessCode() {
  for (;;) {
    const code = accessCode();
    const { rowCount } = await pool.query("SELECT 1 FROM orders WHERE access_code=$1", [code]);
    if (!rowCount) return code;
  }
}

async function route(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/health") {
    return json(res, 200, { ok: true, service: "ORDER7" });
  }

  if (req.method === "GET" && url.pathname === "/api/catalog") {
    const { rows } = await pool.query(
      "SELECT id, kind, name, description, price::float8 AS price, currency FROM catalog_items WHERE active=true ORDER BY kind, id"
    );
    return json(res, 200, { items: rows });
  }

  if (req.method === "POST" && url.pathname === "/api/orders") {
    const input = await body(req);
    const customer = input.customer || {};
    const items = Array.isArray(input.items) ? input.items : [];

    if (!String(customer.name || "").trim() || !String(customer.phone || "").trim() || !items.length) {
      return json(res, 400, { error: "customer.name, customer.phone and items are required" });
    }

    const ids = items.map(x => String(x.id || "")).filter(Boolean);
    if (!ids.length || ids.length !== items.length) {
      return json(res, 400, { error: "each item requires an id" });
    }

    const { rows: catalog } = await pool.query(
      "SELECT id, name, price::float8 AS price, currency FROM catalog_items WHERE active=true AND id = ANY($1::text[])",
      [ids]
    );
    const byId = new Map(catalog.map(x => [x.id, x]));

    let total = 0;
    const normalized = items.map(x => {
      const item = byId.get(String(x.id));
      const qty = Math.max(1, Math.min(100, Number(x.quantity || 1)));
      if (!item) throw new Error("unknown catalog item: " + x.id);
      total += item.price * qty;
      return { id: item.id, name: item.name, quantity: qty, unitPrice: item.price, currency: item.currency };
    });

    const code = await uniqueAccessCode();
    const id = crypto.randomUUID();

    await pool.query(
      "INSERT INTO orders(id, access_code, customer_name, phone, email, items, total) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [id, code, String(customer.name).trim(), String(customer.phone).trim(), customer.email ? String(customer.email).trim() : null, JSON.stringify(normalized), total]
    );

    return json(res, 201, {
      orderId: id,
      accessCode: code,
      total,
      currency: "UAH",
      status: "new"
    });
  }

  if (req.method === "GET" && url.pathname === "/api/orders/lookup") {
    const code = String(url.searchParams.get("code") || "");
    if (!/^\\d{5}$/.test(code)) return json(res, 400, { error: "five-digit access code required" });

    const { rows } = await pool.query(
      "SELECT id, access_code AS \"accessCode\", customer_name AS \"customerName\", items, total::float8 AS total, currency, status, created_at AS \"createdAt\", updated_at AS \"updatedAt\" FROM orders WHERE access_code=$1",
      [code]
    );
    if (!rows[0]) return json(res, 404, { error: "order not found" });
    return json(res, 200, { order: rows[0] });
  }

  return json(res, 404, { error: "not found" });
}

const server = http.createServer(async (req, res) => {
  try {
    await route(req, res);
  } catch (err) {
    console.error(err);
    const status = /payload too large/i.test(err.message) ? 413 : 500;
    json(res, status, { error: status === 413 ? err.message : "internal error" });
  }
});

init()
  .then(() => server.listen(PORT, "0.0.0.0", () => console.log(`ORDER7 listening on ${PORT}`)))
  .catch(err => {
    console.error("ORDER7 database initialization failed", err);
    process.exit(1);
  });
