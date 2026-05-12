-- ESQUEMA SQL BLINDADO PARA ASADERO ALAMEDA (PROYECTO FINAL)

-- 1. EXTENSIONES NECESARIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLAS (Estructura base)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  base_price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  is_available BOOLEAN DEFAULT TRUE,
  has_variants BOOLEAN DEFAULT FALSE,
  allergens TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_phone TEXT,
  customer_name TEXT NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HABILITAR TIEMPO REAL
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- 4. SEGURIDAD AGRESIVA (RLS - ROW LEVEL SECURITY)
-- Activamos el bloqueo total por defecto.
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 🛑 POLÍTICAS PARA CLIENTES (Anónimos o No Verificados)
-- Los clientes SOLO pueden LEER el menú. NADA DE ESCRIBIR.
CREATE POLICY "Menu publico lectura" ON categories FOR SELECT USING (true);
CREATE POLICY "Productos publico lectura" ON products FOR SELECT USING (true);
CREATE POLICY "Variantes publico lectura" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Anuncios publico lectura" ON announcements FOR SELECT USING (true);

-- 🛑 POLÍTICA ESTRICTA DE PEDIDOS
-- Los clientes pueden CREAR (Insert) pedidos nuevos, pero NO pueden LEER la lista de pedidos (privacidad).
-- NO pueden MODIFICAR pedidos ni BORRARLOS. Solo tú decides qué se borra.
CREATE POLICY "Permitir solo insertar pedidos" ON orders FOR INSERT WITH CHECK (true);

-- 🛑 POLÍTICAS PARA EL ADMIN (Autenticado en la Nube de Supabase)
-- Cuando integremos el Auth real para ti, estas reglas te darán poder absoluto.
CREATE POLICY "Admin Full Access Categorias" ON categories USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Productos" ON products USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Variantes" ON product_variants USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Anuncios" ON announcements USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Pedidos" ON orders USING (auth.role() = 'authenticated');
