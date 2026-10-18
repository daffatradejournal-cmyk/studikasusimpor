'use client';

import React from 'react';
import { ShoppingBag, Search, MapPin, Sparkles, RefreshCw, GraduationCap } from 'lucide-react';
import { CartItem } from '../lib/types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onResetData: () => void;
  onOpenArchitecture: () => void;
  onOpenSiRole?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onResetData,
  onOpenArchitecture,
  onOpenSiRole,
}) => {
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const popularKeywords = [
    'Kelapa Butir Parit 13',
    'Kopra Putih Ekspor',
    'VCO Murni Cold-Pressed',
    'Amplang Udang Concong',
    'Dodol Nanas Sei Salak',
    'Kopi Liberika Gambut',
    'Tanjak Melayu',
  ];

  return (
    <header className="sticky top-0 z-40 w-full leaf-header-bg text-white shadow-header">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs border-b border-white/15">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSiRole}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold transition-colors text-[11px]"
          >
            <GraduationCap className="w-3.5 h-3.5 text-lime-300" />
            <span>S1 Sistem Informasi UNISI</span>
          </button>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1 text-emerald-100 text-[11px]">
            <MapPin className="w-3 h-3 text-lime-300" />
            Indragiri Hilir — Negeri Hamparan Kelapa Dunia
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-[11px]">
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1 hover:text-lime-200 transition-colors font-medium"
          >
            <Sparkles className="w-3 h-3 text-lime-300" />
            <span>Dokumentasi Arsitektur</span>
          </button>
          <span className="text-white/40">|</span>
          <button
            onClick={onResetData}
            title="Reset simulasi ke data awal"
            className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Search & Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4 sm:gap-8">
        {/* Brand / Logo */}
        <div
          onClick={() => onSearchChange('')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-white text-emerald-700 font-black text-xl flex items-center justify-center shadow-md shadow-emerald-950/20">
            PT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                Pasar<span className="text-lime-300">Tembilahan</span>
              </span>
              <span className="bg-lime-400 text-emerald-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                KOMODITAS
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 font-medium hidden sm:block mt-0.5">
              Platform E-Commerce & Logistik Perairan UMKM Inhil
            </p>
          </div>
        </div>

        {/* Central Search Input Container (Smooth Rounded-2xl, Bukan Kotak Kaku) */}
        <div className="flex-1 max-w-2xl">
          <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-md shadow-emerald-950/10 border border-white/60">
            <Search className="w-4 h-4 text-emerald-700 ml-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari kelapa butir, kopra, VCO, amplang udang, kopi liberika..."
              className="flex-1 px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-slate-400 hover:text-slate-700 px-2"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => {}}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Cari
            </button>
          </div>

          {/* Popular Keywords Pill Tags */}
          <div className="hidden lg:flex items-center gap-2 mt-2 text-[11px] text-white/90 overflow-hidden whitespace-nowrap">
            <span className="text-emerald-200 font-semibold">Populer:</span>
            {popularKeywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => onSearchChange(kw)}
                className="hover:text-lime-200 transition-colors bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-full"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Shopping Cart Pill Button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all flex items-center gap-2 border border-white/20"
            title="Buka Keranjang Belanja"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="hidden sm:inline font-bold text-xs">Keranjang</span>
            {totalCartCount > 0 && (
              <span className="min-w-[20px] h-[20px] px-1.5 bg-lime-400 text-emerald-950 font-extrabold text-[11px] rounded-full flex items-center justify-center leading-none shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
