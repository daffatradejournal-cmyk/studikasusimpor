'use client';

import React, { useState } from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  Star,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Truck,
  Ship,
  Scale,
  Building2,
  Award,
} from 'lucide-react';
import { Commodity } from '../lib/types';
import { INITIAL_MERCHANTS } from '../lib/mockData';

interface ProductDetailModalProps {
  product: Commodity | null;
  onClose: () => void;
  onAddToCart: (commodity: Commodity, quantity: number) => void;
  onBuyNow: (commodity: Commodity, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(product.minimumOrder);
  const merchant = INITIAL_MERCHANTS.find((m) => m.id === product.merchantId);

  const subtotal = product.price * quantity;
  const isOutOfStock = product.currentStock === 0;

  const handleDecrement = () => {
    if (quantity > product.minimumOrder) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.currentStock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#000000]/60 backdrop-blur-2xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-xs shadow-shopee-hover border border-[#CCCCCC] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button Shopee Style */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-xs bg-[#F5F5F5] hover:bg-[#CCCCCC] text-[#222222] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative bg-[#FAFAFA] flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-[#CCCCCC]/60">
            <div className="w-full aspect-square relative rounded-xs overflow-hidden border border-[#CCCCCC]/50 bg-white">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <span className="bg-[#D0011B] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                  MALL • {product.grade}
                </span>
                {product.isOrganic && (
                  <span className="bg-[#00BFA5] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                    100% ALAMI & ORGANIK
                  </span>
                )}
              </div>
            </div>

            {/* Inhil Origin Badge */}
            <div className="w-full mt-3 p-2.5 bg-[#FFFFFF] rounded-xs border border-[#CCCCCC]/60 text-xs text-[#555555] space-y-1">
              <div className="flex items-center gap-1.5 text-[#EE4D2D] font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#EE4D2D]" />
                <span>Sentra: {product.harvestLocation}</span>
              </div>
              <p className="text-[11px] text-[#5A5A5A]">
                Kab. Indragiri Hilir, Riau (Perkebunan Pesisir & Parit Pasang Surut)
              </p>
            </div>
          </div>

          {/* Right Column: Shopee Product Buy Box */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Shopee Tag & Title */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="bg-[#D0011B] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-xs uppercase">
                    Star+
                  </span>
                  <span className="text-[11px] text-[#5A5A5A] uppercase font-semibold">
                    SKU: {product.sku}
                  </span>
                </div>
                <h2 className="font-titillium text-base sm:text-lg font-bold text-[#222222] leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-[#555555] italic mt-0.5">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              </div>

              {/* Shopee Rating & Reviews Row */}
              <div className="flex items-center gap-3 text-xs pb-2 border-b border-[#F5F5F5]">
                <div className="flex items-center gap-1 text-[#EE4D2D]">
                  <span className="font-bold underline">{product.rating.toFixed(1)}</span>
                  <div className="flex items-center text-[#FFCE3D]">
                    <Star className="w-3 h-3 fill-[#FFCE3D]" />
                    <Star className="w-3 h-3 fill-[#FFCE3D]" />
                    <Star className="w-3 h-3 fill-[#FFCE3D]" />
                    <Star className="w-3 h-3 fill-[#FFCE3D]" />
                    <Star className="w-3 h-3 fill-[#FFCE3D]" />
                  </div>
                </div>
                <span className="text-[#CCCCCC]">|</span>
                <span className="text-[#555555]">
                  <strong className="text-[#222222]">{product.soldCount}</strong> Terjual
                </span>
                <span className="text-[#CCCCCC]">|</span>
                <span className="text-[#00BFA5] font-semibold">Stok: {product.currentStock} {product.unit}</span>
              </div>

              {/* Shopee Price Box (Light Grayish Box) */}
              <div className="p-3 bg-[#FAFAFA] rounded-xs border border-[#CCCCCC]/40 flex items-baseline gap-2">
                <span className="text-xs text-[#555555] font-normal">Harga:</span>
                <span className="text-xs font-bold text-[#EE4D2D]">Rp</span>
                <span className="text-2xl font-bold text-[#EE4D2D] leading-none">
                  {product.price.toLocaleString('id-ID')}
                </span>
                <span className="text-xs text-[#5A5A5A]">/{product.unit}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#555555] leading-relaxed max-h-24 overflow-y-auto pr-1">
                {product.description}
              </p>

              {/* Merchant / Producer Info */}
              {merchant && (
                <div className="p-2.5 rounded-xs bg-[#FBFBFB] border border-[#CCCCCC]/50 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#222222] flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#EE4D2D]" />
                      {merchant.businessName}
                    </span>
                    <span className="text-[10px] text-[#00BFA5] font-semibold">✓ Terverifikasi UNISI</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A5A]">
                    Dermaga/Parit: <strong>{merchant.riverDock}</strong>
                  </p>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {merchant.certifications.map((c, i) => (
                      <span key={i} className="text-[9px] bg-[#FACAC0]/40 text-[#D0011B] px-1.5 py-0.2 rounded-xs border border-[#FACAC0]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Shipping & Specs Tag */}
              <div className="flex items-center gap-4 text-xs text-[#555555]">
                <div className="flex items-center gap-1.5">
                  <Ship className="w-4 h-4 text-[#066BC8]" />
                  <span>Jalur Air: Pompong & Speedboat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-[#5A5A5A]" />
                  <span>{product.weightGrams} gram / {product.unit}</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-[#F5F5F5]">
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#555555]">Kuantitas:</span>
                <div className="flex items-center border border-[#CCCCCC] rounded-xs bg-white">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= product.minimumOrder}
                    className="px-2.5 py-1 text-xs font-bold text-[#555555] hover:bg-[#F5F5F5] disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-[#222222] min-w-[40px] text-center border-x border-[#CCCCCC]">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.currentStock}
                    className="px-2.5 py-1 text-xs font-bold text-[#555555] hover:bg-[#F5F5F5] disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-[#5A5A5A]">
                  Min. order: {product.minimumOrder} {product.unit}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-[#555555]">Subtotal Pembelian:</span>
                <span className="text-base font-bold text-[#EE4D2D]">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Shopee Dual Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  disabled={isOutOfStock}
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="py-2.5 rounded-xs bg-[#FACAC0]/60 hover:bg-[#FACAC0] text-[#EE4D2D] border border-[#EE4D2D] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Masukkan Keranjang</span>
                </button>
                <button
                  disabled={isOutOfStock}
                  onClick={() => {
                    onBuyNow(product, quantity);
                    onClose();
                  }}
                  className="py-2.5 rounded-xs bg-[#EE4D2D] hover:bg-[#F05D40] active:bg-[#E2492B] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs disabled:opacity-40"
                >
                  <span>Beli Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
