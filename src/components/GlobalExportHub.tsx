'use client';

import React, { useState } from 'react';
import {
  Globe,
  Ship,
  Anchor,
  FileCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Boxes,
  ShieldCheck,
  Send,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const GlobalExportHub: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState('kopra');
  const [containerSize, setContainerSize] = useState('20ft');
  const [destination, setDestination] = useState('singapore');
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  const exportDestinations = [
    { id: 'singapore', country: 'Singapura', port: 'Port of Singapore (PSA)', leadTime: '2-3 Hari', flag: '🇸🇬', demand: 'Tinggi (VCO & Kelapa Segar)' },
    { id: 'malaysia', country: 'Malaysia', port: 'Port Klang / Pasir Gudang', leadTime: '3-4 Hari', flag: '🇲🇾', demand: 'Sangat Tinggi (Kopra & Briket)' },
    { id: 'china', country: 'Tiongkok', port: 'Guangzhou / Shanghai Port', leadTime: '8-10 Hari', flag: '🇨🇳', demand: 'Massif (Kelapa Butir & Cocopeat)' },
    { id: 'middle_east', country: 'Timur Tengah', port: 'Jebel Ali Port (Dubai)', leadTime: '14-16 Hari', flag: '🇦🇪', demand: 'Tinggi (Briket Arang Batok Shisha)' },
    { id: 'europe', country: 'Uni Eropa', port: 'Rotterdam Port', leadTime: '22-25 Hari', flag: '🇪🇺', demand: 'Stabil (VCO Organik Cold-Pressed)' },
  ];

  const exportProducts = [
    {
      id: 'kopra',
      name: 'Kopra Putih Reguler & Asalan (White Copra)',
      grade: 'Grade Ekspor (Moisture < 6%)',
      priceTon: 14500000,
      packaging: 'Jute Bags 50kg / Bulk Container',
      origin: 'Parit 13 Tembilahan & Enok',
    },
    {
      id: 'kelapa_butir',
      name: 'Kelapa Bulat Kupas Hibrida & Dalam',
      grade: 'Grade A Semi-Husked (Berat 1.0 - 1.3 kg/butir)',
      priceTon: 5800000,
      packaging: 'Mesh Bags (25 butir/karung)',
      origin: 'Kuala Mandah & Gaung Anak Serka',
    },
    {
      id: 'vco',
      name: 'Virgin Coconut Oil (VCO) Cold-Pressed Organik',
      grade: 'Food Grade & Cosmetic (FFA < 0.1%)',
      priceTon: 52000000,
      packaging: 'Drum 200L / Jerrycan 20L / Botol Retail',
      origin: 'Sentra Hilirisasi Sei Salak',
    },
    {
      id: 'briket',
      name: 'Briket Arang Tempurung Kelapa (Coconut Charcoal)',
      grade: 'Cube 25mm (Kalori > 7200 kcal/kg, Ash < 2.5%)',
      priceTon: 19800000,
      packaging: 'Inner Box 1kg + Master Carton 10kg',
      origin: 'Tempuling & Tembilahan Barat',
    },
  ];

  const currentProduct = exportProducts.find((p) => p.id === selectedCommodity) || exportProducts[0];
  const currentDest = exportDestinations.find((d) => d.id === destination) || exportDestinations[0];

  const containerTonnage = containerSize === '20ft' ? 18 : 26;
  const estimatedOrderValue = currentProduct.priceTon * containerTonnage;

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    setTimeout(() => setRfqSubmitted(false), 5000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Global Trade Banner */}
      <div className="relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-soft overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/15 backdrop-blur-xs text-lime-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Gerbang Ekspor Komoditas Inhil</span>
          </div>

          <h1 className="text-xl sm:text-4xl font-extrabold text-white leading-tight">
            Hub Perdagangan Internasional: Dari Parit Tembilahan Menembus Dunia
          </h1>

          <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
            Kabupaten Indragiri Hilir memiliki lebih dari <strong>400.000 hektar hamparan perkebunan kelapa</strong> — terluas di dunia. <strong>PasarTembilahan Global</strong> menghubungkan langsung koperasi tani kelapa, pabrik pengolahan turunan, dan UMKM dengan importir serta buyer internasional tanpa perantara tengkulak berlapis.
          </p>

          <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-[11px] sm:text-xs font-medium">
              <Ship className="w-3.5 h-3.5 text-lime-300" />
              <span>Pelabuhan Samudera Kuala Enok</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-[11px] sm:text-xs font-medium">
              <Anchor className="w-3.5 h-3.5 text-lime-300" />
              <span>Dermaga Parit 21</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-[11px] sm:text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-300" />
              <span>Sucofindo & Halal</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100 shadow-soft">
          <div className="text-emerald-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center gap-1 sm:gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Potensi Panen</span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900">1.2 Miliar</div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">Butir kelapa/tahun di Inhil</div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100 shadow-soft">
          <div className="text-emerald-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center gap-1 sm:gap-1.5">
            <Boxes className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kapasitas Muat</span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900">50 - 200 Ton</div>
          <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">Tongkang & kontainer</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-soft">
          <div className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Koperasi Mitra</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">38 Sentra</div>
          <div className="text-[11px] text-slate-500">Koperasi tani parit se-Indragiri Hilir</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-soft">
          <div className="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Negara Tujuan</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">8 Destinasi</div>
          <div className="text-[11px] text-slate-500">Asia Tenggara, Tiongkok, & MEA</div>
        </div>
      </div>

      {/* Main Grid: RFQ Simulator & Global Export Corridors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive RFQ Simulator (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-emerald-100 p-5 sm:p-7 shadow-soft space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
              B2B & BULK EXPORT PORTAL
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Simulasi Kuotasi Kontainer & Permintaan Ekspor (RFQ)
            </h3>
            <p className="text-xs text-slate-500">
              Pilih komoditas, ukuran kontainer muatan, dan pelabuhan tujuan untuk menghitung perkiraan tonase dan estimasi nilai transaksi kargo.
            </p>
          </div>

          <form onSubmit={handleSubmitRfq} className="space-y-4">
            {/* Commodity Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Pilih Komoditas Ekspor:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {exportProducts.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedCommodity(p.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedCommodity === p.id
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                      Rp {p.priceTon.toLocaleString('id-ID')} / Ton
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">{p.grade}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Container Size & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Kapasitas Kargo Kontainer:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setContainerSize('20ft')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      containerSize === '20ft'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Kontainer 20ft (~18 Ton)
                  </button>
                  <button
                    type="button"
                    onClick={() => setContainerSize('40ft')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      containerSize === '40ft'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Kontainer 40ft (~26 Ton)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Pelabuhan Tujuan Ekspor:</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  {exportDestinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.flag} {d.country} — {d.port} ({d.leadTime})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price & Summary Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border border-emerald-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Pelabuhan Muat Asal:</span>
                <span className="font-bold text-slate-900">Pelabuhan Samudera Kuala Enok / Parit 21</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Total Muatan Kargo:</span>
                <span className="font-bold text-slate-900">{containerTonnage} Ton ({currentProduct.packaging})</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Estimasi Waktu Pelayaran:</span>
                <span className="font-bold text-emerald-800">{currentDest.leadTime} ke {currentDest.port}</span>
              </div>
              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Estimasi Nilai Kontrak Komoditas:</span>
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-700">
                    Rp {estimatedOrderValue.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Metode Pembayaran B2B:</span>
                  <span className="text-xs font-bold text-slate-800">L/C at Sight / T/T Deposit</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Ajukan Permintaan Kuotasi Ekspor (RFQ)</span>
              </button>
              <a
                href="https://wa.me/6281276448891?text=Halo%20Desk%20Ekspor%20PasarTembilahan,%20saya%20ingin%20konsultasi%20pembelian%20komoditas%20ekspor"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Hubungi Desk Ekspor via WA</span>
              </a>
            </div>

            {rfqSubmitted && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Permintaan kuotasi berhasil dibuat! Tim Desk Ekspor PasarTembilahan akan memverifikasi spesifikasi muatan dalam 1x24 jam.</span>
              </div>
            )}
          </form>
        </div>

        {/* Right: Rantai Pasok Terpadu (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4 text-emerald-700" />
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Alur Rantai Pasok Ekspor Inhil
              </h4>
            </div>

            <div className="space-y-3 relative pl-6 border-l-2 border-emerald-200">
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                <h5 className="font-bold text-xs text-slate-900">01. Petani Parit & Kebun Gambut</h5>
                <p className="text-[11px] text-slate-600">Panen kelapa hibrida & dalam di Parit 13, Enok, Mandah, dan Gaung.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                <h5 className="font-bold text-xs text-slate-900">02. Pompong & Speedboat Sungai</h5>
                <p className="text-[11px] text-slate-600">Transportasi air melalui parit-parit pasang surut menuju dermaga konsolidasi Parit 21.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                <h5 className="font-bold text-xs text-slate-900">03. Grading & Uji Mutu Ekspor</h5>
                <p className="text-[11px] text-slate-600">Pengecekan kadar air kopra (&lt;6%), FFA VCO, dan sertifikasi Phytosanitary Sucofindo.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                <h5 className="font-bold text-xs text-slate-900">04. Pelabuhan Samudera Kuala Enok</h5>
                <p className="text-[11px] text-slate-600">Pemuatan ke kontainer kargo dan kapal tongkang ekspor langsung ke perairan Selat Malaka.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-lime-500 border-2 border-white" />
                <h5 className="font-bold text-xs text-emerald-800">05. Tiba di Buyer Mancanegara</h5>
                <p className="text-[11px] text-slate-600">Bongkar muat di Singapura, Malaysia, Tiongkok, dan Timur Tengah dengan dokumen lengkap.</p>
              </div>
            </div>
          </div>

          {/* Export Standards Card */}
          <div className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-soft space-y-3">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Standar Legalitas & Mutu Resmi</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-800">Phytosanitary</div>
                <div className="text-[10px] text-slate-500">Bebas hama & jamur</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-800">Sucofindo Inspection</div>
                <div className="text-[10px] text-slate-500">Grade & moisture test</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-800">Certificate of Origin</div>
                <div className="text-[10px] text-slate-500">SKA Form D / E / AK</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-800">Halal Indonesia</div>
                <div className="text-[10px] text-slate-500">BPJPH Kemenag</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
