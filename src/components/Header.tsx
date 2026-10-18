'use client';

import React from 'react';
import { ShoppingCart, Search, Bell, HelpCircle, MapPin, Sparkles, RefreshCw, Layers } from 'lucide-react';
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
    'VCO Murni',
    'Amplang Udang',
    'Dodol Nanas',
    'Kopi Liberika Gambut',
    'Tanjak Melayu',
  ];

  return (
    <header className="sticky top-0 z-40 w-full shopee-header-bg shadow-shopee-header text-white">
      {/* Shopee Top Sub-Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[11px] border-b border-white/10 font-normal">
        <div className="flex items-center gap-3">
          <span className="hover:text-white/80 cursor-pointer">Kemitraan UMKM & Koperasi Inhil</span>
          <span className="text-white/40">|</span>
          <span className="hover:text-white/80 cursor-pointer flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCE3D]" />
            S1 Sistem Informasi UNISI
          </span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="hover:text-white/80 cursor-pointer hidden sm:flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#FFCE3D]" />
            Indragiri Hilir — Negeri Hamparan Kelapa Dunia
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenArchitecture}
            className="hover:text-white/80 cursor-pointer flex items-center gap-1 font-medium"
          >
            <Sparkles className="w-3 h-3 text-[#FFCE3D]" />
            <span>Dokumentasi Arsitektur</span>
          </button>
          <span className="text-white/40">|</span>
          <button
            onClick={onResetData}
            title="Reset simulasi ke data awal"
            className="hover:text-white/80 cursor-pointer flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Shopee Main Search & Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4 sm:gap-8">
        {/* Logo Shopee Style */}
        <div
          onClick={() => onSearchChange('')}
          className="flex items-center gap-2 cursor-pointer select-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xs flex items-center justify-center text-[#EE4D2D] shadow-sm font-black text-xl tracking-tighter">
            PT
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-titillium text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                PasarTembilahan
              </span>
              <span className="bg-white text-[#EE4D2D] font-bold text-[9px] px-1 py-0.2 rounded-xs uppercase tracking-wider">
                MALL
              </span>
            </div>
            <p className="text-[10px] text-white/90 font-light hidden sm:block">
              Komoditas & UMKM Indragiri Hilir
            </p>
          </div>
        </div>

        {/* Shopee Style Central Search Container */}
        <div className="flex-1 max-w-2xl">
          <div className="relative flex items-center bg-white rounded-xs p-1 shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari komoditas kelapa, kopra, VCO, amplang udang, kopi liberika..."
              className="flex-1 px-3 py-1.5 text-xs sm:text-sm text-[#222222] placeholder:text-[#5A5A5A] outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-[#5A5A5A] hover:text-[#222222] px-2"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => {}}
              className="bg-[#EE4D2D] hover:bg-[#F05D40] active:bg-[#E2492B] text-white px-5 sm:px-6 py-2 rounded-xs flex items-center justify-center transition-colors shadow-xs"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Popular Keyword Suggestions Below Search (Shopee Signature) */}
          <div className="hidden lg:flex items-center gap-2.5 mt-1.5 text-[11px] text-white/90 overflow-hidden whitespace-nowrap">
            {popularKeywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => onSearchChange(kw)}
                className="hover:text-[#FFCE3D] transition-colors truncate"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Shopping Cart Button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onOpenCart}
            className="relative p-2.5 hover:opacity-90 transition-opacity flex items-center justify-center"
            title="Buka Keranjang Belanja"
          >
            <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[1.8]" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-0.5 min-w-[20px] h-[18px] px-1 bg-white text-[#EE4D2D] border border-[#EE4D2D] text-[11px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
