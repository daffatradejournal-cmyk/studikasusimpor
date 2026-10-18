'use client';

import React from 'react';
import { Palmtree, GraduationCap, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'katalog' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-12 bg-[#FBFBFB] border-t-4 border-[#EE4D2D] text-[#555555] text-xs">
      {/* Top 4 Columns Shopee Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#222222] text-xs uppercase tracking-wider">
              LAYANAN PELANGGAN
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><span className="hover:text-[#EE4D2D] cursor-pointer">Pusat Bantuan PasarTembilahan</span></li>
              <li><span className="hover:text-[#EE4D2D] cursor-pointer">Metode Pembayaran Midtrans Snap</span></li>
              <li><span className="hover:text-[#EE4D2D] cursor-pointer">Pelacakan Pesanan & Resi Pengiriman</span></li>
              <li><span className="hover:text-[#EE4D2D] cursor-pointer">Garansi Komoditas Petani Langsung</span></li>
              <li><span className="hover:text-[#EE4D2D] cursor-pointer">Hubungi Koperasi Sentra Parit</span></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#222222] text-xs uppercase tracking-wider">
              JELAJAHI PASARTEMBILAHAN
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onSelectTab('katalog')} className="hover:text-[#EE4D2D] text-left">
                  Katalog Komoditas Multi-Kategori
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-[#EE4D2D] text-left">
                  Shopee Seller Centre UMKM
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ongkir')} className="hover:text-[#EE4D2D] text-left">
                  Kalkulator Ongkir Jalur Sungai Inhil
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('arsitektur')} className="hover:text-[#EE4D2D] text-left">
                  Blueprint Rekayasa Sistem & API
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('sql')} className="hover:text-[#EE4D2D] text-left">
                  Skema Relational Database (SQL)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Payment & Logistics */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#222222] text-xs uppercase tracking-wider">
              PEMBAYARAN & LOGISTIK
            </h4>
            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-[#5A5A5A] block mb-1">Mitra Gateway & Perbankan:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 bg-white border border-[#CCCCCC] rounded-xs font-bold text-[#EE4D2D] text-[10px]">
                    Midtrans
                  </span>
                  <span className="px-1.5 py-0.5 bg-white border border-[#CCCCCC] rounded-xs font-bold text-[#00BFA5] text-[10px]">
                    QRIS
                  </span>
                  <span className="px-1.5 py-0.5 bg-white border border-[#CCCCCC] rounded-xs font-semibold text-[#066BC8] text-[10px]">
                    BRK Syariah
                  </span>
                  <span className="px-1.5 py-0.5 bg-white border border-[#CCCCCC] rounded-xs font-semibold text-[#222222] text-[10px]">
                    BCA / Mandiri
                  </span>
                </div>
              </div>
              <div className="pt-1">
                <span className="text-[#5A5A5A] block mb-1">Armada Logistik Perairan & Darat:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 bg-white border border-[#CCCCCC] rounded-xs font-semibold text-[#066BC8] text-[10px]">
                    🚤 Speedboat Inhil
                  </span>
                  <span className="px-1.5 py-0.5 bg-white border border-[#CCCCCC] rounded-xs font-semibold text-[#555555] text-[10px]">
                    ⛵ Pompong Parit 21
                  </span>
                  <span className="px-1.5 py-0.5 bg-white border border-[#CCCCCC] rounded-xs font-semibold text-[#EE4D2D] text-[10px]">
                    🚚 J&T Cargo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Pengembang & Kampus */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#222222] text-xs uppercase tracking-wider">
              PENGEMBANG & INSTITUSI
            </h4>
            <div className="space-y-1 text-[11px]">
              <p className="font-bold text-[#222222] flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#EE4D2D]" />
                Muhammad Daffa
              </p>
              <p className="text-[#555555]">S1 Sistem Informasi</p>
              <p className="text-[#EE4D2D] font-bold">Universitas Islam Indragiri (UNISI)</p>
              <p className="text-[#5A5A5A] pt-1">
                Tembilahan, Indragiri Hilir, Riau — <em>Negeri Hamparan Kelapa Dunia</em>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-8 border-t border-[#CCCCCC]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#5A5A5A]">
          <p>© 2026 PasarTembilahan. Terinspirasi oleh Shopee.com Design System • Studi Kasus UNISI.</p>
          <div className="flex items-center gap-1">
            <span>Dirancang dengan</span>
            <Heart className="w-3 h-3 text-[#EE4D2D] fill-[#EE4D2D]" />
            <span>untuk memajukan UMKM & Petani Komoditas Indragiri Hilir.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
