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
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#00BFA5]/10 text-[#00BFA5] border border-[#00BFA5]/30">
            <CheckCircle2 className="w-3 h-3 text-[#00BFA5]" />
            Pesanan Selesai
          </span>
        );
      case 'shipped_river':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#066BC8]/10 text-[#066BC8] border border-[#066BC8]/30">
            <Ship className="w-3 h-3 text-[#066BC8]" />
            Berlayar Jalur Air
          </span>
        );
      case 'shipped_land':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#066BC8]/10 text-[#066BC8] border border-[#066BC8]/30">
            <Truck className="w-3 h-3 text-[#066BC8]" />
            Kargo Darat Lintas
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#FFCE3D]/20 text-[#222222] border border-[#FFCE3D]/60">
            <Package className="w-3 h-3 text-[#EE4D2D]" />
            Dikemas Mitra Tani
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] font-bold bg-[#F5F5F5] text-[#555555] border border-[#CCCCCC]">
            Menunggu Verifikasi
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Seller Centre Header */}
      <div className="p-4 sm:p-5 rounded-xs bg-[#FFFFFF] border border-[#CCCCCC]/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00BFA5]" />
            <span className="text-[10px] font-bold text-[#EE4D2D] uppercase tracking-wider">
              Shopee Seller Centre UMKM Inhil
            </span>
          </div>
          <h2 className="font-titillium text-lg sm:text-xl font-bold text-[#222222] mt-0.5">
            Pusat Edukasi & Pengelolaan Komoditas Mitra Tani
          </h2>
          <p className="text-xs text-[#555555]">
            Pantau arus kas omzet penjualan, volume komoditas, dan status pengiriman ekspedisi.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC] text-[#222222]">
          <Building className="w-4 h-4 text-[#EE4D2D]" />
          <span>Mitra Koperasi Binaan UNISI</span>
        </div>
      </div>

      {/* 4 Shopee Bento Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="p-4 rounded-xs bg-[#FFFFFF] border border-[#CCCCCC]/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#555555]">
            <span>Total Omzet Penjualan</span>
            <DollarSign className="w-4 h-4 text-[#EE4D2D]" />
          </div>
          <div>
            <div className="text-xl font-bold text-[#EE4D2D]">
              Rp {(analytics.totalRevenue / 1000000).toFixed(1)} Jt
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#00BFA5] mt-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{analytics.revenueGrowthMonth}% bln ini</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xs bg-[#FFFFFF] border border-[#CCCCCC]/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#555555]">
            <span>Volume Komoditas Terjual</span>
            <Package className="w-4 h-4 text-[#066BC8]" />
          </div>
          <div>
            <div className="text-xl font-bold text-[#222222]">
              {(analytics.commoditiesSoldKg / 1000).toFixed(1)} Ton
            </div>
            <div className="text-[11px] text-[#5A5A5A] mt-0.5">
              94.500 Kg kelapa & produk turunan
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xs bg-[#FFFFFF] border border-[#CCCCCC]/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#555555]">
            <span>Total Pesanan Selesai</span>
            <ShoppingBag className="w-4 h-4 text-[#FFCE3D]" />
          </div>
          <div>
            <div className="text-xl font-bold text-[#222222]">
              {analytics.totalOrders.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-[#5A5A5A] mt-0.5">
              Tervalidasi Midtrans Snap
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xs bg-[#FFFFFF] border border-[#CCCCCC]/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#555555]">
            <span>Mitra Tani & UMKM</span>
            <Users className="w-4 h-4 text-[#00BFA5]" />
          </div>
          <div>
            <div className="text-xl font-bold text-[#222222]">
              {analytics.activePartners} Sentra Usaha
            </div>
            <div className="text-[11px] text-[#5A5A5A] mt-0.5">
              Koperasi Se-Kabupaten Inhil
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Monthly Revenue Dynamics & Top Commodities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
        {/* Dynamic Bar Chart: Monthly Revenue (2 Cols) */}
        <div className="lg:col-span-2 bg-[#FFFFFF] rounded-xs border border-[#CCCCCC]/60 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-titillium font-bold text-sm text-[#222222] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#EE4D2D]" />
                Dinamika Penjualan Komoditas Bulanan (2026)
              </h3>
              <p className="text-[11px] text-[#555555]">
                Pencatatan omzet transaksi digital UMKM Indragiri Hilir (Juta Rupiah)
              </p>
            </div>
            <span className="text-xs font-bold text-[#EE4D2D] bg-[#FACAC0]/30 px-2 py-0.5 rounded-xs border border-[#EE4D2D]/30">
              Total: Rp 178.8 Juta
            </span>
          </div>

          <div className="pt-4 pb-1">
            <div className="h-44 flex items-end justify-between gap-3 px-2 border-b border-[#F5F5F5]">
              {analytics.monthlyRevenue.map((item, idx) => {
                const maxVal = 50;
                const heightPercent = Math.min(100, Math.round((item.revenueJuta / maxVal) * 100));
                const isCurrentMonth = idx === analytics.monthlyRevenue.length - 1;

                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] bg-[#222222] text-white font-bold px-1.5 py-0.5 rounded-xs mb-1 whitespace-nowrap shadow-xs pointer-events-none">
                      Rp {item.revenueJuta} Jt ({item.orders})
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[36px] rounded-t-xs transition-all ${
                        isCurrentMonth ? 'bg-[#EE4D2D]' : 'bg-[#CCCCCC] group-hover:bg-[#F05D40]'
                      }`}
                    />
                    <span
                      className={`text-[11px] mt-1 ${
                        isCurrentMonth ? 'text-[#EE4D2D] font-bold' : 'text-[#555555]'
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
        <div className="bg-[#FFFFFF] rounded-xs border border-[#CCCCCC]/60 p-4 sm:p-5 shadow-xs space-y-3">
          <div>
            <h3 className="font-titillium font-bold text-sm text-[#222222]">
              Pangsa Komoditas Terlaris
            </h3>
            <p className="text-[11px] text-[#555555]">Kontribusi penjualan per kelompok komoditas</p>
          </div>

          <div className="space-y-2.5 pt-1">
            {analytics.topCommodities.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#222222] truncate pr-2">{item.name}</span>
                  <span className="font-bold text-[#EE4D2D]">{item.sharePercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F5F5F5] rounded-xs overflow-hidden">
                  <div
                    style={{ width: `${item.sharePercent}%` }}
                    className="h-full bg-[#EE4D2D] rounded-xs"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#5A5A5A]">
                  <span>{item.soldVolume}</span>
                  <span>Rp {(item.revenue / 1000000).toFixed(1)} Jt</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert Bar */}
      <div className="bg-[#FFFFFF] rounded-xs border border-[#CCCCCC]/60 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#F5F5F5]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#D0011B]">
            <AlertTriangle className="w-4 h-4 text-[#D0011B]" />
            <span>Peringatan Stok Gudang Kritis ({lowStockItems.length} Komoditas)</span>
          </div>
        </div>

        {lowStockItems.length === 0 ? (
          <div className="p-3 bg-[#00BFA5]/10 border border-[#00BFA5]/30 text-xs text-[#00BFA5] font-semibold rounded-xs">
            ✓ Seluruh stok komoditas berada dalam batas aman.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {lowStockItems.map((comm) => (
              <div
                key={comm.id}
                className="p-2.5 rounded-xs bg-[#FAFAFA] border border-[#CCCCCC]/60 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-[#222222] truncate">{comm.name}</h4>
                  <p className="text-[10px] text-[#D0011B] font-bold mt-0.5">
                    Sisa: {comm.currentStock} {comm.unit}
                  </p>
                </div>
                <button
                  onClick={() => onRestock(comm.id, 50)}
                  className="px-2.5 py-1 rounded-xs bg-[#EE4D2D] hover:bg-[#F05D40] text-white text-[11px] font-bold shrink-0 transition-colors"
                >
                  +50 Unit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-[#FFFFFF] rounded-xs border border-[#CCCCCC]/60 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-[#F5F5F5]">
          <h3 className="font-titillium font-bold text-sm text-[#222222]">
            Daftar Pesanan Masuk ({orders.length} Transaksi)
          </h3>

          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setOrderFilter('all')}
              className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                orderFilter === 'all'
                  ? 'bg-[#EE4D2D] text-white font-bold'
                  : 'bg-[#F5F5F5] text-[#555555] hover:text-[#EE4D2D]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setOrderFilter('processing')}
              className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                orderFilter === 'processing'
                  ? 'bg-[#EE4D2D] text-white font-bold'
                  : 'bg-[#F5F5F5] text-[#555555] hover:text-[#EE4D2D]'
              }`}
            >
              Dikemas
            </button>
            <button
              onClick={() => setOrderFilter('shipped')}
              className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                orderFilter === 'shipped'
                  ? 'bg-[#EE4D2D] text-white font-bold'
                  : 'bg-[#F5F5F5] text-[#555555] hover:text-[#EE4D2D]'
              }`}
            >
              Dikirim
            </button>
            <button
              onClick={() => setOrderFilter('delivered')}
              className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                orderFilter === 'delivered'
                  ? 'bg-[#EE4D2D] text-white font-bold'
                  : 'bg-[#F5F5F5] text-[#555555] hover:text-[#EE4D2D]'
              }`}
            >
              Selesai
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAFA] text-[#555555] uppercase text-[10px] font-bold border-b border-[#CCCCCC]/60">
              <tr>
                <th className="px-3 py-2">No. Pesanan</th>
                <th className="px-3 py-2">Pembeli</th>
                <th className="px-3 py-2">Komoditas</th>
                <th className="px-3 py-2">Kurir</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-3 py-2.5 font-mono text-[11px] font-bold text-[#222222]">
                    {ord.orderNumber}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="font-semibold text-[#222222] block">{ord.buyerName}</span>
                    <span className="text-[10px] text-[#5A5A5A]">{ord.destinationDistrict}</span>
                  </td>
                  <td className="px-3 py-2.5 text-[11px] text-[#555555]">
                    {ord.items.map((it, i) => (
                      <div key={i}>
                        {it.quantity} {it.unit} {it.commodityName}
                      </div>
                    ))}
                  </td>
                  <td className="px-3 py-2.5 text-[11px] text-[#555555]">
                    {ord.selectedCourier}
                  </td>
                  <td className="px-3 py-2.5 font-bold text-[#EE4D2D]">
                    Rp {ord.grandTotal.toLocaleString('id-ID')}
                  </td>
                  <td className="px-3 py-2.5">
                    {getFulfillmentBadge(ord.fulfillmentStatus, ord.transportMode)}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    {ord.fulfillmentStatus === 'processing' || ord.fulfillmentStatus === 'pending' ? (
                      <button
                        onClick={() =>
                          onUpdateOrderStatus(
                            ord.id,
                            ord.transportMode === 'river_water' ? 'shipped_river' : 'shipped_land'
                          )
                        }
                        className="px-2 py-0.5 rounded-xs bg-[#066BC8] hover:bg-[#066BC8]/90 text-white font-bold text-[10px]"
                      >
                        Kirimkan
                      </button>
                    ) : ord.fulfillmentStatus === 'shipped_river' || ord.fulfillmentStatus === 'shipped_land' ? (
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                        className="px-2 py-0.5 rounded-xs bg-[#00BFA5] hover:bg-[#00BFA5]/90 text-white font-bold text-[10px]"
                      >
                        Sampai
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#00BFA5] font-bold">✓ Selesai</span>
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
