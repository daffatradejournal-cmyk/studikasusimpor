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
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_SHIPPING_ROUTES } from '../lib/mockData';

export const ShippingCalculator: React.FC = () => {
  const [weightKg, setWeightKg] = useState(25);
  const [origin, setOrigin] = useState('Dermaga Parit 13 Tembilahan Hilir');
  const [destination, setDestination] = useState('Pekanbaru Kota');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-sky-900 text-white shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-300 bg-white/10 px-3 py-1 rounded-full">
            <Ship className="w-4 h-4 text-sky-300" />
            <span>Kalkulator Logistik Multimodal Indragiri Hilir</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Estimasi Ongkos Kirim: <span className="text-lime-300">Jalur Perairan Sungai & Darat</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Menghitung tarif transparan rute muatan perahu pompong Parit 21, speedboat express antar-parit muara, dan truk kargo darat lintas provinsi.
          </p>
        </div>

        <div className="px-4 py-2 bg-white/15 backdrop-blur-xs text-white border border-white/20 text-xs font-bold rounded-2xl shrink-0">
          ✓ Terverifikasi Rute Inhil
        </div>
      </div>

      {/* Inputs Bar */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Asal */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Titik Muat Asal (Inhil):
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
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
            <label className="text-xs font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-sky-600" />
              Wilayah / Kecamatan Tujuan:
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">
                Bobot Muatan Komoditas:
              </label>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
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
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 Kg</span>
              <span>100 Kg</span>
              <span>250 Kg</span>
              <span>500 Kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Routes Cards Grid (Smooth Organic Rounded-2xl Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INITIAL_SHIPPING_ROUTES.map((route) => {
          const totalCost = route.baseCost + Math.max(0, weightKg - 1) * route.costPerKg;
          const isWater = route.transportMode === 'river_water';

          return (
            <div
              key={route.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between space-y-4 shadow-soft hover:border-emerald-400 hover:shadow-hover transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                      isWater
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isWater ? <Ship className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                    <span>{route.transportLabel}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{route.courierCode}</span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {route.courierName}
                  </h3>
                  <p className="text-xs text-slate-500">{route.serviceType}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{route.description}</p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Estimasi Durasi:</span>
                    <strong className="text-slate-900">{route.estimatedDays}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tarif Dasar (1 Kg):</span>
                    <strong className="text-slate-900">
                      Rp {route.baseCost.toLocaleString('id-ID')}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tarif Tambahan / Kg:</span>
                    <strong className="text-slate-900">
                      Rp {route.costPerKg.toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-xs text-slate-500 font-semibold">Total Ongkir ({weightKg} Kg):</span>
                <span className="text-lg font-black text-emerald-700">
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
