'use client';

import React from 'react';
import { Palmtree, GraduationCap, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'katalog' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-12 bg-white border-t-4 border-emerald-600 text-slate-600 text-xs">
      {/* Top 4 Columns Leaf Green Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              LAYANAN PELANGGAN
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Pusat Bantuan PasarTembilahan</span></li>
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Metode Pembayaran Midtrans Snap</span></li>
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Pelacakan Pesanan & Resi Pengiriman</span></li>
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Garansi Komoditas Petani Langsung</span></li>
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Hubungi Koperasi Sentra Parit</span></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              JELAJAHI PASARTEMBILAHAN
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onSelectTab('katalog')} className="hover:text-emerald-700 text-left transition-colors">
                  Katalog Komoditas Multi-Kategori
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-emerald-700 text-left transition-colors">
                  Seller Centre UMKM & Koperasi
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ongkir')} className="hover:text-emerald-700 text-left transition-colors">
                  Kalkulator Ongkir Jalur Sungai Inhil
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('arsitektur')} className="hover:text-emerald-700 text-left transition-colors">
                  Blueprint Rekayasa Sistem & API
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('sql')} className="hover:text-emerald-700 text-left transition-colors">
                  Skema Relational Database (SQL)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Payment & Logistics */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              PEMBAYARAN & LOGISTIK
            </h4>
            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-slate-500 block mb-1">Mitra Gateway & Perbankan:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full font-bold text-emerald-800 text-[10px]">
                    Midtrans Snap
                  </span>
                  <span className="px-2 py-0.5 bg-teal-50 border border-teal-200 rounded-full font-bold text-teal-800 text-[10px]">
                    QRIS Terpadu
                  </span>
                  <span className="px-2 py-0.5 bg-sky-50 border border-sky-200 rounded-full font-semibold text-sky-800 text-[10px]">
                    BRK Syariah
                  </span>
                  <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-full font-semibold text-slate-800 text-[10px]">
                    BCA / Mandiri
                  </span>
                </div>
              </div>
              <div className="pt-1">
                <span className="text-slate-500 block mb-1">Armada Logistik Perairan & Darat:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-full font-semibold text-blue-800 text-[10px]">
                    🚤 Speedboat Inhil
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full font-semibold text-emerald-800 text-[10px]">
                    ⛵ Pompong Parit 21
                  </span>
                  <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full font-semibold text-amber-800 text-[10px]">
                    🚚 J&T Cargo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Pengembang & Kampus */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              PENGEMBANG & INSTITUSI
            </h4>
            <div className="space-y-1 text-[11px]">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Muhammad Daffa
              </p>
              <p className="text-slate-600 font-medium">S1 Sistem Informasi</p>
              <p className="text-emerald-700 font-bold">Universitas Islam Indragiri (UNISI)</p>
              <p className="text-slate-500 pt-1">
                Tembilahan, Indragiri Hilir, Riau — <em>Negeri Hamparan Kelapa Dunia</em>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© 2026 PasarTembilahan. Platform E-Commerce Komoditas & UMKM Indragiri Hilir • S1 SI UNISI.</p>
          <div className="flex items-center gap-1.5">
            <span>Dirancang dengan</span>
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>untuk memajukan UMKM & Petani Komoditas Indragiri Hilir.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
