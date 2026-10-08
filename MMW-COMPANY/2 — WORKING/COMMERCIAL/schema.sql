-- MMW-COMPANY commercial contour schema
CREATE TABLE IF NOT EXISTS catalog_items (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('product','service','module','package')),
  project TEXT,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price_uah NUMERIC(12,2) NOT NULL CHECK (price_uah >= 0),
  price_note TEXT NOT NULL DEFAULT '',
  image_path TEXT NOT NULL DEFAULT '',
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
ALTER TABLE catalog_items ADD COLUMN IF NOT EXISTS image_path TEXT NOT NULL DEFAULT '';
INSERT INTO catalog_items (id,kind,project,name,description,price_uah,price_note,image_path,active,sort_order) VALUES
('project-audit','service',NULL,'Предпроектный аудит','Первичная проверка возможности: исходные данные, рынок, площадка и ключевые вопросы реализации.',15000,'15 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/01-project-audit.jpg',TRUE,10),
('project-concept','service',NULL,'PROJECT CONCEPT','Разработка и структурирование концепции проекта с продуктовой логикой и планом дальнейшей проверки.',49000,'49 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/02-project-concept.jpg',TRUE,20),
('business-project','service',NULL,'BUSINESS PROJECT','Бизнес-модель, финансовый контур, план запуска и рабочая структура проекта.',119000,'119 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/03-business-project.jpg',TRUE,30),
('investment-project','service',NULL,'INVESTMENT PROJECT','Инвестиционная упаковка, экономика, структура сделки и материалы для работы с капиталом.',169000,'169 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/04-investment-project.jpg',TRUE,40),
('business-system','service',NULL,'BUSINESS SYSTEM','Проектирование управленческой и операционной системы: процессы, роли, контроль и KPI.',249000,'249 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/05-business-system.jpg',TRUE,50),
('business-restart','service',NULL,'BUSINESS RESTART','Диагностика действующего бизнеса, новая модель, план изменений и приоритеты.',99000,'99 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/06-business-restart.jpg',TRUE,60),
('business-investor','service',NULL,'BUSINESS + INVESTOR','Бизнес-проект и комплексная подготовка к работе с инвестором.',229000,'229 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/07-business-investor.jpg',TRUE,70),
('custom-business-project','service',NULL,'CUSTOM BUSINESS PROJECT','Индивидуальный комплексный проект под нестандартную задачу.',299000,'299 000 ₴ / проект · Индивидуальный формат · от','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/08-custom-business-project.jpg',TRUE,80),
('large-scale','service',NULL,'LARGE SCALE','Крупный комплексный проект с расширенным сопровождением.',499000,'499 000 ₴ / проект · Индивидуальный формат · от','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/09-large-scale.jpg',TRUE,90),
('extended-estimate','service',NULL,'Расширенная смета','Детализированный расчёт стоимости по согласованным исходным данным.',12000,'12 000 ₴ / задача','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/10-estimate.jpg',TRUE,100),
('site-survey','service',NULL,'Выезд / обследование объекта','Первичное обследование площадки или объекта и фиксация исходных данных.',8000,'8 000 ₴ / выезд','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/11-site-survey.jpg',TRUE,110),
('document-set','service',NULL,'Дополнительный комплект документов','Подготовка дополнительного набора рабочих форм и документов.',7500,'7 500 ₴ / комплект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/12-docs.jpg',TRUE,120),
('project-support','service',NULL,'Проектное сопровождение','Координация задач, участников, сроков и контрольных точек проекта.',18000,'18 000 ₴ / месяц','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/13-management.jpg',TRUE,130),
('urgent','service',NULL,'Срочное оформление','Приоритетная подготовка согласованного объёма работ.',10000,'10 000 ₴ / задача','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/14-urgent.jpg',TRUE,140),
('aladin-start','service','ALADIN RESIDENCE','ALADIN RESIDENCE · старт проекта','Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.',15000,'15 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/15-aladin-residence.jpg',TRUE,150),
('carpathia-start','service','CARPATHIA ECO LODGE','CARPATHIA ECO LODGE · старт проекта','Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.',15000,'15 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/16-carpathia-eco-lodge.jpg',TRUE,160),
('nexus-work-start','service','NEXUS WORK','NEXUS WORK · старт проекта','Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.',15000,'15 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/17-nexus-work.jpg',TRUE,170),
('nexus-logistics-start','service','NEXUS LOGISTICS','NEXUS LOGISTICS · старт проекта','Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.',15000,'15 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/18-nexus-logistics.jpg',TRUE,180),
('agrohub-start','service','AGROHUB','AGROHUB · старт проекта','Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.',15000,'15 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/19-agrohub.jpg',TRUE,190),
('energy-park-start','service','ENERGY PARK','ENERGY PARK · старт проекта','Стартовая предпроектная оценка конкретного проекта MMW-COMPANY.',15000,'15 000 ₴ / проект','https://mmw-company-2.onrender.com/ASSETS/MMW-COMPANY/catalog/20-energy-park.jpg',TRUE,200)
ON CONFLICT (id) DO UPDATE SET kind=EXCLUDED.kind,project=EXCLUDED.project,name=EXCLUDED.name,description=EXCLUDED.description,price_uah=EXCLUDED.price_uah,price_note=EXCLUDED.price_note,image_path=EXCLUDED.image_path,active=EXCLUDED.active,sort_order=EXCLUDED.sort_order,updated_at=NOW();
