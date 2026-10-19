'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Ship,
  Truck,
  ArrowUpRight,
  DollarSign,
  Building,
} from 'lucide-react';
import { Order, Commodity, UmkmAnalytics } from '../lib/types';

interface UmkmDashboardProps {
  orders: Order[];
  commodities: Commodity[];
  analytics: UmkmAnalytics;
  onRestock: (commodityId: string, amount: number) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['fulfillmentStatus']) => void;
}

export const UmkmDashboard: React.FC<UmkmDashboardProps> = ({
  orders,
  commodities,
  analytics,
  onRestock,
  onUpdateOrderStatus,
}) => {
  const [orderFilter, setOrderFilter] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');

  const lowStockItems = commodities.filter((c) => c.currentStock <= c.minimumStockThreshold);

  const filteredOrders = orders.filter((ord) => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'processing') return ord.fulfillmentStatus === 'processing' || ord.fulfillmentStatus === 'pending';
    if (orderFilter === 'shipped') return ord.fulfillmentStatus === 'shipped_river' || ord.fulfillmentStatus === 'shipped_land';
    if (orderFilter === 'delivered') return ord.fulfillmentStatus === 'delivered';
    return true;
  });

  const getFulfillmentBadge = (status: Order['fulfillmentStatus'], mode: Order['transportMode']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Pesanan Selesai
          </span>
        );
      case 'shipped_river':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
            <Ship className="w-3.5 h-3.5 text-sky-600" />
            Berlayar Jalur Air
          </span>
        );
      case 'shipped_land':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            Kargo Darat Lintas
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Package className="w-3.5 h-3.5 text-amber-600" />
            Dikemas Mitra Tani
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
            Menunggu Verifikasi
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Top Header */}
      <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Seller Centre & Monitoring Mitra Tani
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Dashboard Analitik & Koperasi Komoditas Inhil
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoring omzet penjualan, perputaran stok gudang, dan pelacakan ekspedisi komoditas daerah.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800">
          <Building className="w-4 h-4 text-emerald-600" />
          <span>Hub Mitra: Koperasi & UMKM Indragiri Hilir</span>
        </div>
      </div>

      {/* 4 Bento KPI Cards (Smooth Rounded-2xl / Rounded-3xl) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 font-semibold">
            <span>Omzet Penjualan</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-black text-emerald-700">
              Rp {(analytics.totalRevenue / 1000000).toFixed(1)} Jt
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-600 mt-0.5 sm:mt-1">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>+{analytics.revenueGrowthMonth}% bln lalu</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 font-semibold">
            <span>Komoditas Terjual</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-black text-slate-900">
              {(analytics.commoditiesSoldKg / 1000).toFixed(1)} Ton
            </div>
            <div className="text-[10px] sm:text-[11px] text-teal-700 font-semibold mt-0.5 sm:mt-1 truncate">
              Kelapa, kopra & olahan
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 font-semibold">
            <span>Transaksi Selesai</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-black text-slate-900">
              {analytics.totalOrders.toLocaleString('id-ID')}
            </div>
            <div className="text-[10px] sm:text-[11px] text-amber-700 font-semibold mt-0.5 sm:mt-1 truncate">
              Tervalidasi Midtrans
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 font-semibold">
            <span>Mitra Koperasi</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-black text-slate-900">
              {analytics.activePartners} Sentra
            </div>
            <div className="text-[10px] sm:text-[11px] text-lime-800 font-semibold mt-0.5 sm:mt-1 truncate">
              Koperasi Petani Parit
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Monthly Dynamics & Top Commodities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Monthly Revenue Bar Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Tren Pertumbuhan Omzet Komoditas (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Pencatatan volume transaksi digital UMKM Indragiri Hilir (Juta Rupiah)
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Total: Rp 178.8 Juta
            </span>
          </div>

          <div className="pt-4 pb-2">
            <div className="h-44 flex items-end justify-between gap-3 px-2 border-b border-slate-100">
              {analytics.monthlyRevenue.map((item, idx) => {
                const maxVal = 50;
                const heightPercent = Math.min(100, Math.round((item.revenueJuta / maxVal) * 100));
                const isCurrentMonth = idx === analytics.monthlyRevenue.length - 1;

                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white font-bold px-2 py-1 rounded-lg mb-1 whitespace-nowrap shadow-md pointer-events-none">
                      Rp {item.revenueJuta} Jt ({item.orders} pesanan)
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[38px] rounded-t-xl transition-all ${
                        isCurrentMonth
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-500 shadow-md shadow-emerald-600/20'
                          : 'bg-slate-200 group-hover:bg-emerald-300'
                      }`}
                    />
                    <span
                      className={`text-xs mt-1 ${
                        isCurrentMonth ? 'text-emerald-700 font-extrabold' : 'text-slate-500'
                      }`}
                    >
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Commodities Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Pangsa Komoditas Terlaris
            </h3>
            <p className="text-xs text-slate-500">Kontribusi penjualan menurut jenis produk</p>
          </div>

          <div className="space-y-3 pt-1">
            {analytics.topCommodities.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 truncate pr-2">{item.name}</span>
                  <span className="font-extrabold text-emerald-700">{item.sharePercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.sharePercent}%` }}
                    className="h-full bg-emerald-600 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{item.soldVolume}</span>
                  <span>Rp {(item.revenue / 1000000).toFixed(1)} Jt</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Peringatan Stok Gudang Kritis ({lowStockItems.length} Komoditas)
              </h3>
              <p className="text-xs text-slate-500">
                Pemberitahuan otomatis saat persediaan berada di bawah batas minimum.
              </p>
            </div>
          </div>
        </div>

        {lowStockItems.length === 0 ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Seluruh stok komoditas berada dalam batas aman.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lowStockItems.map((comm) => (
              <div
                key={comm.id}
                className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 truncate">{comm.name}</h4>
                  <p className="text-[11px] text-amber-800 font-bold mt-0.5">
                    Sisa: {comm.currentStock} {comm.unit} (Min: {comm.minimumStockThreshold})
                  </p>
                </div>
                <button
                  onClick={() => onRestock(comm.id, 50)}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 transition-transform hover:scale-105"
                >
                  +50 Unit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Daftar Pesanan & Rantai Distribusi Masuk ({orders.length} Transaksi)
            </h3>
            <p className="text-xs text-slate-500">
              Kelola status pengemasan petani dan pengiriman armada perairan atau darat.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setOrderFilter('all')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                orderFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setOrderFilter('processing')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                orderFilter === 'processing'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Dikemas Petani
            </button>
            <button
              onClick={() => setOrderFilter('shipped')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                orderFilter === 'shipped'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Sedang Dikirim
            </button>
            <button
              onClick={() => setOrderFilter('delivered')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                orderFilter === 'delivered'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* Mobile Orders Card List (block md:hidden) */}
        <div className="md:hidden space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400">Tidak ada pesanan pada filter ini</div>
          ) : (
            filteredOrders.map((ord) => (
              <div key={ord.id} className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-slate-900">{ord.orderNumber}</span>
                  {getFulfillmentBadge(ord.fulfillmentStatus, ord.transportMode)}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-800">{ord.buyerName}</span>
                  <span className="text-slate-500"> • {ord.destinationDistrict}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl space-y-0.5 text-[11px] text-slate-700">
                  {ord.items.map((it, i) => (
                    <div key={i}>• {it.quantity} {it.unit} {it.commodityName}</div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Total:</span>
                    <span className="font-extrabold text-emerald-700 text-sm">
                      Rp {ord.grandTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div>
                    {ord.fulfillmentStatus === 'processing' || ord.fulfillmentStatus === 'pending' ? (
                      <button
                        onClick={() =>
                          onUpdateOrderStatus(
                            ord.id,
                            ord.transportMode === 'river_water' ? 'shipped_river' : 'shipped_land'
                          )
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-sky-600 active:bg-sky-700 text-white font-bold text-xs shadow-xs"
                      >
                        Kirimkan
                      </button>
                    ) : ord.fulfillmentStatus === 'shipped_river' || ord.fulfillmentStatus === 'shipped_land' ? (
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                      >
                        Sampai
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-700 font-bold">✓ Selesai</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table (hidden md:block) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">No. Pesanan</th>
                <th className="px-4 py-3">Pembeli</th>
                <th className="px-4 py-3">Rincian Komoditas</th>
                <th className="px-4 py-3">Kurir</th>
                <th className="px-4 py-3">Total (Rp)</th>
                <th className="px-4 py-3">Status Rantai Distribusi</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    {ord.orderNumber}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-800 block">{ord.buyerName}</span>
                    <span className="text-[11px] text-slate-500">{ord.destinationDistrict}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {ord.items.map((it, i) => (
                      <div key={i} className="text-[11px]">
                        • {it.quantity} {it.unit} {it.commodityName}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <span className="font-semibold block">{ord.selectedCourier}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Resi: {ord.trackingNumber}</span>
                  </td>
                  <td className="px-4 py-3 font-extrabold text-emerald-700">
                    Rp {ord.grandTotal.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    {getFulfillmentBadge(ord.fulfillmentStatus, ord.transportMode)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {ord.fulfillmentStatus === 'processing' || ord.fulfillmentStatus === 'pending' ? (
                      <button
                        onClick={() =>
                          onUpdateOrderStatus(
                            ord.id,
                            ord.transportMode === 'river_water' ? 'shipped_river' : 'shipped_land'
                          )
                        }
                        className="px-3 py-1 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] shadow-xs"
                      >
                        Kirimkan
                      </button>
                    ) : ord.fulfillmentStatus === 'shipped_river' || ord.fulfillmentStatus === 'shipped_land' ? (
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                        className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs"
                      >
                        Sampai
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-bold">✓ Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
