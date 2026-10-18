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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#000000]/60 backdrop-blur-2xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-xs shadow-shopee-hover border border-[#CCCCCC] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header Shopee Style */}
        <div className="p-4 sm:p-5 shopee-header-bg text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xs bg-white text-[#EE4D2D] font-bold text-sm flex items-center justify-center shadow-xs">
              PT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-titillium text-base sm:text-lg font-bold">
                  Arsitektur Sistem Informasi PasarTembilahan
                </h2>
                <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-xs">
                  S1 SI UNISI
                </span>
              </div>
              <p className="text-[11px] text-white/90">
                Blueprint Rekayasa Perangkat Lunak, Relational Database & RESTful API Gateway
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xs bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs text-[#222222]">
          {/* Metrik Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-3 rounded-xs bg-[#FACAC0]/25 border border-[#FACAC0] space-y-1">
              <span className="text-[10px] font-bold text-[#D0011B] uppercase tracking-wider block">
                Focus Area
              </span>
              <p className="text-xs font-bold text-[#222222]">
                Business Process & E-Commerce
              </p>
              <p className="text-[11px] text-[#555555]">
                Otomasi rantai pasok kelapa Inhil & eliminasi perantara spekulan.
              </p>
            </div>

            <div className="p-3 rounded-xs bg-[#00BFA5]/10 border border-[#00BFA5]/30 space-y-1">
              <span className="text-[10px] font-bold text-[#00BFA5] uppercase tracking-wider block">
                Architecture Standard
              </span>
              <p className="text-xs font-bold text-[#222222]">
                RESTful API & Relational DB
              </p>
              <p className="text-[11px] text-[#555555]">
                Dual-engine PostgreSQL/MySQL dengan ACID transaction & Webhook.
              </p>
            </div>

            <div className="p-3 rounded-xs bg-[#FFCE3D]/20 border border-[#FFCE3D]/60 space-y-1">
              <span className="text-[10px] font-bold text-[#222222] uppercase tracking-wider block">
                Target Komunitas
              </span>
              <p className="text-xs font-bold text-[#222222]">
                UMKM & Komoditas Daerah
              </p>
              <p className="text-[11px] text-[#555555]">
                Petani kelapa, pengrajin sabut, & UMKM Indragiri Hilir.
              </p>
            </div>
          </div>

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC]/60 space-y-2">
              <span className="text-[11px] font-bold text-[#D0011B] uppercase tracking-wider block">
                ⚠️ Masalah Bisnis (Problem)
              </span>
              <ul className="space-y-1 text-[11px] text-[#555555] list-disc list-inside">
                <li>Petani terjebak tengkulak berlapis yang menekan margin harga komoditas.</li>
                <li>Ketidakpastian tarif logistik perairan sungai parit pasang surut Inhil.</li>
                <li>Pencatatan manual di kertas memicu kekeliruan stok dan omzet harian.</li>
                <li>Jangkauan pasar terbatas di lingkup kabupaten tanpa katalog terverifikasi.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC]/60 space-y-2">
              <span className="text-[11px] font-bold text-[#00BFA5] uppercase tracking-wider block">
                💡 Solusi Sistem Informasi (Solution)
              </span>
              <ul className="space-y-1 text-[11px] text-[#555555] list-disc list-inside">
                <li>Katalog digital komoditas multi-kategori terverifikasi grade mutu ekspor.</li>
                <li>Kalkulator ongkir spesifik moda perairan (pompong & speedboat) dan darat.</li>
                <li>Payment Gateway Midtrans otomatis (QRIS & Virtual Account BRK Syariah).</li>
                <li>Dashboard analitik Seller Centre untuk monitoring omzet dan stok kritis.</li>
              </ul>
            </div>
          </div>

          {/* Business Process Flow */}
          <div className="space-y-2">
            <h3 className="font-titillium font-bold text-xs uppercase tracking-wider text-[#222222]">
              Alur Rantai Pasok (Business Process Flow)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5 text-center font-mono text-[10px]">
              <div className="p-2 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC]">
                <strong className="text-[#222222] block">1. Petani / UMKM</strong>
                <span className="text-[#5A5A5A]">Input stok komoditas</span>
              </div>
              <div className="p-2 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC]">
                <strong className="text-[#222222] block">2. Pembeli</strong>
                <span className="text-[#5A5A5A]">Pilih rute air/darat</span>
              </div>
              <div className="p-2 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC]">
                <strong className="text-[#222222] block">3. Midtrans Snap</strong>
                <span className="text-[#5A5A5A]">Settlement otomatis</span>
              </div>
              <div className="p-2 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC]">
                <strong className="text-[#222222] block">4. Dispatch Kurir</strong>
                <span className="text-[#5A5A5A]">Pompong / Speedboat</span>
              </div>
              <div className="p-2 rounded-xs bg-[#EE4D2D] text-white">
                <strong className="block">5. Selesai</strong>
                <span className="text-white/80">Stok & omzet update</span>
              </div>
            </div>
          </div>

          {/* REST API Table */}
          <div className="space-y-2">
            <h3 className="font-titillium font-bold text-xs uppercase tracking-wider text-[#222222]">
              Spesifikasi RESTful API Gateway
            </h3>
            <div className="border border-[#CCCCCC] rounded-xs overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#FAFAFA] text-[#555555] font-bold border-b border-[#CCCCCC]">
                  <tr>
                    <th className="px-3 py-1.5">Metode & Endpoint</th>
                    <th className="px-3 py-1.5">Deskripsi Fungsi</th>
                    <th className="px-3 py-1.5">Format Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F5F5] font-mono">
                  <tr>
                    <td className="px-3 py-1.5 text-[#00BFA5] font-bold">GET /api/commodities</td>
                    <td className="px-3 py-1.5 font-sans">Katalog komoditas & filter kategori</td>
                    <td className="px-3 py-1.5 text-[#5A5A5A]">?category=kelapa</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-[#066BC8] font-bold">POST /api/shipping</td>
                    <td className="px-3 py-1.5 font-sans">Kalkulasi ongkir rute air vs darat</td>
                    <td className="px-3 py-1.5 text-[#5A5A5A]">&#123; weightKg, courierCode &#125;</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-[#066BC8] font-bold">POST /api/orders</td>
                    <td className="px-3 py-1.5 font-sans">Pembuatan pesanan & alokasi stok</td>
                    <td className="px-3 py-1.5 text-[#5A5A5A]">&#123; items, buyerDetails &#125;</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-[#EE4D2D] font-bold">POST /api/payment</td>
                    <td className="px-3 py-1.5 font-sans">Midtrans webhook callback verification</td>
                    <td className="px-3 py-1.5 text-[#5A5A5A]">&#123; transaction_status &#125;</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-[#00BFA5] font-bold">GET /api/analytics</td>
                    <td className="px-3 py-1.5 font-sans">KPI omzet penjualan & batas stok</td>
                    <td className="px-3 py-1.5 text-[#5A5A5A]">&#123; totalRevenue, ... &#125;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Footer */}
          <div className="p-3 bg-[#FAFAFA] rounded-xs border border-[#CCCCCC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div>
              <strong className="text-[#222222] block">Muhammad Daffa — S1 Sistem Informasi</strong>
              <span className="text-[11px] text-[#555555]">Universitas Islam Indragiri (UNISI) • Tembilahan, Riau</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onSwitchToSql();
              }}
              className="px-3 py-1.5 bg-[#EE4D2D] hover:bg-[#F05D40] text-white font-bold text-xs rounded-xs transition-colors"
            >
              Lihat Skema SQL DDL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
