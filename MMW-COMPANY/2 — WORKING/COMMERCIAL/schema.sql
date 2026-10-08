-- MMW-COMPANY commercial contour schema
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
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 160),
  phone_e164 TEXT NOT NULL CHECK (phone_e164 ~ '^\+[1-9][0-9]{7,14}$'),
  email TEXT NOT NULL CHECK (char_length(email) <= 254),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone_e164);
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number CHAR(12) NOT NULL UNIQUE CHECK (order_number ~ '^[0-9]{12}$'),
  access_code_hash TEXT NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id),
  project TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','review','contact','proposal','confirmed','in_progress','completed','cancelled')),
  currency CHAR(3) NOT NULL DEFAULT 'UAH',
  total_uah NUMERIC(12,2) NOT NULL CHECK (total_uah >= 0),
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_orders_customer_created ON orders(customer_id, created_at DESC);
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  catalog_item_id TEXT NOT NULL REFERENCES catalog_items(id),
  item_kind TEXT NOT NULL CHECK (item_kind IN ('product','service','module','package')),
  item_project TEXT,
  item_name TEXT NOT NULL,
  item_description TEXT NOT NULL DEFAULT '',
  quantity INTEGER NOT NULL CHECK (quantity > 0 AND quantity <= 999),
  unit_price_uah NUMERIC(12,2) NOT NULL CHECK (unit_price_uah >= 0),
  line_total_uah NUMERIC(12,2) NOT NULL CHECK (line_total_uah >= 0)
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id,id);
CREATE TABLE IF NOT EXISTS order_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('statement')),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  content_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(order_id,type,version)
);
CREATE TABLE IF NOT EXISTS order_messages (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  author_type TEXT NOT NULL CHECK (author_type IN ('customer','company')),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_order_messages_order ON order_messages(order_id,id);
CREATE TABLE IF NOT EXISTS order_events (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  status TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_order_events_order ON order_events(order_id,id);
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at=NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_customers_updated_at ON customers;
CREATE TRIGGER trg_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
DROP TRIGGER IF EXISTS trg_orders_updated_at ON orders;
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION touch_updated_at();