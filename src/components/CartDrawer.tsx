'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#000000]/60 backdrop-blur-2xs flex justify-end">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Drawer Header (Shopee Orange Header) */}
        <div className="p-4 bg-[#EE4D2D] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-titillium text-base font-bold">
              Keranjang Belanja ({cart.length} Komoditas)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xs bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#F5F5F5]">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-[#FFFFFF] p-8 rounded-xs border border-[#CCCCCC]/60">
              <ShoppingCart className="w-12 h-12 text-[#CCCCCC] mx-auto" />
              <h3 className="text-sm font-bold text-[#222222]">Keranjang Belanja Anda Kosong</h3>
              <p className="text-xs text-[#555555]">
                Pilih komoditas kelapa, perkebunan gambut, atau kuliner khas Inhil dari katalog.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#EE4D2D] hover:bg-[#F05D40] text-white text-xs font-bold rounded-xs shadow-xs"
              >
                Belanja Sekarang
              </button>
            </div>
          ) : (
            <>
              {/* Items Card List */}
              <div className="bg-[#FFFFFF] p-3 rounded-xs border border-[#CCCCCC]/60 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b border-[#F5F5F5]">
                  <span className="text-[#222222]">Produk Dipesan</span>
                  <button
                    onClick={onClearCart}
                    className="text-[#D0011B] hover:underline text-xs flex items-center gap-1 font-normal"
                  >
                    <Trash2 className="w-3 h-3" />
                    Hapus Semua
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.commodity.id}
                      className="p-2.5 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC]/50 flex items-center gap-3"
                    >
                      <img
                        src={item.commodity.imageUrl}
                        alt={item.commodity.name}
                        className="w-12 h-12 object-cover rounded-xs border border-[#CCCCCC]/50 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#222222] truncate">
                          {item.commodity.name}
                        </h4>
                        <div className="text-xs font-bold text-[#EE4D2D]">
                          Rp {item.commodity.price.toLocaleString('id-ID')}
                          <span className="text-[10px] text-[#5A5A5A] font-normal ml-0.5">
                            /{item.commodity.unit}
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.commodity.id)}
                          className="text-[#5A5A5A] hover:text-[#D0011B]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center border border-[#CCCCCC] rounded-xs bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.commodity.id, -1)}
                            className="px-2 py-0.5 text-xs text-[#555555] hover:bg-[#F5F5F5]"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#222222] border-x border-[#CCCCCC]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.commodity.id, 1)}
                            className="px-2 py-0.5 text-xs text-[#555555] hover:bg-[#F5F5F5]"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Delivery Form (Shopee Style) */}
              <form
                id="checkout-form"
                onSubmit={handleSubmitOrder}
                className="bg-[#FFFFFF] p-3.5 rounded-xs border border-[#CCCCCC]/60 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#F5F5F5]">
                  <h3 className="font-titillium text-xs font-bold text-[#222222] uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#EE4D2D]" />
                    Alamat & Opsi Pengiriman
                  </h3>
                  <span className="text-[11px] text-[#555555]">
                    Total: <strong>{totalWeightKg} Kg</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-[#555555] block mb-0.5 font-medium">
                      Nama Penerima
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#CCCCCC] focus:border-[#EE4D2D] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#555555] block mb-0.5 font-medium">
                      No. Handphone / WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#CCCCCC] focus:border-[#EE4D2D] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-[#555555] block mb-0.5 font-medium">
                      Area / Kecamatan Inhil
                    </label>
                    <select
                      value={destinationDistrict}
                      onChange={(e) => setDestinationDistrict(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#CCCCCC] focus:border-[#EE4D2D] outline-none bg-white"
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
                    <label className="text-[11px] text-[#555555] block mb-0.5 font-medium">
                      Email Pembeli
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#CCCCCC] focus:border-[#EE4D2D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#555555] block mb-0.5 font-medium">
                    Alamat Lengkap / Dermaga Penurunan
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-xs border border-[#CCCCCC] focus:border-[#EE4D2D] outline-none"
                  />
                </div>

                {/* Pilih Kurir Shopee Style */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] text-[#222222] font-semibold block">
                    Pilih Ekspedisi / Kurir Pengantar:
                  </label>
                  <div className="space-y-1">
                    {INITIAL_SHIPPING_ROUTES.map((route) => {
                      const isSelected = selectedRouteId === route.id;
                      const calculatedCost = route.baseCost + (totalWeightKg - 1) * route.costPerKg;
                      const isWater = route.transportMode === 'river_water';

                      return (
                        <div
                          key={route.id}
                          onClick={() => setSelectedRouteId(route.id)}
                          className={`p-2 rounded-xs border cursor-pointer transition-all flex items-center justify-between text-xs ${
                            isSelected
                              ? 'border-[#EE4D2D] bg-[#FACAC0]/20'
                              : 'border-[#CCCCCC]/50 bg-white hover:border-[#CCCCCC]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="shippingRoute"
                              checked={isSelected}
                              onChange={() => setSelectedRouteId(route.id)}
                              className="accent-[#EE4D2D]"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-[#222222]">
                                  {route.courierName}
                                </span>
                                <span
                                  className={`text-[9px] px-1 py-0.2 rounded-xs font-bold ${
                                    isWater
                                      ? 'bg-[#00BFA5]/10 text-[#00BFA5] border border-[#00BFA5]/40'
                                      : 'bg-[#EE4D2D]/10 text-[#EE4D2D] border border-[#EE4D2D]/30'
                                  }`}
                                >
                                  {isWater ? 'Jalur Air' : 'Darat'}
                                </span>
                              </div>
                              <p className="text-[10px] text-[#5A5A5A]">{route.estimatedDays}</p>
                            </div>
                          </div>
                          <span className="font-bold text-[#EE4D2D]">
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

        {/* Drawer Bottom Bar (Shopee Checkout Footer) */}
        {cart.length > 0 && (
          <div className="p-3.5 bg-[#FFFFFF] border-t border-[#CCCCCC] shadow-lg space-y-2">
            <div className="space-y-1 text-xs text-[#555555]">
              <div className="flex justify-between">
                <span>Subtotal Komoditas:</span>
                <span className="font-medium text-[#222222]">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim ({selectedRoute.courierName}):</span>
                <span className="font-medium text-[#222222]">
                  Rp {shippingCost.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-1 border-t border-[#F5F5F5] font-bold">
                <span className="text-[#222222]">Total Pembayaran:</span>
                <span className="text-[#EE4D2D] text-lg font-bold">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full py-2.5 rounded-xs bg-[#EE4D2D] hover:bg-[#F05D40] active:bg-[#E2492B] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
            >
              <CreditCard className="w-4 h-4" />
              <span>Checkout via Midtrans</span>
            </button>

            <p className="text-[10px] text-center text-[#5A5A5A]">
              Dilindungi Garansi PasarTembilahan & Verifikasi Otomatis
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
