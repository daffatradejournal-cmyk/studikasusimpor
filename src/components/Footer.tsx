'use client';

import React from 'react';
import { Palmtree, GraduationCap, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'katalog' | 'ekspor' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-8 sm:mt-12 bg-white border-t-4 border-emerald-600 text-slate-600 text-xs">
      {/* Top 4 Columns Leaf Green Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-24 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              LAYANAN PELANGGAN & EKSPOR
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Pusat Bantuan PasarTembilahan</span></li>
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Desk Konsultasi Ekspor B2B & Kontainer</span></li>
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Metode Pembayaran Midtrans & L/C</span></li>
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Pelacakan Kargo Sungai & Samudera</span></li>
              <li><span className="hover:text-emerald-700 cursor-pointer transition-colors">Garansi Komoditas Petani Langsung</span></li>
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
                  Katalog Komoditas Ekspor & UMKM
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ekspor')} className="hover:text-emerald-700 text-left transition-colors font-bold text-emerald-800">
                  Hub Pasar Ekspor Dunia (B2B & RFQ)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ongkir')} className="hover:text-emerald-700 text-left transition-colors">
                  Kalkulator Kargo Sungai-Laut Inhil
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-emerald-700 text-left transition-colors">
                  Seller Centre Petani & Koperasi
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('arsitektur')} className="hover:text-emerald-700 text-left transition-colors text-slate-400">
                  Spesifikasi Teknis & Arsitektur API
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

          {/* Col 4: Pusat Komoditas & Wilayah */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              HUB PERDAGANGAN & EKSPOR
            </h4>
            <div className="space-y-1 text-[11px]">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Indragiri Hilir, Riau, Indonesia
              </p>
              <p className="text-slate-600 font-medium">Sentra Kelapa Terbesar di Dunia</p>
              <p className="text-emerald-700 font-bold">Pelabuhan Samudera Kuala Enok & Parit 21</p>
              <p className="text-slate-500 pt-1">
                Karya Inisiatif Digitalisasi Rantai Pasok oleh <strong>Muhammad Daffa</strong> • UNISI.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© 2026 PasarTembilahan Global. Platform E-Commerce & Perdagangan Komoditas Ekspor Menuju Pasar Dunia.</p>
          <div className="flex items-center gap-1.5">
            <span>Dirancang dengan</span>
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>untuk memajukan komoditas petani & UMKM Indragiri Hilir mendunia.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
