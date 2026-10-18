# PasarTembilahan — Platform E-Commerce & Rantai Distribusi Komoditas UMKM Indragiri Hilir
> **Studi Kasus Portofolio Rekayasa Sistem Informasi • Universitas Islam Indragiri (UNISI)**  
> **Dikembangkan oleh: Muhammad Daffa** (S1 Sistem Informasi)

Aplikasi web Full-Stack modern yang dibangun dengan **Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, dan Relational Database Schema (PostgreSQL / MySQL)**.

Proyek ini dirancang secara khusus untuk memecahkan hambatan rantai pasok komoditas lokal di **Kabupaten Indragiri Hilir (Inhil), Riau** — *Negeri Hamparan Kelapa Dunia* — dengan menggantikan perantara tengkulak yang panjang melalui katalog digital multi-kategori, kalkulator logistik perairan sungai pasang surut khas Inhil (Speedboat & Pompong), integrasi pembayaran otomatis **Payment Gateway Midtrans**, serta **Dashboard Analitik bagi UMKM dan Koperasi Tani**.

---

## 🎯 Ringkasan Eksekutif & Metrik Portofolio

| Metrik | Spesifikasi & Fokus |
| :--- | :--- |
| **Nama Proyek** | **PasarTembilahan** (`pasartembilahan.id`) |
| **Subtitle** | Platform E-Commerce & Rantai Distribusi Komoditas UMKM Indragiri Hilir |
| **Focus** | **Business Process & E-Commerce** (Digitalisasi alur niaga komoditas daerah) |
| **Architecture** | **RESTful API & Relational DB** (Dual-Engine PostgreSQL / MySQL, Webhook Callback) |
| **Target Komunitas** | **UMKM, Petani Kelapa & Koperasi Daerah** (Indragiri Hilir, Riau) |
| **Institusi Akademik** | S1 Sistem Informasi — Universitas Islam Indragiri (UNISI), Tembilahan |

---

## 🛑 Masalah Bisnis (Problem Statement)

1. **Rantai Perantara (Tengkulak) yang Terlalu Panjang:**  
   Petani kelapa dan produsen olahan turunan di Inhil kesulitan menjangkau pembeli nasional maupun internasional secara langsung. Akibatnya, disparitas harga sangat tinggi dan keuntungan terbesar justru dinikmati oleh spekulan perantara.
2. **Keterbatasan Pencatatan Transaksi & Manajemen Stok Digital:**  
   Mayoritas UMKM sentra perparitan masih mencatat pesanan di buku nota kertas, memicu salah hitung omzet, ketidaksesuaian stok gudang, dan kesulitan pelacakan piutang.
3. **Ketidakpastian Biaya Logistik Lintas Perairan Sungai:**  
   Indragiri Hilir memiliki ribuan parit dan muara pasang surut (*Negeri Seribu Parit*). Pengiriman komoditas dari kecamatan terpencil seperti Mandah, Kuindra, dan Concong membutuhkan moda perahu pompong dan speedboat yang tarifnya tidak terdokumentasi dalam sistem logistik konvensional.
4. **Verifikasi Pembayaran Manual:**  
   Transfer bank manual membutuhkan proses cek mutasi rekening satu per satu dan rawan bukti transfer palsu.

---

## 💡 Solusi Sistem Informasi (Solution Matrix)

1. **Katalog Digital Produk Komoditas Multi-Kategori:**
   - **Kelapa & Turunan:** Kelapa Butir Kupas Parit 13 (Grade A Super), Kopra Putih Asapan Ekspor, Virgin Coconut Oil (VCO) Murni Cold-Pressed, dan Briket Arang Tempurung Kelapa.
   - **Perkebunan Lahan Gambut:** Kopi Liberika Gambut Inhil (Notes buah nangka eksotis), Pinang Betara Kering Belah, dan Gula Kelapa Cetak Alami.
   - **Kuliner Legendaris Inhil:** Kerupuk Amplang Udang Laut Tembilahan, Dodol Nanas Sungai Salak, Lempok Durian Asli Mandah.
   - **Kerajinan Sabut & Souvenir:** Tanjak Melayu Riau Tenun Songket Mahkota, Mangkuk Tempurung Kelapa Polesan Halus Food-Grade.
2. **Kalkulator & Estimasi Ongkos Kirim Realistis (Jalur Sungai & Darat):**
   - **Armada Air Perairan Inhil:** Speedboat Express (antar-kecamatan parit sungai) & Kapal Pompong Kargo Rakyat Dermaga Parit 21 (hemat untuk tonase massal).
   - **Armada Darat & Nasional:** Truk Kargo J&T Cargo Lintas Timur Sumatera, JNE Reguler Express, dan armada ekspor Pelabuhan Samudera Kuala Enok ke Batam/Singapura.
3. **Integrasi Pembayaran Otomatis Midtrans Payment Gateway:**
   - Simulator Midtrans Snap responsif mendukung **QRIS Instant (GoPay, ShopeePay, OVO, Dana)** dan **Virtual Account Bank Riau Kepri Syariah, BCA, & Mandiri**.
   - Callback webhook `/api/payment` mengubah status pembayaran menjadi `paid` dan memicu update status fulfillment secara atomik.
4. **Dashboard Analitik UMKM & Koperasi Sentra Tani:**
   - 4 Kartu KPI: Total Omzet Penjualan (Rp), Volume Komoditas Terdistribusi (Ton/Kg), Transaksi Selesai, dan Jumlah Mitra UMKM Aktif.
   - Grafik Tren Pertumbuhan Omzet Bulanan (Mei - Oktober 2026).
   - Distribusi Pangsa Komoditas Unggulan.
   - Sistem Peringatan Dini Stok Kritis Gudang dengan tombol **"Restock Cepat (+50 Unit)"**.
   - Tabel Manajemen Pesanan & Logistik Rantai Distribusi.

---

## 🛠️ Tech Stack & Arsitektur

- **Frontend & App Framework**: Next.js 14 (App Router) + React 18
- **Design System Source of Truth**: Shopee.com Design System (`DESIGN.md`)
  - Primary colors: `#EE4D2D`, `#D0011B`, `#FFCE3D`, `#00BFA5`, `#066BC8`, `#F05D40`, `#E2492B`, `#FACAC0`
  - Neutral colors: `#FFFFFF`, `#000000`, `#F5F5F5`, `#FAFAFA`, `#555555`, `#5A5A5A`, `#222222`, `#FBFBFB`, `#CCCCCC`
  - Typography Scale: Roboto & Titillium Web (h1: 32px, h2: 20px, h3: 16px, body: 14px)
  - Radii Tokens: `2px`, `.125rem`, `3px`, `4px`
- **Bahasa Pemrograman**: TypeScript (Type-Safe Contracts)
- **Styling & UI Design**: Tailwind CSS v3.4 + Shopee Semantic Tokens + Lucide Icons
- **Database Architecture**: Relational Database Schema (`schema.sql` 9 Normalized Tables)
- **API Engine**: Next.js Route Handlers (RESTful API Standards)
- **Payment Engine**: Midtrans Snap Sandbox API Architecture
- **State Management**: Reactive Client Store with persistent fallback (`localStorage`)

---

## 📂 Struktur Direktori Proyek

```text
├── DESIGN.md                          # Design System Source of Truth (Shopee.com tokens)
├── schema.sql                         # Skema Relational Database DDL (PostgreSQL & MySQL)
├── package.json                       # Konfigurasi dependensi Next.js & scripts
├── tailwind.config.js                 # Konfigurasi Shopee tokens & radii
├── tsconfig.json                      # Konfigurasi TypeScript paths
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── commodities/route.ts   # GET & filter katalog komoditas
│   │   │   ├── orders/route.ts        # GET & POST pembuatan pesanan komoditas
│   │   │   ├── shipping/route.ts      # POST kalkulasi ongkir jalur air/darat
│   │   │   ├── payment/route.ts       # POST Midtrans webhook callback simulation
│   │   │   └── analytics/route.ts     # GET KPI & analitik omzet UMKM
│   │   ├── globals.css                # Custom scrollbar, animations & tokens
│   │   ├── layout.tsx                 # Root layout dengan SEO metadata
│   │   └── page.tsx                   # Main Dashboard Single-Page Application
│   ├── components/
│   │   ├── Header.tsx                 # Navbar sticky, search, UNISI badge & keranjang
│   │   ├── NavigationTabs.tsx         # Tab switcher (Katalog, Dashboard, Ongkir, SQL)
│   │   ├── CommodityCatalog.tsx       # Grid kartu komoditas, filter, & search
│   │   ├── ProductDetailModal.tsx     # Modal rincian spesifikasi, grade, & sentra asal
│   │   ├── CartDrawer.tsx             # Drawer keranjang belanja & form logistik Inhil
│   │   ├── MidtransModal.tsx          # Simulator popup pembayaran Midtrans Snap
│   │   ├── ShippingCalculator.tsx     # Kalkulator rute sungai (pompong/speedboat) & darat
│   │   ├── UmkmDashboard.tsx          # Dashboard analitik omzet, chart & restock
│   │   ├── ArchitectureModal.tsx      # Modal blueprint arsitektur sistem & REST API
│   │   ├── SqlSchemaViewer.tsx        # Syntax viewer schema.sql dengan 9 tabel DDL
│   │   └── Footer.tsx                 # Footer resmi dengan identitas UNISI & Inhil
│   └── lib/
│       ├── types.ts                   # Domain TypeScript interfaces
│       ├── mockData.ts                # Data autentik komoditas, UMKM, & rute Inhil
│       └── store.ts                   # State store reaktif & sinkronisasi data
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Kloning & Masuk ke Folder
```bash
git clone https://github.com/daffatradejournal-cmyk/studikasusimpor.git
cd "studi kasus pertama porto pantai"
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser Anda di: **[http://localhost:3000](http://localhost:3000)**

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 🗄️ Menghubungkan ke Database Relasional Asli (Opsional)

Proyek ini sudah dilengkapi file `schema.sql` siap pakai. Anda dapat mengeksekusinya ke database **PostgreSQL** atau **MySQL**:

```bash
# Untuk PostgreSQL:
psql -U postgres -d pasartembilahan_db -f schema.sql

# Untuk MySQL:
mysql -u root -p pasartembilahan_db < schema.sql
```

Tabel utama yang dibuat mencakup:
1. `users` — Data pembeli, pedagang, dan administrator koperasi
2. `merchants` — Profil legalitas sentra UMKM (NIB, Sertifikasi Halal MUI, P-IRT, Dermaga Parit)
3. `categories` — Kategori komoditas (Kelapa, Perkebunan Gambut, Kuliner, Kerajinan)
4. `commodities` — Detail produk, SKU unik, stok gudang, harga, bobot fisik, dan grade mutu
5. `shipping_routes` — Rute moda perairan (pompong/speedboat) dan armada jalan darat
6. `orders` — Header pesanan dan status pemenuhan rantai pasok
7. `order_items` — Item rincian produk yang dipesan
8. `payment_transactions` — Rekaman transaksi payment gateway Midtrans
9. `stock_movements` — Ledger audit trail mutasi arus keluar-masuk komoditas

---

## 👨‍💻 Profil Pengembang

- **Nama**: Muhammad Daffa
- **Program Studi**: S1 Sistem Informasi
- **Universitas**: Universitas Islam Indragiri (UNISI)
- **Domisili**: Tembilahan, Kabupaten Indragiri Hilir, Riau, Indonesia
- **Fokus Keahlian**: Web Architecture, Database Systems, Business Process Analysis, Full-Stack Development

---

## 📄 Lisensi
Dirilis di bawah lisensi [MIT](LICENSE). Dikembangkan dengan bangga untuk memajukan potensi ekonomi komoditas lokal Indragiri Hilir.
