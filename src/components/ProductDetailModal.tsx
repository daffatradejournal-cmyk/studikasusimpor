'use client';

import React, { useState } from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  Star,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Truck,
  Ship,
  Scale,
  Building2,
  Leaf,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image with Organic Rounded Styling */}
          <div className="relative bg-emerald-50/40 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-emerald-100/60">
            <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-md shadow-emerald-900/10 bg-white">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="bg-emerald-700 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  {product.grade}
                </span>
                {product.isOrganic && (
                  <span className="bg-lime-400 text-emerald-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" />
                    100% Organik
                  </span>
                )}
              </div>
            </div>

            {/* Inhil Origin Badge */}
            <div className="w-full mt-4 p-3 bg-white rounded-2xl border border-emerald-100 text-xs text-slate-600 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sentra Kebun: {product.harvestLocation}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Kab. Indragiri Hilir, Riau (Kawasan Pesisir Gambut & Pasang Surut)
              </p>
            </div>
          </div>

          {/* Right Column: Specifications & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Komoditas Pilihan Inhil
                  </span>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">
                    SKU: {product.sku}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-500 italic mt-0.5">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              </div>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 text-xs pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-extrabold text-slate-800">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">
                  <strong className="text-slate-900">{product.soldCount}</strong> Terjual
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-bold">
                  Stok: {product.currentStock} {product.unit}
                </span>
              </div>

              {/* Price Container (Soft Green Box) */}
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Harga Petani:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-emerald-700">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-slate-500">/{product.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold">Min. Pembelian:</span>
                  <span className="text-xs font-bold text-slate-800">
                    {product.minimumOrder} {product.unit}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed max-h-24 overflow-y-auto pr-1">
                {product.description}
              </p>

              {/* Merchant / Producer Info */}
              {merchant && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                      {merchant.businessName}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      ✓ Binaan UNISI
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Dermaga/Parit: <strong>{merchant.riverDock}</strong>
                  </p>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {merchant.certifications.map((c, i) => (
                      <span key={i} className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Jumlah Pesanan:</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= product.minimumOrder}
                    className="px-3 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-slate-900 bg-white min-w-[45px] text-center border-x border-slate-200">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.currentStock}
                    className="px-3 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-500">Subtotal Komoditas:</span>
                <span className="text-lg font-black text-emerald-700">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Dual Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  disabled={isOutOfStock}
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>+ Keranjang</span>
                </button>
                <button
                  disabled={isOutOfStock}
                  onClick={() => {
                    onBuyNow(product, quantity);
                    onClose();
                  }}
                  className="py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
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
