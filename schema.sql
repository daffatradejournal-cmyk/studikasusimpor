-- =====================================================================
-- SCHEMA DATABASE PASARTEMBILAHAN (E-COMMERCE & RANTAI PASOK INHIL)
-- Arsitektur: Relational Database (Kompatibel PostgreSQL & MySQL)
-- Studi Kasus: S1 Sistem Informasi - Universitas Islam Indragiri (UNISI)
-- =====================================================================

-- 1. TABEL PENGGUNA & MITRA UMKM / KOPERASI
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('buyer', 'merchant', 'admin', 'cooperative')),
    district VARCHAR(60) NOT NULL, -- Kecamatan di Indragiri Hilir (misal: Tembilahan Kota, Mandah, Enok, Gaung)
    address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL PROFIL TOKO / SENTRA TANI UMKM
CREATE TABLE IF NOT EXISTS merchants (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(120) NOT NULL,
    nib_number VARCHAR(50), -- Nomor Induk Berusaha
    halal_cert_number VARCHAR(50), -- Sertifikat Halal MUI/Kemenag
    pirt_number VARCHAR(50), -- Izin P-IRT Dinkes Inhil
    village VARCHAR(80) NOT NULL, -- Desa/Kelurahan sentra komoditas
    district VARCHAR(60) NOT NULL, -- Kecamatan
    river_dock_name VARCHAR(100), -- Dermaga/Parit terdekat (misal: Parit 13 Tembilahan Hilir, Pelabuhan Parit 21)
    is_verified BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3, 2) DEFAULT 4.90,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL KATEGORI KOMODITAS
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    slug VARCHAR(80) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(40) NOT NULL,
    display_order INT DEFAULT 0
);

-- 4. TABEL KATALOG PRODUK KOMODITAS & UMKM
CREATE TABLE IF NOT EXISTS commodities (
    id VARCHAR(36) PRIMARY KEY,
    merchant_id VARCHAR(36) NOT NULL REFERENCES merchants(id) ON DELETE RESTRICT,
    category_id VARCHAR(36) NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    sku VARCHAR(40) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    unit VARCHAR(20) NOT NULL, -- 'kg', 'butir', 'liter', 'ton', 'kemasan'
    minimum_order INT NOT NULL DEFAULT 1 CHECK (minimum_order >= 1),
    current_stock INT NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
    minimum_stock_threshold INT NOT NULL DEFAULT 10,
    weight_in_grams INT NOT NULL CHECK (weight_in_grams > 0),
    harvest_location VARCHAR(120) NOT NULL, -- Lokasi kebun/sentra produksi
    is_organic BOOLEAN DEFAULT FALSE,
    grade VARCHAR(20) DEFAULT 'Grade A', -- 'Grade A', 'Grade Super', 'Ekspor Quality'
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'out_of_stock', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL RUTE & LOGISTIK PENGIRIMAN (DARAT & PERAIRAN SUNGAI INHIL)
CREATE TABLE IF NOT EXISTS shipping_routes (
    id VARCHAR(36) PRIMARY KEY,
    courier_code VARCHAR(30) NOT NULL, -- 'speed_boat_inhil', 'pompong_kargo', 'jne_reg', 'jnt_cargo', 'pos_kilat'
    courier_name VARCHAR(100) NOT NULL,
    service_type VARCHAR(50) NOT NULL, -- 'Reguler Darat', 'Kargo Sungai/Parit', 'Express Jalur Air'
    origin_district VARCHAR(60) NOT NULL, -- Kecamatan Asal di Inhil
    destination_area VARCHAR(100) NOT NULL, -- Area Tujuan (Lokal Inhil, Riau, Nasional, Ekspor)
    base_cost DECIMAL(10, 2) NOT NULL,
    cost_per_kg DECIMAL(10, 2) NOT NULL,
    estimated_days VARCHAR(30) NOT NULL,
    transport_mode VARCHAR(20) NOT NULL CHECK (transport_mode IN ('river_water', 'land_road', 'multimodal'))
);

-- 6. TABEL PESANAN & TRANSAKSI
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL, -- Contoh: ORD-INHIL-20261018-001
    buyer_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    total_amount DECIMAL(14, 2) NOT NULL CHECK (total_amount >= 0),
    shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
    grand_total DECIMAL(14, 2) NOT NULL CHECK (grand_total >= 0),
    shipping_address TEXT NOT NULL,
    destination_district VARCHAR(80) NOT NULL,
    selected_courier VARCHAR(100) NOT NULL,
    payment_method VARCHAR(40) NOT NULL, -- 'midtrans_qris', 'midtrans_va_bca', 'midtrans_va_brk_syariah', 'bank_transfer'
    payment_status VARCHAR(30) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'expired', 'refunded')),
    fulfillment_status VARCHAR(30) DEFAULT 'pending' CHECK (fulfillment_status IN ('pending', 'processing', 'shipped_river', 'shipped_land', 'delivered', 'cancelled')),
    tracking_number VARCHAR(60),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. TABEL ITEM DETAIL PESANAN
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    commodity_id VARCHAR(36) NOT NULL REFERENCES commodities(id) ON DELETE RESTRICT,
    commodity_name VARCHAR(150) NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(14, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. TABEL TRANSAKSI PEMBAYARAN GATEWAY (MIDTRANS / BANK SYARIAH)
CREATE TABLE IF NOT EXISTS payment_transactions (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gateway_provider VARCHAR(30) DEFAULT 'midtrans',
    transaction_id VARCHAR(100) UNIQUE,
    payment_type VARCHAR(40) NOT NULL,
    gross_amount DECIMAL(14, 2) NOT NULL,
    transaction_status VARCHAR(30) NOT NULL, -- 'pending', 'settlement', 'expire', 'deny', 'cancel'
    payment_time TIMESTAMP WITH TIME ZONE,
    signature_hash VARCHAR(255),
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. TABEL AUDIT LEDGER MUTASI STOK GUDANG (PENCEGAHAN STOK ANOMALI)
CREATE TABLE IF NOT EXISTS stock_movements (
    id VARCHAR(36) PRIMARY KEY,
    commodity_id VARCHAR(36) NOT NULL REFERENCES commodities(id) ON DELETE CASCADE,
    movement_type VARCHAR(20) NOT NULL CHECK (movement_type IN ('inbound_harvest', 'outbound_sale', 'adjustment', 'spoilage')),
    quantity_change INT NOT NULL,
    stock_before INT NOT NULL,
    stock_after INT NOT NULL,
    reference_id VARCHAR(50), -- Referensi order_id atau nomor panen kebun
    notes VARCHAR(255),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- INDEXING UNTUK OPTIMASI QUERY TRANSAKSI TINGGI & PENCARIAN
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_commodities_category ON commodities(category_id);
CREATE INDEX IF NOT EXISTS idx_commodities_merchant ON commodities(merchant_id);
CREATE INDEX IF NOT EXISTS idx_commodities_status ON commodities(status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_commodity ON stock_movements(commodity_id);
