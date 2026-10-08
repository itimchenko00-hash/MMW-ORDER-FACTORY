-- MMW-COMPANY commercial contour schema
-- Applied automatically by server.js on startup.

CREATE TABLE IF NOT EXISTS catalog_items (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('product','service','module','package')),
  project TEXT,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price_uah NUMERIC(12,2) NOT NULL CHECK (price_uah >= 0),
  price_note TEXT NOT NULL DEFAULT '',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_code CHAR(5) NOT NULL UNIQUE CHECK (access_code ~ '^[0-9]{5}$'),
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','review','confirmed','cancelled','completed')),
  currency CHAR(3) NOT NULL DEFAULT 'UAH',
  total_uah NUMERIC(12,2) NOT NULL CHECK (total_uah >= 0),
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  catalog_item_id TEXT NOT NULL REFERENCES catalog_items(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_uah NUMERIC(12,2) NOT NULL CHECK (unit_price_uah >= 0),
  line_total_uah NUMERIC(12,2) NOT NULL CHECK (line_total_uah >= 0)
);

CREATE INDEX IF NOT EXISTS idx_catalog_items_active_sort
  ON catalog_items(active, sort_order, id);

CREATE INDEX IF NOT EXISTS idx_orders_created_at
  ON orders(created_at DESC);
