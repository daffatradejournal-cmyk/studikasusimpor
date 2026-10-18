'use client';

import React from 'react';
import {
  X,
  Network,
  Database,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  Server,
  FileCode,
  GraduationCap,
  MapPin,
  Palmtree,
  CreditCard,
  Ship,
  Leaf,
  BarChart3,
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSql: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSql,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 leaf-header-bg text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  Arsitektur Sistem Informasi PasarTembilahan
                </h2>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  S1 SI UNISI
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                Blueprint Rekayasa Perangkat Lunak, Relational Database & Integrasi Rantai Pasok
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-slate-700">
          {/* Spotlight Banner: S1 Sistem Informasi Ngapain Aja? */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border border-emerald-200/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Peran & Rekayasa S1 Sistem Informasi (Ngapain Aja di Proyek Ini?)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mahasiswa S1 Sistem Informasi berperan sebagai <strong>System Analyst & Full-Stack Engineer</strong> yang menjembatani masalah bisnis komoditas di lapangan dengan arsitektur teknologi:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">1. Business Process Analysis</span>
                <p className="font-bold text-xs text-slate-800">Pemotongan Rantai Tengkulak</p>
                <p className="text-[11px] text-slate-500">Meredesain proses bisnis rantai pasok kelapa dari 4 layer spekulan ke model direct e-commerce.</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-teal-700 uppercase">2. Database Engineering (3NF)</span>
                <p className="font-bold text-xs text-slate-800">9 Skema Relasional & Constraint</p>
                <p className="text-[11px] text-slate-500">Menyusun DDL, Primary-Foreign Keys, CHECK constraint anti-stok negatif, dan audit ledger.</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-sky-700 uppercase">3. System Integration</span>
                <p className="font-bold text-xs text-slate-800">Midtrans Webhook & REST API</p>
                <p className="text-[11px] text-slate-500">Menghubungkan 5 route API dengan verifikasi callback transaksi QRIS dan Virtual Account perbankan.</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase">4. Logistics Modeling</span>
                <p className="font-bold text-xs text-slate-800">Kalkulasi Rute Perairan Sungai</p>
                <p className="text-[11px] text-slate-500">Memodelkan tarif Pompong Parit 21 dan Speedboat Express yang khas dengan geografis Seribu Parit Inhil.</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-lime-700 uppercase">5. Decision Support System</span>
                <p className="font-bold text-xs text-slate-800">Dashboard Seller Centre UMKM</p>
                <p className="text-[11px] text-slate-500">Menyajikan analitik omzet harian, grafik bulanan, dan sistem peringatan restock bagi petani.</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-amber-700 uppercase">6. UI/UX Human-Centered</span>
                <p className="font-bold text-xs text-slate-800">Desain Hijau Daun Alami</p>
                <p className="text-[11px] text-slate-500">Antarmuka ramah pengguna lokal dengan palet daun perkebunan tropis yang fleksibel dan organik.</p>
              </div>
            </div>
          </div>

          {/* Metrik Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                Focus Area
              </span>
              <p className="text-sm font-extrabold text-emerald-950">
                Business Process & E-Commerce
              </p>
              <p className="text-[11px] text-emerald-700">
                Otomasi rantai pasok kelapa Inhil & eliminasi perantara spekulan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">
                Architecture Standard
              </span>
              <p className="text-sm font-extrabold text-teal-950">
                RESTful API & Relational DB
              </p>
              <p className="text-[11px] text-teal-700">
                Dual-engine PostgreSQL/MySQL dengan ACID transaction & Webhook.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-lime-50 border border-lime-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-lime-800 tracking-wider">
                Target Komunitas
              </span>
              <p className="text-sm font-extrabold text-lime-950">
                UMKM & Komoditas Daerah
              </p>
              <p className="text-[11px] text-lime-700">
                Petani kelapa, pengrajin sabut, & UMKM Indragiri Hilir.
              </p>
            </div>
          </div>

          {/* Business Process Flow */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-emerald-600" />
              Alur Rantai Pasok (Business Process Flow)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center font-mono text-[11px]">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">1. Petani / UMKM</strong>
                <span className="text-slate-500 text-[10px]">Input stok komoditas</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">2. Pembeli</strong>
                <span className="text-slate-500 text-[10px]">Pilih rute air / darat</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">3. Midtrans Snap</strong>
                <span className="text-slate-500 text-[10px]">Settlement otomatis</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">4. Dispatch Kurir</strong>
                <span className="text-slate-500 text-[10px]">Pompong / Speedboat</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-xs">
                <strong className="block">5. Selesai</strong>
                <span className="text-emerald-100 text-[10px]">Stok & omzet update</span>
              </div>
            </div>
          </div>

          {/* REST API Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-emerald-600" />
              Spesifikasi RESTful API Gateway
            </h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-3.5 py-2">Metode & Endpoint</th>
                    <th className="px-3.5 py-2">Deskripsi Fungsi Bisnis</th>
                    <th className="px-3.5 py-2">Payload / Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="px-3.5 py-2 text-emerald-700 font-bold">GET /api/commodities</td>
                    <td className="px-3.5 py-2 font-sans">Katalog komoditas & filter kategori</td>
                    <td className="px-3.5 py-2 text-slate-500">?category=kelapa</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 text-sky-700 font-bold">POST /api/shipping</td>
                    <td className="px-3.5 py-2 font-sans">Kalkulasi ongkir rute air vs darat</td>
                    <td className="px-3.5 py-2 text-slate-500">&#123; weightKg, courierCode &#125;</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 text-sky-700 font-bold">POST /api/orders</td>
                    <td className="px-3.5 py-2 font-sans">Pembuatan pesanan & alokasi stok</td>
                    <td className="px-3.5 py-2 text-slate-500">&#123; items, buyerDetails &#125;</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 text-emerald-700 font-bold">POST /api/payment</td>
                    <td className="px-3.5 py-2 font-sans">Midtrans webhook callback verification</td>
                    <td className="px-3.5 py-2 text-slate-500">&#123; transaction_status &#125;</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 text-emerald-700 font-bold">GET /api/analytics</td>
                    <td className="px-3.5 py-2 font-sans">KPI omzet penjualan & batas stok</td>
                    <td className="px-3.5 py-2 text-slate-500">&#123; totalRevenue, ... &#125;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Footer */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <strong className="text-slate-900 block font-bold">Muhammad Daffa — S1 Sistem Informasi</strong>
              <span className="text-[11px] text-slate-500">Universitas Islam Indragiri (UNISI) • Tembilahan, Riau</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onSwitchToSql();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
            >
              Lihat Skema SQL DDL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
