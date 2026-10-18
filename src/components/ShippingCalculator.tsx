'use client';

import React, { useState } from 'react';
import {
  Ship,
  Truck,
  Anchor,
  MapPin,
  Clock,
  Coins,
  Navigation,
  Info,
} from 'lucide-react';
import { INITIAL_SHIPPING_ROUTES } from '../lib/mockData';

export const ShippingCalculator: React.FC = () => {
  const [weightKg, setWeightKg] = useState(25);
  const [origin, setOrigin] = useState('Dermaga Parit 13 Tembilahan Hilir');
  const [destination, setDestination] = useState('Pekanbaru Kota');

  return (
    <div className="space-y-4">
      {/* Shopee Logistics Header Card */}
      <div className="p-4 sm:p-5 rounded-xs bg-[#FFFFFF] border border-[#CCCCCC]/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#EE4D2D] uppercase tracking-wider">
            <Ship className="w-4 h-4 text-[#066BC8]" />
            <span>Shopee Logistics Hub • Indragiri Hilir</span>
          </div>
          <h2 className="font-titillium text-lg sm:text-xl font-bold text-[#222222] mt-0.5">
            Kalkulator Ongkos Kirim: Jalur Perairan Sungai & Darat Inhil
          </h2>
          <p className="text-xs text-[#555555] mt-0.5">
            Estimasi tarif pengiriman komoditas kelapa, kopra, dan olahan via perahu pompong, speedboat, dan kargo darat.
          </p>
        </div>

        <div className="px-3 py-1 bg-[#00BFA5]/10 text-[#00BFA5] border border-[#00BFA5]/40 text-xs font-bold rounded-xs shrink-0">
          ✓ Garansi Ongkir Transparan
        </div>
      </div>

      {/* Inputs Bar */}
      <div className="bg-[#FFFFFF] rounded-xs border border-[#CCCCCC]/60 p-4 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Asal */}
          <div>
            <label className="text-xs font-semibold text-[#222222] block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#EE4D2D]" />
              Titik Muat Asal (Inhil):
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-xs border border-[#CCCCCC] bg-white focus:outline-none focus:border-[#EE4D2D]"
            >
              <option value="Dermaga Parit 13 Tembilahan Hilir">Dermaga Parit 13 (Tembilahan Hilir)</option>
              <option value="Pelabuhan Parit 21 Tembilahan">Pelabuhan Parit 21 (Pusat Bongkar Kelapa)</option>
              <option value="Pelabuhan LLASDP Tembilahan">Pelabuhan LLASDP (Speedboat Center)</option>
              <option value="Dermaga Sentra Gambut Enok">Dermaga Sentra Gambut Enok</option>
              <option value="Pelabuhan Samudera Kuala Enok">Pelabuhan Samudera Kuala Enok</option>
            </select>
          </div>

          {/* Tujuan */}
          <div>
            <label className="text-xs font-semibold text-[#222222] block mb-1 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-[#066BC8]" />
              Wilayah / Kecamatan Tujuan:
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-xs border border-[#CCCCCC] bg-white focus:outline-none focus:border-[#EE4D2D]"
            >
              <optgroup label="Tujuan Lokal Perairan Inhil">
                <option value="Kec. Mandah (Jalur Air)">Kec. Mandah (Speedboat Air)</option>
                <option value="Kec. Kuindra / Sapat">Kec. Kuindra / Sapat (Speedboat Air)</option>
                <option value="Kec. Concong Luar">Kec. Concong Luar (Muara Laut)</option>
                <option value="Kec. Kateman / Sei Guntung">Kec. Kateman / Sei Guntung</option>
              </optgroup>
              <optgroup label="Tujuan Nasional & Ekspor">
                <option value="Pekanbaru Kota">Pekanbaru Kota (Truk Lintas Timur)</option>
                <option value="Batam / Kepri">Batam / Kepri (Kuala Enok Kargo)</option>
                <option value="DKI Jakarta & Sekitarnya">DKI Jakarta & Jawa</option>
                <option value="Singapura / Port Klang">Singapura (Ekspor Pelabuhan Samudera)</option>
              </optgroup>
            </select>
          </div>

          {/* Bobot Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#222222]">
                Bobot Muatan Komoditas:
              </label>
              <span className="text-xs font-bold text-[#EE4D2D] bg-[#FACAC0]/30 px-2 py-0.2 rounded-xs border border-[#EE4D2D]/30">
                {weightKg >= 1000 ? `${(weightKg / 1000).toFixed(2)} Ton` : `${weightKg} Kg`}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="500"
              step="1"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full h-1.5 bg-[#CCCCCC] rounded-xs appearance-none cursor-pointer accent-[#EE4D2D]"
            />
            <div className="flex justify-between text-[10px] text-[#5A5A5A] mt-0.5">
              <span>1 Kg</span>
              <span>100 Kg</span>
              <span>250 Kg</span>
              <span>500 Kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Routes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {INITIAL_SHIPPING_ROUTES.map((route) => {
          const totalCost = route.baseCost + Math.max(0, weightKg - 1) * route.costPerKg;
          const isWater = route.transportMode === 'river_water';

          return (
            <div
              key={route.id}
              className="bg-[#FFFFFF] rounded-xs border border-[#CCCCCC]/60 p-3.5 flex flex-col justify-between space-y-3 shadow-xs hover:border-[#EE4D2D] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider ${
                      isWater
                        ? 'bg-[#00BFA5]/10 text-[#00BFA5] border border-[#00BFA5]/40'
                        : 'bg-[#EE4D2D]/10 text-[#EE4D2D] border border-[#EE4D2D]/30'
                    }`}
                  >
                    {route.transportLabel}
                  </span>
                  <span className="text-[10px] font-mono text-[#5A5A5A]">{route.courierCode}</span>
                </div>

                <div>
                  <h3 className="font-titillium font-bold text-sm text-[#222222]">
                    {route.courierName}
                  </h3>
                  <p className="text-[11px] text-[#555555]">{route.serviceType}</p>
                </div>

                <p className="text-xs text-[#5A5A5A] leading-relaxed">{route.description}</p>

                <div className="p-2 bg-[#FAFAFA] rounded-xs border border-[#CCCCCC]/40 text-xs space-y-1">
                  <div className="flex justify-between text-[#555555]">
                    <span>Estimasi Waktu:</span>
                    <strong className="text-[#222222]">{route.estimatedDays}</strong>
                  </div>
                  <div className="flex justify-between text-[#555555]">
                    <span>Tarif Dasar (1 Kg):</span>
                    <strong className="text-[#222222]">
                      Rp {route.baseCost.toLocaleString('id-ID')}
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#555555]">
                    <span>Biaya Tambahan / Kg:</span>
                    <strong className="text-[#222222]">
                      Rp {route.costPerKg.toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F5F5F5] flex items-baseline justify-between">
                <span className="text-xs text-[#555555]">Total ({weightKg} Kg):</span>
                <span className="text-base font-bold text-[#EE4D2D]">
                  Rp {totalCost.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
