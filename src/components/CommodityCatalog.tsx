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
    <div className="space-y-6">
      {/* Hero Global Marketplace Banner (Organic Rounded-3xl Curves) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Banner (2 Cols) */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 rounded-3xl shadow-soft overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs text-white text-xs font-bold rounded-full">
              <Globe className="w-3.5 h-3.5 text-lime-300" />
              <span>Pasar Komoditas Global & Ekspor Indragiri Hilir</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Komoditas Tembilahan <span className="text-lime-300">Menembus Pasar Dunia</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
              Platform e-commerce & rantai pasok digital: Menghubungkan langsung petani kelapa, sentra kopra putih, produsen VCO, kopi liberika gambut, dan UMKM Tembilahan ke pembeli nasional serta importir mancanegara.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3 relative z-10">
            {onOpenExportHub && (
              <button
                onClick={onOpenExportHub}
                className="px-4 py-2.5 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-xs rounded-full shadow-md transition-all hover:scale-105 flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Pusat Ekspor & Kuotasi Kontainer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onOpenShippingCalculator}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-full transition-all flex items-center gap-2 backdrop-blur-xs"
            >
              <Ship className="w-4 h-4 text-lime-300" />
              <span>Kalkulator Kargo Sungai-Laut</span>
            </button>
            <span className="text-xs text-emerald-100 bg-emerald-900/40 px-3 py-1.5 rounded-full border border-emerald-500/30">
              🌍 8 Negara Tujuan Ekspor
            </span>
          </div>
        </div>

        {/* 2 Side Cards (Smooth Rounded-2xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {/* Card 1: Ekspor Dunia */}
          <div
            onClick={onOpenExportHub}
            className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-soft flex items-center gap-3 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
                KONTRAK EKSPOR
              </span>
              <h4 className="font-bold text-xs text-slate-800">
                Singapura, Malaysia, & MEA
              </h4>
              <p className="text-[11px] text-slate-500">
                Pilihan partai besar / kontainer FCL & LCL
              </p>
            </div>
          </div>

          {/* Card 2: Logistik Perairan Multimodal */}
          <div
            onClick={onOpenShippingCalculator}
            className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-soft flex items-center gap-3 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center shrink-0">
              <Ship className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-lime-800 bg-lime-50 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
                PELABUHAN MUAT
              </span>
              <h4 className="font-bold text-xs text-slate-800">
                Kuala Enok & Parit 21
              </h4>
              <p className="text-[11px] text-slate-500">
                Dari sampan parit ke kapal kontainer laut
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Cards (Smooth Curves, Tidak Kotak Kaku) */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-soft">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
              KATEGORI KOMODITAS INDRAGIRI HILIR
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-bold transition-colors ${
              selectedCategory === 'all'
                ? 'text-emerald-700 underline'
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            Tampilkan Semua ({commodities.length})
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          {INITIAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = commodities.filter((c) => c.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200/80 bg-slate-50/60 hover:bg-emerald-50/30 hover:border-emerald-300'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center">
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="font-bold text-xs text-slate-800 truncate w-full">
                  {cat.name}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-100">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sorted.map((comm) => {
            const isOutOfStock = comm.currentStock === 0;

            return (
              <div
                key={comm.id}
                className="organic-card flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                {/* Image Section */}
                <div
                  onClick={() => onSelectProduct(comm)}
                  className="relative aspect-4/3 overflow-hidden bg-slate-100"
                >
                  <img
                    src={comm.imageUrl}
                    alt={comm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Badges on Image */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {comm.grade}
                    </span>
                    {comm.isOrganic && (
                      <span className="bg-lime-500/90 backdrop-blur-xs text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        ORGANIK
                      </span>
                    )}
                  </div>

                  {/* Stock Alert */}
                  <div className="absolute top-2.5 right-2.5">
                    {isOutOfStock ? (
                      <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Habis
                      </span>
                    ) : comm.currentStock <= comm.minimumStockThreshold ? (
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        Sisa {comm.currentStock}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1.5">
                    {/* Origin & Merchant */}
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
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
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Jalur Air Speedboat & Pompong
                      </span>
                    </div>
                  </div>

                  {/* Price & Rating & Action */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                        Harga Petani:
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-emerald-700">
                          Rp {comm.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/{comm.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800">{comm.rating.toFixed(1)}</span>
                      </div>
                      <span>Terjual {comm.soldCount.toLocaleString('id-ID')}</span>
                    </div>

                    {/* Dual Action Buttons (Rounded-xl) */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        onClick={() => onSelectProduct(comm)}
                        className="py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Rincian</span>
                      </button>
                      <button
                        disabled={isOutOfStock}
                        onClick={() => onAddToCart(comm, comm.minimumOrder)}
                        className={`py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs ${
                          isOutOfStock
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Keranjang</span>
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
