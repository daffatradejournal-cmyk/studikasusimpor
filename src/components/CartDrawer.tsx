'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Ship,
  MapPin,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { CartItem, ShippingRoute, Order } from '../lib/types';
import { INITIAL_SHIPPING_ROUTES } from '../lib/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (commodityId: string, delta: number) => void;
  onRemoveItem: (commodityId: string) => void;
  onClearCart: () => void;
  onCreateOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCreateOrder,
}) => {
  if (!isOpen) return null;

  const [buyerName, setBuyerName] = useState('Budi Setiawan');
  const [buyerPhone, setBuyerPhone] = useState('0812-7788-9922');
  const [buyerEmail, setBuyerEmail] = useState('budi.setiawan@gmail.com');
  const [destinationDistrict, setDestinationDistrict] = useState('Tembilahan Kota');
  const [shippingAddress, setShippingAddress] = useState('Jl. M. Boya No. 28, Tembilahan Hilir, Indragiri Hilir');
  const [selectedRouteId, setSelectedRouteId] = useState(INITIAL_SHIPPING_ROUTES[0].id);

  const subtotal = cart.reduce((sum, item) => sum + item.commodity.price * item.quantity, 0);
  const totalWeightGrams = cart.reduce(
    (sum, item) => sum + item.commodity.weightGrams * item.quantity,
    0
  );
  const totalWeightKg = Math.max(1, Math.ceil(totalWeightGrams / 1000));

  const selectedRoute =
    INITIAL_SHIPPING_ROUTES.find((r) => r.id === selectedRouteId) || INITIAL_SHIPPING_ROUTES[0];

  const shippingCost = selectedRoute.baseCost + (totalWeightKg - 1) * selectedRoute.costPerKg;
  const grandTotal = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    onCreateOrder({
      buyerName,
      buyerPhone,
      buyerEmail,
      shippingAddress,
      destinationDistrict,
      selectedCourier: `${selectedRoute.courierName} (${selectedRoute.serviceType})`,
      transportMode: selectedRoute.transportMode,
      items: cart.map((item) => ({
        commodityId: item.commodity.id,
        commodityName: item.commodity.name,
        unitPrice: item.commodity.price,
        quantity: item.quantity,
        subtotal: item.commodity.price * item.quantity,
        unit: item.commodity.unit,
      })),
      totalAmount: subtotal,
      shippingCost,
      grandTotal,
      paymentMethod: 'Midtrans Payment Gateway (QRIS / Virtual Account)',
      paymentStatus: 'unpaid',
      fulfillmentStatus: 'pending',
      trackingNumber: `TRK-${Date.now().toString().slice(-6)}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
        {/* Drawer Header (Fresh Leaf Gradient) */}
        <div className="p-4 sm:p-5 leaf-header-bg text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Keranjang Belanja Komoditas</h2>
              <p className="text-xs text-emerald-100">{cart.length} komoditas terpilih</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 bg-slate-50/70">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-white p-8 rounded-3xl border border-slate-200">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">Keranjang Belanja Masih Kosong</h3>
              <p className="text-xs text-slate-500">
                Jelajahi komoditas kelapa, perkebunan gambut, atau kuliner khas Inhil dan tambahkan ke keranjang.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-sm"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b border-slate-100">
                  <span className="text-slate-800">Daftar Komoditas</span>
                  <button
                    onClick={onClearCart}
                    className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Kosongkan
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.commodity.id}
                      className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center gap-3"
                    >
                      <img
                        src={item.commodity.imageUrl}
                        alt={item.commodity.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {item.commodity.name}
                        </h4>
                        <div className="text-xs font-extrabold text-emerald-700">
                          Rp {item.commodity.price.toLocaleString('id-ID')}
                          <span className="text-[10px] text-slate-500 font-normal ml-0.5">
                            /{item.commodity.unit}
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.commodity.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.commodity.id, -1)}
                            className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-800 border-x border-slate-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.commodity.id, 1)}
                            className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Form */}
              <form
                id="checkout-form"
                onSubmit={handleSubmitOrder}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    Informasi Pengiriman & Rute Logistik Inhil
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Bobot: <strong className="text-slate-800">{totalWeightKg} Kg</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1 font-semibold">
                      Nama Pembeli
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1 font-semibold">
                      No. WhatsApp / HP
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1 font-semibold">
                      Wilayah / Kecamatan Tujuan
                    </label>
                    <select
                      value={destinationDistrict}
                      onChange={(e) => setDestinationDistrict(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none bg-white font-medium"
                    >
                      <option value="Tembilahan Kota">Tembilahan Kota (Darat)</option>
                      <option value="Tembilahan Hilir (Parit 13)">Tembilahan Hilir (Dermaga Parit 13)</option>
                      <option value="Enok / Bagan Jaya">Kec. Enok (Pompong/Darat)</option>
                      <option value="Mandah (Perairan)">Kec. Mandah (Speedboat Air)</option>
                      <option value="Kuindra / Sapat">Kec. Kuindra (Speedboat Air)</option>
                      <option value="Tempuling / Sei Salak">Kec. Tempuling (Darat)</option>
                      <option value="Pekanbaru Kota">Pekanbaru Kota</option>
                      <option value="Batam / Kepri">Batam (Kuala Enok Kargo)</option>
                      <option value="DKI Jakarta">DKI Jakarta & Nasional</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1 font-semibold">
                      Email Pembeli
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 block mb-1 font-semibold">
                    Alamat Lengkap / Dermaga Penurunan
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-600 outline-none"
                  />
                </div>

                {/* Pilih Kurir */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] text-slate-800 font-bold block">
                    Pilih Ekspedisi / Kurir Pengantar:
                  </label>
                  <div className="space-y-1.5">
                    {INITIAL_SHIPPING_ROUTES.map((route) => {
                      const isSelected = selectedRouteId === route.id;
                      const calculatedCost = route.baseCost + (totalWeightKg - 1) * route.costPerKg;
                      const isWater = route.transportMode === 'river_water';

                      return (
                        <div
                          key={route.id}
                          onClick={() => setSelectedRouteId(route.id)}
                          className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="shippingRoute"
                              checked={isSelected}
                              onChange={() => setSelectedRouteId(route.id)}
                              className="accent-emerald-600"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-800">
                                  {route.courierName}
                                </span>
                                <span
                                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                    isWater
                                      ? 'bg-sky-100 text-sky-800'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  {isWater ? 'Jalur Air Inhil' : 'Darat'}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500">{route.estimatedDays}</p>
                            </div>
                          </div>
                          <span className="font-extrabold text-emerald-700">
                            Rp {calculatedCost.toLocaleString('id-ID')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Drawer Bottom Bar */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 shadow-lg space-y-2.5">
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal Komoditas:</span>
                <span className="font-semibold text-slate-800">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim ({selectedRoute.courierName}):</span>
                <span className="font-semibold text-slate-800">
                  Rp {shippingCost.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-1 border-t border-slate-100 font-bold">
                <span className="text-slate-900">Total Pembayaran:</span>
                <span className="text-emerald-700 text-lg font-black">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <CreditCard className="w-4 h-4" />
              <span>Checkout via Midtrans Snap</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dilindungi Sistem Pembayaran Otomatis & Terverifikasi</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
