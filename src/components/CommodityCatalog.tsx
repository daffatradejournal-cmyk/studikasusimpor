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
}

export const CommodityCatalog: React.FC<CommodityCatalogProps> = ({
  commodities,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onSelectProduct,
  onOpenShippingCalculator,
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
        return <Palmtree className="w-5 h-5 text-[#EE4D2D]" />;
      case 'perkebunan':
        return <Sprout className="w-5 h-5 text-[#00BFA5]" />;
      case 'kuliner':
        return <UtensilsCrossed className="w-5 h-5 text-[#FFCE3D]" />;
      case 'kerajinan':
        return <Sparkles className="w-5 h-5 text-[#066BC8]" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Shopee Promotional Banner Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Main Banner (2 Cols) */}
        <div className="lg:col-span-2 relative bg-gradient-to-r from-[#D0011B] via-[#EE4D2D] to-[#F05D40] text-white p-5 sm:p-7 rounded-xs shadow-sm overflow-hidden flex flex-col justify-between min-h-[190px]">
          <div className="space-y-2 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white text-[#EE4D2D] text-[10px] font-bold rounded-xs uppercase tracking-wider">
              <Award className="w-3 h-3 text-[#EE4D2D]" />
              <span>Program Resmi Hilirisasi Komoditas UNISI</span>
            </div>
            <h1 className="font-titillium text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
              Pekan Komoditas Unggulan Indragiri Hilir
            </h1>
            <p className="text-xs text-white/90 leading-relaxed">
              Hub langsung petani kelapa, olahan turunan, perkebunan gambut, dan kuliner khas Inhil. Memotong rantai tengkulak dengan estimasi logistik perairan sungai.
            </p>
          </div>

          <div className="pt-3 flex items-center gap-2 relative z-10">
            <button
              onClick={onOpenShippingCalculator}
              className="px-3.5 py-1.5 bg-[#FFCE3D] hover:bg-[#ffc620] text-[#222222] font-bold text-xs rounded-xs shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Ship className="w-3.5 h-3.5" />
              <span>Simulasi Ongkir Jalur Sungai & Darat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2 Small Side Promo Cards (Shopee Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
          {/* Card 1: Free Shipping */}
          <div className="bg-[#FFFFFF] p-3.5 rounded-xs border border-[#CCCCCC]/60 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xs bg-[#00BFA5]/10 text-[#00BFA5] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#00BFA5] uppercase tracking-wider block">
                GRATIS ONGKIR XTRA
              </span>
              <h4 className="font-bold text-xs text-[#222222]">
                Subsidi Pengiriman Jalur Air
              </h4>
              <p className="text-[11px] text-[#555555]">
                Armada Pompong Parit 21 & Speedboat Inhil
              </p>
            </div>
          </div>

          {/* Card 2: Direct Producer */}
          <div className="bg-[#FFFFFF] p-3.5 rounded-xs border border-[#CCCCCC]/60 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xs bg-[#EE4D2D]/10 text-[#EE4D2D] flex items-center justify-center shrink-0">
              <BadgePercent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#EE4D2D] uppercase tracking-wider block">
                HARGA PETANI ASLI
              </span>
              <h4 className="font-bold text-xs text-[#222222]">
                Tanpa Rantai Perantara
              </h4>
              <p className="text-[11px] text-[#555555]">
                Terkoneksi 38 Koperasi Sentra Kebun
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shopee Category Cards Bar */}
      <div className="bg-[#FFFFFF] p-4 rounded-xs border border-[#CCCCCC]/60 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#F5F5F5]">
          <h3 className="font-titillium text-sm font-bold text-[#555555] uppercase tracking-wider">
            KATEGORI KOMODITAS INDRAGIRI HILIR
          </h3>
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-semibold hover:text-[#EE4D2D] ${
              selectedCategory === 'all' ? 'text-[#EE4D2D]' : 'text-[#555555]'
            }`}
          >
            Lihat Semua ({commodities.length})
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
          {INITIAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = commodities.filter((c) => c.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                className={`p-3 rounded-xs border text-center transition-all flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'border-[#EE4D2D] bg-[#FACAC0]/20 shadow-xs'
                    : 'border-[#CCCCCC]/40 bg-[#FAFAFA] hover:border-[#EE4D2D]/50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-2xs flex items-center justify-center">
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="font-bold text-xs text-[#222222] truncate w-full">
                  {cat.name}
                </span>
                <span className="text-[11px] text-[#5A5A5A]">
                  {count} Komoditas
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Shopee Flash Sale / Rekomendasi Section Header */}
      <div className="bg-[#FFFFFF] p-3 rounded-xs border border-[#CCCCCC]/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#EE4D2D] fill-[#EE4D2D]" />
          <h2 className="font-titillium text-base font-bold text-[#EE4D2D] uppercase tracking-tight">
            KOMODITAS PILIHAN PASARTEMBILAHAN
          </h2>
          <span className="bg-[#EE4D2D] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-xs">
            LIVE
          </span>
        </div>

        {/* Shopee Style Sort Controls */}
        <div className="flex items-center gap-1.5 text-xs w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[#555555] font-medium mr-1 whitespace-nowrap">Urutkan:</span>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1.5 rounded-xs font-medium whitespace-nowrap transition-colors ${
              sortBy === 'popular'
                ? 'bg-[#EE4D2D] text-white font-bold'
                : 'bg-[#FFFFFF] text-[#555555] border border-[#CCCCCC] hover:border-[#EE4D2D]'
            }`}
          >
            Populer
          </button>
          <button
            onClick={() => setSortBy('latest')}
            className={`px-3 py-1.5 rounded-xs font-medium whitespace-nowrap transition-colors ${
              sortBy === 'latest'
                ? 'bg-[#EE4D2D] text-white font-bold'
                : 'bg-[#FFFFFF] text-[#555555] border border-[#CCCCCC] hover:border-[#EE4D2D]'
            }`}
          >
            Terbaru
          </button>
          <button
            onClick={() => setSortBy('top_sales')}
            className={`px-3 py-1.5 rounded-xs font-medium whitespace-nowrap transition-colors ${
              sortBy === 'top_sales'
                ? 'bg-[#EE4D2D] text-white font-bold'
                : 'bg-[#FFFFFF] text-[#555555] border border-[#CCCCCC] hover:border-[#EE4D2D]'
            }`}
          >
            Terlaris
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 bg-[#FFFFFF] border border-[#CCCCCC] rounded-xs text-xs text-[#555555] focus:outline-none focus:border-[#EE4D2D] font-medium"
          >
            <option value="price_low">Harga: Rendah ke Tinggi</option>
            <option value="price_high">Harga: Tinggi ke Rendah</option>
          </select>
        </div>
      </div>

      {/* Shopee Product Cards Grid */}
      {sorted.length === 0 ? (
        <div className="bg-[#FFFFFF] rounded-xs border border-[#CCCCCC]/60 p-12 text-center space-y-2">
          <p className="text-sm font-bold text-[#222222]">Tidak ada komoditas ditemukan</p>
          <p className="text-xs text-[#5A5A5A]">
            Coba gunakan kata kunci lain seperti &quot;kelapa&quot;, &quot;vco&quot;, atau &quot;amplang&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5">
          {sorted.map((comm) => {
            const isOutOfStock = comm.currentStock === 0;

            return (
              <div
                key={comm.id}
                className="shopee-card flex flex-col justify-between relative group cursor-pointer overflow-hidden"
              >
                {/* Image Section */}
                <div
                  onClick={() => onSelectProduct(comm)}
                  className="relative aspect-square overflow-hidden bg-[#FAFAFA]"
                >
                  <img
                    src={comm.imageUrl}
                    alt={comm.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                    loading="lazy"
                  />

                  {/* Shopee Signature MALL / OFFICIAL Badge */}
                  <div className="absolute top-1 left-0 flex flex-col gap-0.5">
                    <span className="bg-[#D0011B] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-r-xs uppercase tracking-tight">
                      MALL
                    </span>
                    {comm.isOrganic && (
                      <span className="bg-[#00BFA5] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-r-xs uppercase tracking-tight">
                        ORGANIK
                      </span>
                    )}
                  </div>

                  {/* Stock Alert or Grade Tag Top Right */}
                  <div className="absolute top-1 right-1">
                    {isOutOfStock ? (
                      <span className="bg-[#222222]/80 text-white text-[9px] font-bold px-1 py-0.2 rounded-xs">
                        Habis
                      </span>
                    ) : (
                      <span className="bg-[#FFCE3D] text-[#222222] text-[9px] font-extrabold px-1 py-0.2 rounded-xs">
                        {comm.grade === 'Grade Ekspor' ? 'EKSPOR' : comm.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
                  <div className="space-y-1">
                    {/* Title 2-lines */}
                    <h3
                      onClick={() => onSelectProduct(comm)}
                      className="font-normal text-xs text-[#222222] leading-tight line-clamp-2 group-hover:text-[#EE4D2D] transition-colors"
                      title={comm.name}
                    >
                      {comm.name}
                    </h3>

                    {/* Voucher / Free Shipping Tag (Shopee Signature) */}
                    <div className="flex flex-wrap gap-1">
                      <span className="border border-[#00BFA5] text-[#00BFA5] text-[9px] font-semibold px-1 py-0.2 rounded-xs leading-none">
                        Gratis Ongkir Jalur Air
                      </span>
                    </div>
                  </div>

                  {/* Price & Rating & Location */}
                  <div className="space-y-1 pt-1">
                    {/* Price */}
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[11px] font-bold text-[#EE4D2D]">Rp</span>
                      <span className="text-sm sm:text-base font-bold text-[#EE4D2D] leading-none">
                        {comm.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-[#5A5A5A] ml-0.5 font-normal">
                        /{comm.unit}
                      </span>
                    </div>

                    {/* Rating & Sold Volume */}
                    <div className="flex items-center justify-between text-[10px] text-[#5A5A5A]">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-[#FFCE3D] text-[#FFCE3D]" />
                        <span className="font-semibold text-[#222222]">{comm.rating.toFixed(1)}</span>
                      </div>
                      <span>Terjual {(comm.soldCount > 1000 ? `${(comm.soldCount / 1000).toFixed(1)}RB` : comm.soldCount)}</span>
                    </div>

                    {/* Location */}
                    <div className="text-[10px] text-[#5A5A5A] text-right truncate pt-0.5 border-t border-[#F5F5F5]">
                      {comm.district}
                    </div>

                    {/* Quick Add Button on bottom */}
                    <button
                      disabled={isOutOfStock}
                      onClick={() => onAddToCart(comm, comm.minimumOrder)}
                      className={`w-full py-1 text-center text-xs font-semibold rounded-xs mt-1 transition-colors flex items-center justify-center gap-1 ${
                        isOutOfStock
                          ? 'bg-[#CCCCCC] text-[#555555] cursor-not-allowed'
                          : 'bg-[#FACAC0] hover:bg-[#EE4D2D] text-[#D0011B] hover:text-white border border-[#EE4D2D]/30'
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      <span>Keranjang</span>
                    </button>
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
