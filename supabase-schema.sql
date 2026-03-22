-- ─── SCHEMA: E-Commerce Gás ──────────────────────────────────────────────────
-- Execute este SQL no editor SQL do Supabase Dashboard

-- ─── Products ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  description   TEXT,
  price         NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  image_url     TEXT,
  is_featured   BOOLEAN DEFAULT false,
  is_active     BOOLEAN DEFAULT true,
  weight_kg     NUMERIC(5, 2),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Orders ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name          TEXT NOT NULL,
  customer_phone         TEXT NOT NULL,
  customer_address       TEXT NOT NULL,
  customer_neighborhood  TEXT,
  customer_complement    TEXT,
  status                 TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','delivering','delivered','cancelled')),
  total_amount           NUMERIC(10, 2) NOT NULL,
  payment_method         TEXT NOT NULL
    CHECK (payment_method IN ('pix','cash','credit_card')),
  payment_status         TEXT DEFAULT 'pending'
    CHECK (payment_status IN ('pending','paid','failed')),
  notes                  TEXT,
  abacatepay_payment_id  TEXT,
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Order Items ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id),
  quantity    INTEGER NOT NULL DEFAULT 1,
  unit_price  NUMERIC(10, 2) NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Updated At Trigger ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Produtos: leitura pública
CREATE POLICY "products_public_read" ON products
  FOR SELECT USING (is_active = true);

-- Pedidos: inserção pública (clientes podem criar)
CREATE POLICY "orders_public_insert" ON orders
  FOR INSERT WITH CHECK (true);

-- Order items: inserção pública
CREATE POLICY "order_items_public_insert" ON order_items
  FOR INSERT WITH CHECK (true);

-- Leitura de pedidos apenas para autenticados (admin)
CREATE POLICY "orders_authenticated_read" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "order_items_authenticated_read" ON order_items
  FOR SELECT USING (auth.role() = 'authenticated');

-- Admin: todas as operações em produtos
CREATE POLICY "products_authenticated_all" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Admin: update de pedidos
CREATE POLICY "orders_authenticated_update" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ─── Seed: Produtos de Exemplo ────────────────────────────────────────────────
INSERT INTO products (name, description, price, original_price, is_featured, is_active, weight_kg) VALUES
  (
    'Botijão P13 Completo',
    'Botijão de gás 13kg completo, com válvula e lacre de segurança. Entrega em até 30 minutos.',
    120.00,
    140.00,
    true,
    true,
    13
  ),
  (
    'Botijão P13 Sem Vasilhame',
    'Recarga de gás 13kg. Traga seu botijão vazio e economize. Entrega expressa.',
    90.00,
    NULL,
    false,
    true,
    13
  ),
  (
    'Botijão P45 Completo',
    'Botijão industrial 45kg, ideal para restaurantes e empresas. Entrega agendada.',
    350.00,
    NULL,
    false,
    true,
    45
  );
