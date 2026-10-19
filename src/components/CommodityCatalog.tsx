'use client';

import React, { useState } from 'react';
import {
  Palmtree,
  Sprout,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Star,
  Plus,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Truck,
  Ship,
  Flame,
  BadgePercent,
  Award,
  Globe,
  Leaf,
} from 'lucide-react';
import { Commodity, CategoryId } from '../lib/types';
import { INITIAL_CATEGORIES } from '../lib/mockData';

interface CommodityCatalogProps {
  commodities: Commodity[];
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  onAddToCart: (commodity: Commodity, qty?: number) => void;
  onSelectProduct: (commodity: Commodity) => void;
  onOpenShippingCalculator: () => void;
  onOpenExportHub?: () => void;
}

export const CommodityCatalog: React.FC<CommodityCatalogProps> = ({
  commodities,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onSelectProduct,
  onOpenShippingCalculator,
  onOpenExportHub,
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'top_sales' | 'price_low' | 'price_high'>('popular');

  // Filter
  const filtered = commodities.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular' || sortBy === 'top_sales') return b.soldCount - a.soldCount;
    if (sortBy === 'latest') return b.id.localeCompare(a.id);
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    return 0;
  });

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'kelapa':
        return <Palmtree className="w-5 h-5 text-emerald-600" />;
      case 'perkebunan':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'kuliner':
        return <UtensilsCrossed className="w-5 h-5 text-amber-500" />;
      case 'kerajinan':
        return <Sparkles className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Global Marketplace Banner (Organic Rounded-3xl Curves) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Main Banner (2 Cols) */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-soft overflow-hidden flex flex-col justify-between min-h-[190px] sm:min-h-[220px]">
          <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2 sm:space-y-3 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-xs text-white text-[10px] sm:text-xs font-bold rounded-full">
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-lime-300" />
              <span>Pasar Komoditas Global & Ekspor Indragiri Hilir</span>
            </div>
            <h1 className="text-lg sm:text-3xl font-extrabold text-white leading-tight">
              Komoditas Tembilahan <span className="text-lime-300">Menembus Pasar Dunia</span>
            </h1>
            <p className="text-[11px] sm:text-sm text-emerald-50 leading-relaxed line-clamp-3 sm:line-clamp-none">
              Platform e-commerce & rantai pasok digital: Menghubungkan langsung petani kelapa, sentra kopra putih, produsen VCO, kopi liberika gambut, dan UMKM Tembilahan ke pembeli nasional serta importir mancanegara.
            </p>
          </div>

          <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-2 sm:gap-3 relative z-10">
            {onOpenExportHub && (
              <button
                onClick={onOpenExportHub}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-[11px] sm:text-xs rounded-full shadow-md transition-all active:scale-95 flex items-center gap-1.5 sm:gap-2"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Pusat Ekspor & RFQ</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
            <button
              onClick={onOpenShippingCalculator}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] sm:text-xs rounded-full transition-all flex items-center gap-1.5 sm:gap-2 backdrop-blur-xs active:scale-95"
            >
              <Ship className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-300" />
              <span>Kalkulator Kargo</span>
            </button>
            <span className="text-[10px] sm:text-xs text-emerald-100 bg-emerald-900/40 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-500/30 hidden xs:inline-block">
              🌍 8 Negara Tujuan
            </span>
          </div>
        </div>

        {/* 2 Side Cards (Smooth Rounded-2xl) */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
          {/* Card 1: Ekspor Dunia */}
          <div
            onClick={onOpenExportHub}
            className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100 shadow-soft flex items-center gap-2.5 sm:gap-3 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer active:scale-98"
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mb-0.5">
                KONTRAK EKSPOR
              </span>
              <h4 className="font-bold text-[11px] sm:text-xs text-slate-800 truncate">
                Singapura & MEA
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Partai besar / FCL
              </p>
            </div>
          </div>

          {/* Card 2: Logistik Perairan Multimodal */}
          <div
            onClick={onOpenShippingCalculator}
            className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100 shadow-soft flex items-center gap-2.5 sm:gap-3 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer active:scale-98"
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center shrink-0">
              <Ship className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-extrabold text-lime-800 bg-lime-50 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mb-0.5">
                PELABUHAN MUAT
              </span>
              <h4 className="font-bold text-[11px] sm:text-xs text-slate-800 truncate">
                Kuala Enok & Parit 21
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Pompong ke kontainer laut
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Cards (Smooth Curves, Tidak Kotak Kaku) */}
      <div className="bg-white p-3 sm:p-5 rounded-2xl border border-emerald-100 shadow-soft">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
              KATEGORI KOMODITAS INHIL
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-[11px] sm:text-xs font-bold transition-colors ${
              selectedCategory === 'all'
                ? 'text-emerald-700 underline'
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            Semua ({commodities.length})
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-2.5">
          {INITIAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = commodities.filter((c) => c.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                className={`p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border text-center transition-all flex flex-col items-center gap-1 sm:gap-2 active:scale-95 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/80 shadow-xs'
                    : 'border-slate-200/80 bg-slate-50/60 hover:bg-emerald-50/30 hover:border-emerald-300'
                }`}
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center">
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="font-bold text-[10px] sm:text-xs text-slate-800 truncate w-full">
                  {cat.name}
                </span>
                <span className="text-[9px] sm:text-[11px] font-semibold text-emerald-700 bg-white px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100 hidden sm:inline-block">
                  {count} Komoditas
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorting & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Katalog Komoditas Pilihan PasarTembilahan
          </h2>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            {sorted.length} Produk
          </span>
        </div>

        {/* Sort Controls (Smooth Rounded Pills) */}
        <div className="flex items-center gap-2 text-xs w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-500 font-medium whitespace-nowrap">Urutkan:</span>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
              sortBy === 'popular'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Terpopuler
          </button>
          <button
            onClick={() => setSortBy('latest')}
            className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
              sortBy === 'latest'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Terbaru
          </button>
          <button
            onClick={() => setSortBy('top_sales')}
            className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
              sortBy === 'top_sales'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Terlaris
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-700 focus:outline-none focus:border-emerald-600 font-semibold"
          >
            <option value="price_low">Harga: Rendah ke Tinggi</option>
            <option value="price_high">Harga: Tinggi ke Rendah</option>
          </select>
        </div>
      </div>

      {/* Grid of Commodities (Smooth Organic Cards - Tidak Kaku) */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-3xl border border-emerald-100 p-12 text-center space-y-2 shadow-soft">
          <p className="text-sm font-bold text-slate-800">Tidak ada komoditas ditemukan</p>
          <p className="text-xs text-slate-500">
            Coba gunakan kata kunci lain seperti &quot;kelapa&quot;, &quot;vco&quot;, atau &quot;amplang&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {sorted.map((comm) => {
            const isOutOfStock = comm.currentStock === 0;

            return (
              <div
                key={comm.id}
                className="organic-card flex flex-col justify-between overflow-hidden group cursor-pointer rounded-xl sm:rounded-2xl"
              >
                {/* Image Section */}
                <div
                  onClick={() => onSelectProduct(comm)}
                  className="relative aspect-square sm:aspect-4/3 overflow-hidden bg-slate-100"
                >
                  <img
                    src={comm.imageUrl}
                    alt={comm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Badges on Image */}
                  <div className="absolute top-1.5 sm:top-2.5 left-1.5 sm:left-2.5 flex flex-col gap-1">
                    <span className="bg-emerald-700/90 backdrop-blur-xs text-white text-[8px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {comm.grade}
                    </span>
                    {comm.isOrganic && (
                      <span className="bg-lime-500/90 backdrop-blur-xs text-emerald-950 text-[8px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 sm:gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span className="hidden xs:inline">ORGANIK</span>
                      </span>
                    )}
                  </div>

                  {/* Stock Alert */}
                  <div className="absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5">
                    {isOutOfStock ? (
                      <span className="bg-rose-600 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                        Habis
                      </span>
                    ) : comm.currentStock <= comm.minimumStockThreshold ? (
                      <span className="bg-amber-500 text-slate-950 text-[8px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full">
                        Sisa {comm.currentStock}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-1.5 sm:space-y-2">
                  <div className="space-y-1 sm:space-y-1.5">
                    {/* Origin & Merchant */}
                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{comm.district}, Inhil</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProduct(comm)}
                      className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 hover:text-emerald-700 transition-colors"
                      title={comm.name}
                    >
                      {comm.name}
                    </h3>

                    {/* Shipping Badge (Pill) */}
                    <div className="hidden xs:flex flex-wrap gap-1">
                      <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded-full truncate">
                        🚤 Rute Sungai Inhil
                      </span>
                    </div>
                  </div>

                  {/* Price & Rating & Action */}
                  <div className="space-y-1.5 sm:space-y-2 pt-1.5 sm:pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 block font-semibold uppercase">
                        Harga Petani:
                      </span>
                      <div className="flex items-baseline gap-0.5 sm:gap-1">
                        <span className="text-sm sm:text-lg font-black text-emerald-700">
                          Rp {comm.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-medium">/{comm.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500">
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800">{comm.rating.toFixed(1)}</span>
                      </div>
                      <span className="truncate">{comm.soldCount} terjual</span>
                    </div>

                    {/* Dual Action Buttons (Rounded-xl) */}
                    <div className="grid grid-cols-2 gap-1 pt-1">
                      <button
                        onClick={() => onSelectProduct(comm)}
                        className="py-1.5 rounded-lg sm:rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-colors active:scale-95"
                      >
                        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Rincian</span>
                      </button>
                      <button
                        disabled={isOutOfStock}
                        onClick={() => onAddToCart(comm, comm.minimumOrder)}
                        className={`py-1.5 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95 ${
                          isOutOfStock
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>+ Beli</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
