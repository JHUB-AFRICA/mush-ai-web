-- Mush AI / SmartMushroom schema
-- Applied by `bun run db:migrate` (lib/db/migrate.ts)

-- ── Users ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL UNIQUE,
  phone         TEXT,
  password_hash TEXT        NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Newsletter ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Contact form ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  subject    TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Products ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id               TEXT PRIMARY KEY,
  name             TEXT        NOT NULL,
  category         TEXT        NOT NULL,
  badge            TEXT        NOT NULL,
  badge_tone       TEXT        NOT NULL CHECK (badge_tone IN ('forest', 'ember')),
  rating           NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count     INT         NOT NULL DEFAULT 0,
  description      TEXT        NOT NULL,
  long_description TEXT,
  features         JSONB       NOT NULL DEFAULT '[]'::jsonb,
  specs            JSONB       NOT NULL DEFAULT '[]'::jsonb,
  unit             TEXT        NOT NULL,
  price            NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  cta              TEXT        NOT NULL,
  image            TEXT        NOT NULL,
  image_alt        TEXT        NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);

-- ── Reviews ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id         TEXT PRIMARY KEY,
  product_id TEXT        NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  author     TEXT        NOT NULL,
  location   TEXT        NOT NULL DEFAULT '',
  rating     INT         NOT NULL CHECK (rating BETWEEN 1 AND 5),
  date       DATE        NOT NULL DEFAULT CURRENT_DATE,
  title      TEXT        NOT NULL,
  body       TEXT        NOT NULL,
  verified   BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reviews_product_idx ON reviews (product_id);

-- ── Orders ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users (id) ON DELETE SET NULL,
  status        TEXT        NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'paid', 'failed', 'cancelled')),
  first_name    TEXT        NOT NULL,
  last_name     TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  national_id   TEXT,
  county        TEXT        NOT NULL,
  town          TEXT        NOT NULL,
  address       TEXT        NOT NULL,
  pickup_option TEXT        NOT NULL DEFAULT 'jkuat'
                CHECK (pickup_option IN ('jkuat', 'delivery')),
  subtotal      NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
  total         NUMERIC(12,2) NOT NULL CHECK (total >= 0),
  currency      TEXT        NOT NULL DEFAULT 'KES',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS national_id TEXT;

CREATE INDEX IF NOT EXISTS orders_user_idx ON orders (user_id);
CREATE INDEX IF NOT EXISTS orders_email_idx ON orders (email);

-- ── Order line items ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID        NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id TEXT        NOT NULL REFERENCES products (id),
  quantity   INT         NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  UNIQUE (order_id, product_id)
);

CREATE INDEX IF NOT EXISTS order_items_order_idx ON order_items (order_id);

-- ── Payments ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID        NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  method     TEXT        NOT NULL CHECK (method IN ('mpesa', 'card')),
  status     TEXT        NOT NULL DEFAULT 'pending'
             CHECK (status IN ('pending', 'completed', 'failed')),
  amount     NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  currency   TEXT        NOT NULL DEFAULT 'KES',
  phone      TEXT,
  reference  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS payments_order_idx ON payments (order_id);

-- Keep orders.updated_at fresh
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_touch_updated_at ON orders;
CREATE TRIGGER orders_touch_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

DROP TRIGGER IF EXISTS payments_touch_updated_at ON payments;
CREATE TRIGGER payments_touch_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
