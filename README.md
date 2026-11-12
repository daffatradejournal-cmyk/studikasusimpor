# PasarTembilahan — Prototipe E-Commerce & Rantai Distribusi Komoditas UMKM Indragiri Hilir

> **Studi Kasus Portofolio Rekayasa Sistem Informasi (Proyek Mandiri)**  
> **Pengembang**: Muhammad Daffa  
> **Fokus**: Pemodelan Proses Bisnis, Antarmuka E-Commerce Responsif, dan Cetak Biru Basis Data Relasional  
> **Repositori**: [https://github.com/daffatradejournal-cmyk/studikasusimpor.git](https://github.com/daffatradejournal-cmyk/studikasusimpor.git)

---

> [!IMPORTANT]
> ### 📌 DISCLAIMER PROTOTIPE & DATA CONTOH
> Repositori ini merupakan **prototipe studi kasus portofolio rekayasa sistem informasi** yang beroperasi secara mandiri menggunakan *client-side state* (`useState` & `localStorage`) serta data contoh (*mock data*).  
> 
> - **Bukan Platform Komersial Aktif**: Aplikasi ini dirancang untuk mendemonstrasikan perancangan sistem informasi niaga komoditas daerah, bukan toko online operasional langsung.
> - **Simulasi Transaksi & Pembayaran**: Seluruh alur checkout dan Payment Gateway Midtrans Snap beroperasi dalam **mode simulasi / mock**. Tidak ada pemotongan saldo, integrasi perbankan nyata, atau dana finansial yang diproses.
> - **Simulasi Permintaan Ekspor (RFQ)**: Formulir pengajuan kuotasi B2B pada modul Global Export Hub adalah antarmuka demonstrasi alur dan tidak terhubung ke eksportir atau otoritas kepabeanan.
> - **Status Basis Data**: Cetak biru skema database relasional 9 tabel disertakan dalam berkas [`schema.sql`](schema.sql) sebagai spesifikasi perancangan DDL (kompatibel PostgreSQL & MySQL), sementara aplikasi web berjalan menggunakan model data in-memory terstruktur.

---

## 🎯 Latar Belakang & Masalah Bisnis (Problem Statement)

Kabupaten Indragiri Hilir (Inhil), Provinsi Riau, dijuluki sebagai **Negeri Hamparan Kelapa Dunia** dan **Negeri Seribu Parit**, dengan luasan perkebunan kelapa rakyat mencapai lebih dari 400.000 hektar. Meskipun memiliki potensi komoditas yang masif (kelapa butir, kopra putih, virgin coconut oil, kopi liberika lahan gambut, dan kuliner pesisir), rantai tata niaga daerah menghadapi sejumlah tantangan struktural:

1. **Rantai Perantara (Tengkulak) yang Panjang**:  
   Petani dan pengrajin lokal sering kali bergantung pada spekulan perantara bertingkat sehingga harga di tingkat petani tertekan, sementara nilai tambah ekspor tidak dinikmati secara optimal oleh produsen lokal.
2. **Keterbatasan Pencatatan Transaksi & Manajemen Stok Digital**:  
   Banyak unit usaha mikro dan koperasi sentra perparitan masih mengandalkan pencatatan pembukuan konvensional, menimbulkan potensi selisih stok gudang dan ketidaktepatan pelaporan omzet.
3. **Ketidakpastian Biaya Logistik Multimodal Perairan Sungai**:  
   Kondisi geografis perairan pasang surut membutuhkan moda perahu pompong sungai dan armada speedboat cepat antar-parit muara yang tarifnya belum terstandarisasi dalam sistem e-commerce nasional.
4. **Kebutuhan Integrasi Pembayaran Digital Terverifikasi**:  
   Perlunya simulasi mekanisme verifikasi transaksi otomatis (QRIS dan Virtual Account) untuk menggantikan konfirmasi mutasi rekening manual.

---

## ⚖️ Lembar Verifikasi: Fitur Nyata vs Fitur Simulasi

Sebagai komitmen transparansi rekayasa perangkat lunak, berikut rincian modul yang berfungsi interaktif di sisi klien versus modul yang bersifat simulasi/tampilan:

| Modul / Fitur | Status di Kode | Mekanisme & Penjelasan Teknis |
| :--- | :---: | :--- |
| **Katalog Komoditas Multi-Kategori** | **Berfungsi Nyata** | Filter kategori, filter teks pencarian, pengurutan harga/terlaris/rating, dan modal spesifikasi detail produk beroperasi reaktif di browser. |
| **Keranjang Belanja (Cart)** | **Berfungsi Nyata** | Tambah/kurang kuantitas, validasi batas stok gudang, hapus item, dan sinkronisasi otomatis ke `localStorage`. |
| **Form Checkout & Pemotongan Stok** | **Berfungsi Nyata (Client)** | Validasi form identitas pembeli & kurir; pembuatan ID pesanan unik (`ORD-INHIL-...`); mutasi pengurangan stok komoditas dan pembaruan metrik omzet secara lokal. |
| **Seller Centre (Stok & Pesanan)** | **Berfungsi Nyata (Client)** | Filter status pesanan ("Dikemas", "Dikirim", "Selesai"); tombol pembaruan status pengiriman dan tombol restock stok menipis (`+50 Unit`) langsung memutakhirkan state dan `localStorage`. |
| **Tombol Reset Data Demo** | **Berfungsi Nyata** | Menghapus kunci penyimpanan browser dan mengembalikan seluruh data barang, pesanan, dan keranjang belanja ke kondisi mock awal. |
| **Dokumentasi Blueprint & Viewer SQL** | **Berfungsi Nyata** | Penampil teks interaktif untuk diagram arsitektur BPMN, alur data, dan berkas `schema.sql` (9 tabel DDL). |
| **Kalkulator Kargo Air & Darat** | **Simulasi Formula** | Menghitung ongkir via rumus matematika linier: $\text{Base Cost} + (\text{Bobot} - 1) \times \text{Cost/Kg}$. Pilihan dropdown titik asal dan tujuan bersifat antarmuka perancangan (belum terhubung ke API matriks jarak dinamis). |
| **Payment Gateway Midtrans Snap** | **Simulasi / Mock** | Tampilan QRIS (SVG mock) dan nomor Virtual Account tiruan. Tombol pembayaran mengeksekusi simulasi timer 1 detik untuk mengubah status pesanan menjadi `paid` tanpa komunikasi ke server Midtrans. |
| **Hub Ekspor B2B (Formulir RFQ)** | **Simulasi Tampilan** | Menghitung estimasi nilai kontrak kontainer (20ft / 40ft) di UI; tombol kirim RFQ memunculkan notifikasi sukses berbasis timer lokal tanpa pengiriman data ke server eksternal. |
| **Grafik & Metrik Tren Penjualan** | **Tampilan Data Contoh** | Grafik batang bulanan dan angka statistik potensi (1.2 Miliar butir kelapa, 38 sentra mitra) merupakan data representasi statis. |
| **Autentikasi Pengguna & Role** | **Tidak Ada** | Tidak menggunakan sistem login / JWT / session. Semua modul dapat diakses langsung untuk keperluan evaluasi prototipe. |
| **Koneksi Database Fisik** | **Tidak Ada** | Tidak terhubung ke server database aktif (menggunakan in-memory store dan `localStorage`). |

---

## 🛠️ Tech Stack yang Terverifikasi & Akurat

Proyek ini dibangun menggunakan teknologi modern dengan arsitektur berbasis komponen:

- **Frontend Framework**: [Next.js 14.2 (App Router)](https://nextjs.org/)
- **UI Library**: [React 18](https://react.dev/)
- **Bahasa Pemrograman**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode & Type Safety)
- **Styling Engine**: [Tailwind CSS v3.4](https://tailwindcss.com/) dengan tema warna *Fresh Leaf Green* (`#16A34A`, `#22C55E`, `#84CC16`)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **State Management**: Reactive Client Store kustom (`src/lib/store.ts`) dengan *fail-safe* `localStorage`
- **Data Mock**: In-Memory Mock Dataset (`src/lib/mockData.ts`)
- **API Simulation**: Next.js Route Handlers (`src/app/api/*`)
- **Database Blueprint**: 9 Tabel Relasional DDL Normalisasi 3NF ([`schema.sql`](schema.sql))

---

## 📂 Struktur Direktori Proyek

```text
├── .env.example                       # Template konfigurasi environment (untuk integrasi masa depan)
├── .gitignore                         # Mengamankan seluruh file environment (*.env*) dan secret
├── DESIGN.md                          # Panduan token desain antarmuka
├── LICENSE                            # Lisensi sumber terbuka MIT
├── README.md                          # Dokumentasi resmi & lembar fakta proyek
├── package.json                       # Konfigurasi package, scripts, dan dependencies
├── schema.sql                         # Cetak biru 9 tabel Relational Database DDL (PostgreSQL & MySQL)
├── tailwind.config.js                 # Konfigurasi Tailwind CSS & warna kustom
├── tsconfig.json                      # Konfigurasi TypeScript paths
├── src/
│   ├── app/
│   │   ├── api/                       # API Route Handlers (RESTful Architecture)
│   │   │   ├── analytics/route.ts     # Endpoint GET analitik omzet UMKM
│   │   │   ├── commodities/route.ts   # Endpoint GET & filter katalog komoditas
│   │   │   ├── orders/route.ts        # Endpoint GET & POST pembuatan pesanan
│   │   │   ├── payment/route.ts       # Endpoint POST simulasi webhook Midtrans
│   │   │   └── shipping/route.ts      # Endpoint POST kalkulasi ongkos kirim
│   │   ├── globals.css                # Style global, animasi, dan custom utility
│   │   ├── layout.tsx                 # Root layout aplikasi & metadata SEO
│   │   └── page.tsx                   # Single Page Application utama
│   ├── components/
│   │   ├── ArchitectureModal.tsx      # Modal blueprint arsitektur sistem & REST API
│   │   ├── CartDrawer.tsx             # Drawer keranjang belanja & form checkout
│   │   ├── CommodityCatalog.tsx       # Grid kartu komoditas responsif 2-kolom mobile
│   │   ├── Footer.tsx                 # Footer resmi dengan identitas prototipe
│   │   ├── GlobalExportHub.tsx        # Modul simulasi ekspor B2B & Request for Quotation
│   │   ├── Header.tsx                 # Banner prototipe, navbar, pencarian, & tombol reset
│   │   ├── MidtransModal.tsx          # Modal simulator pembayaran Midtrans Snap (QRIS / VA)
│   │   ├── MobileBottomNav.tsx        # Fixed bottom navigation bar ramah jempol untuk smartphone
│   │   ├── NavigationTabs.tsx         # Tab switcher (Katalog, Ekspor, Kargo, Seller)
│   │   ├── ProductDetailModal.tsx     # Bottom sheet modal rincian spesifikasi & grade produk
│   │   ├── ShippingCalculator.tsx     # Kalkulator rute kargo air (pompong/speedboat) & darat
│   │   ├── SqlSchemaViewer.tsx        # Penampil berkas schema.sql interaktif
│   │   └── UmkmDashboard.tsx          # Dashboard Seller Centre (omzet, restock stok, & status order)
│   └── lib/
│       ├── mockData.ts                # Data komoditas, UMKM, rute logistik, dan analitik
│       ├── store.ts                   # Hook manajemen state reaktif & sinkronisasi local storage
│       └── types.ts                   # Definisi tipe domain TypeScript (TypeScript Interfaces)
```

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan prototipe di komputer lokal:

### 1. Kloning Repositori
```bash
git clone https://github.com/daffatradejournal-cmyk/studikasusimpor.git
cd "studikasusimpor"
```

### 2. Salin Berkas Environment (Opsional)
Aplikasi dapat berjalan langsung tanpa berkas `.env`, namun berkas template telah disediakan untuk kebutuhan pengembangan lebih lanjut:
```bash
cp .env.example .env.local
```

### 3. Instal Dependensi
```bash
npm install
```

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka peramban Anda di alamat: **[http://localhost:3000](http://localhost:3000)**

### 5. Uji Build Produksi
Untuk memvalidasi bahwa seluruh komponen TypeScript dan styling bebas error kompilasi:
```bash
npm run build
npm run start
```

---

## 🗄️ Cetak Biru Basis Data Relasional (`schema.sql`)

Meskipun aplikasi saat ini berjalan menggunakan in-memory state, berkas [`schema.sql`](schema.sql) telah disiapkan secara lengkap untuk skenario penerapan basis data relasional fisik (kompatibel dengan **PostgreSQL** dan **MySQL**):

```sql
-- Contoh struktur 9 entitas yang dimodelkan:
1. users                 -- Pengguna sistem (pembeli, pedagang UMKM, admin koperasi)
2. merchants             -- Profil sentra usaha, NIB, sertifikasi halal, dan dermaga asal
3. categories            -- Klasifikasi komoditas (kelapa, olahan gambut, kuliner, kerajinan)
4. commodities           -- Master data komoditas, stok gudang, berat, dan grade mutu
5. shipping_routes       -- Matriks tarif armada air (speedboat/pompong) dan kargo darat
6. orders                -- Header transaksi pesanan dan status pemenuhan
7. order_items           -- Rincian komoditas dan subtotal per item
8. payment_transactions  -- Log status transaksi payment gateway
9. stock_movements       -- Riwayat mutasi arus keluar-masuk stok gudang
```

---

## 👨‍💻 Peran Pengembang & Informasi Portofolio

Proyek ini dikembangkan secara **mandiri (proyek independen)** oleh:

* **Nama Pengembang**: Muhammad Daffa
* **Institusi / Latar Belakang**: S1 Sistem Informasi
* **Peran dalam Proyek**:
  - **Business Process Analyst**: Memetakan kendala rantai pasok komoditas lokal Indragiri Hilir ke dalam model e-commerce dan logistik perairan.
  - **UI/UX Designer**: Merancang antarmuka ramah pengguna dengan skema warna hijau daun alami (*fresh leaf green*) dan tata letak responsif ramah layar ponsel (*mobile bottom navigation & bottom sheet modals*).
  - **Database Architect**: Menyusun skema relasional 9 tabel ternormalisasi (3NF) dalam berkas `schema.sql`.
  - **Full-Stack / Frontend Developer**: Mengimplementasikan antarmuka interaktif menggunakan Next.js 14, TypeScript, Tailwind CSS, dan custom reactive client store.

---

## 📄 Lisensi

Proyek ini didistribusikan di bawah lisensi terbuka [MIT License](LICENSE).
