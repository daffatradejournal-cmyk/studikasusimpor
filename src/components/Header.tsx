'use client';

import React from 'react';
import { ShoppingBag, Search, MapPin, Globe, RefreshCw } from 'lucide-react';
import { CartItem } from '../lib/types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onResetData: () => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onResetData,
  onOpenArchitecture,
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs border-b border-white/15">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] sm:text-[11px] shadow-xs">
            <Globe className="w-3 h-3 text-lime-300 shrink-0" />
            <span className="truncate max-w-[170px] sm:max-w-none">Pasar Komoditas & Ekspor Global</span>
          </div>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1 text-emerald-100 text-[11px]">
            <MapPin className="w-3 h-3 text-lime-300" />
            Tembilahan, Indragiri Hilir — Gerbang Ekspor Parit 21 & Pelabuhan Kuala Enok
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
          <div className="hidden md:flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-emerald-100 font-medium">
            <span>🌏 Jalur Ekspor: SGP • MYS • CHN • MEA</span>
          </div>
          <span className="text-white/40 hidden md:inline">|</span>
          <button
            onClick={onResetData}
            title="Reset simulasi ke data awal"
            className="flex items-center gap-1 text-white/90 hover:text-white transition-colors py-0.5 px-1.5 rounded-lg bg-white/10 sm:bg-transparent"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Search & Branding Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-8">
          {/* Brand / Logo */}
          <div
            onClick={() => onSearchChange('')}
            className="flex items-center gap-2 cursor-pointer select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white text-emerald-700 font-black text-lg sm:text-xl flex items-center justify-center shadow-md shadow-emerald-950/20">
              PT
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-white leading-none">
                  Pasar<span className="text-lime-300">Tembilahan</span>
                </span>
                <span className="bg-lime-400 text-emerald-950 font-black text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
                  EKSPOR
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-emerald-100 font-medium hidden sm:block mt-0.5">
                Penghubung Komoditas Kelapa & UMKM Tembilahan ke Pasar Dunia
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden sm:block flex-1 max-w-2xl">
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
          </div>

          {/* Shopping Cart Pill Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all flex items-center gap-2 border border-white/20 active:scale-95"
              title="Buka Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline font-bold text-xs">Keranjang</span>
              {totalCartCount > 0 && (
                <span className="min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] px-1 bg-lime-400 text-emerald-950 font-black text-[10px] sm:text-[11px] rounded-full flex items-center justify-center leading-none shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dedicated Full-Width Search Bar */}
        <div className="sm:hidden mt-2.5">
          <div className="relative flex items-center bg-white rounded-xl p-1 shadow-md shadow-emerald-950/10 border border-white/60">
            <Search className="w-4 h-4 text-emerald-700 ml-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari kelapa, kopra, VCO, amplang..."
              className="flex-1 px-2.5 py-1 text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-slate-400 hover:text-slate-700 px-1.5"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => {}}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Popular Keywords Pill Tags (Horizontally Scrollable) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 text-[10px] sm:text-[11px] text-white/90 overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-emerald-200 font-semibold shrink-0">Populer:</span>
          {popularKeywords.map((kw, i) => (
            <button
              key={i}
              onClick={() => onSearchChange(kw)}
              className="hover:text-lime-200 transition-colors bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
