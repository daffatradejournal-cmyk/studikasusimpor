'use client';

import React, { useState } from 'react';
import { Database, Copy, Check, Table, Key, Layers, ShieldCheck } from 'lucide-react';

const SQL_SCHEMA_CONTENT = `-- =====================================================================
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
    district VARCHAR(60) NOT NULL, -- Kecamatan di Indragiri Hilir
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
    halal_cert_number VARCHAR(50), -- Sertifikat Halal
    pirt_number VARCHAR(50), -- Izin P-IRT Dinkes Inhil
    village VARCHAR(80) NOT NULL, -- Desa/Kelurahan sentra komoditas
    district VARCHAR(60) NOT NULL, -- Kecamatan
    river_dock_name VARCHAR(100), -- Dermaga/Parit terdekat
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
    unit VARCHAR(20) NOT NULL,
    minimum_order INT NOT NULL DEFAULT 1 CHECK (minimum_order >= 1),
    current_stock INT NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
    minimum_stock_threshold INT NOT NULL DEFAULT 10,
    weight_in_grams INT NOT NULL CHECK (weight_in_grams > 0),
    harvest_location VARCHAR(120) NOT NULL,
    is_organic BOOLEAN DEFAULT FALSE,
    grade VARCHAR(20) DEFAULT 'Grade A',
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'out_of_stock', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL RUTE & LOGISTIK PENGIRIMAN (DARAT & PERAIRAN SUNGAI INHIL)
CREATE TABLE IF NOT EXISTS shipping_routes (
    id VARCHAR(36) PRIMARY KEY,
    courier_code VARCHAR(30) NOT NULL,
    courier_name VARCHAR(100) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    origin_district VARCHAR(60) NOT NULL,
    destination_area VARCHAR(100) NOT NULL,
    base_cost DECIMAL(10, 2) NOT NULL,
    cost_per_kg DECIMAL(10, 2) NOT NULL,
    estimated_days VARCHAR(30) NOT NULL,
    transport_mode VARCHAR(20) NOT NULL CHECK (transport_mode IN ('river_water', 'land_road', 'multimodal'))
);

-- 6. TABEL PESANAN & TRANSAKSI
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    buyer_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    total_amount DECIMAL(14, 2) NOT NULL CHECK (total_amount >= 0),
    shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
    grand_total DECIMAL(14, 2) NOT NULL CHECK (grand_total >= 0),
    shipping_address TEXT NOT NULL,
    destination_district VARCHAR(80) NOT NULL,
    selected_courier VARCHAR(100) NOT NULL,
    payment_method VARCHAR(40) NOT NULL,
    payment_status VARCHAR(30) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'expired', 'refunded')),
    fulfillment_status VARCHAR(30) DEFAULT 'pending',
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
    transaction_status VARCHAR(30) NOT NULL,
    payment_time TIMESTAMP WITH TIME ZONE,
    signature_hash VARCHAR(255),
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. TABEL AUDIT LEDGER MUTASI STOK GUDANG
CREATE TABLE IF NOT EXISTS stock_movements (
    id VARCHAR(36) PRIMARY KEY,
    commodity_id VARCHAR(36) NOT NULL REFERENCES commodities(id) ON DELETE CASCADE,
    movement_type VARCHAR(20) NOT NULL CHECK (movement_type IN ('inbound_harvest', 'outbound_sale', 'adjustment', 'spoilage')),
    quantity_change INT NOT NULL,
    stock_before INT NOT NULL,
    stock_after INT NOT NULL,
    reference_id VARCHAR(50),
    notes VARCHAR(255),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

export const SqlSchemaViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 4 Cards Summary (Smooth Rounded-3xl) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Table className="w-4 h-4 text-emerald-600" />
            <span>Relational Tables</span>
          </div>
          <span className="text-2xl font-black text-slate-900">9 Tabel</span>
          <p className="text-[11px] text-slate-400">Normalisasi 3NF</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Key className="w-4 h-4 text-sky-600" />
            <span>Primary & Foreign Keys</span>
          </div>
          <span className="text-2xl font-black text-slate-900">14 Relasi</span>
          <p className="text-[11px] text-slate-400">Integritas Referensial Keras</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Database Constraints</span>
          </div>
          <span className="text-2xl font-black text-slate-900">CHECK & UNIQUE</span>
          <p className="text-[11px] text-slate-400">Proteksi stok & harga non-negatif</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Audit Trail Ledger</span>
          </div>
          <span className="text-2xl font-black text-slate-900">stock_movements</span>
          <p className="text-[11px] text-slate-400">Pencegahan anomali stok</p>
        </div>
      </div>

      {/* SQL Script Viewer */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-300">
            schema.sql — Relational Database DDL (PostgreSQL & MySQL Compatible)
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Script SQL</span>
              </>
            )}
          </button>
        </div>

        <div className="p-5 overflow-x-auto max-h-[520px] font-mono text-xs text-slate-300 leading-relaxed">
          <pre>{SQL_SCHEMA_CONTENT}</pre>
        </div>
      </div>
    </div>
  );
};
