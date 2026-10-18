'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  GitBranch,
  Database,
  Network,
  Ship,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface SiRoleExplainerProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const SiRoleExplainer: React.FC<SiRoleExplainerProps> = ({
  isExpanded: controlledExpanded,
  onToggle,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(true);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  const handleToggle = onToggle || (() => setInternalExpanded(!internalExpanded));

  const pillars = [
    {
      step: '01',
      title: 'Analisis & Pemodelan Proses Bisnis (BPA)',
      icon: GitBranch,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      tag: 'BPMN AS-IS & TO-BE',
      description:
        'Menganalisis inefisiensi rantai tengkulak berlapis di Inhil yang menekan harga petani kelapa, lalu merancang ulang alur rantai pasok digital langsung (direct-to-market) dari kebun ke pembeli.',
      deliverables: ['Pemetaan Swimlane BPMN', 'Matriks Problem vs Solution', 'Efisiensi Margin Petani'],
    },
    {
      step: '02',
      title: 'Rekayasa Basis Data Relasional (3NF)',
      icon: Database,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      tag: 'PostgreSQL / MySQL Schema',
      description:
        'Merancang 9 tabel ternormalisasi (schema.sql), integritas referensial keras, constraint CHECK anti-stok negatif, serta audit ledger mutasi arus barang untuk keamanan transaksi.',
      deliverables: ['Normalisasi 3NF & ERD', 'Constraint Integritas Data', 'Audit Trail Mutasi Stok'],
    },
    {
      step: '03',
      title: 'Integrasi Sistem & RESTful API Gateway',
      icon: Network,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      tag: 'REST API & Webhook',
      description:
        'Membangun antarmuka API terstandarisasi untuk menghubungkan katalog komoditas, kalkulator logistik, dan payment gateway Midtrans Snap via notifikasi webhook callback otomatis.',
      deliverables: ['5 Endpoint RESTful API', 'Midtrans Webhook Callback', 'Payload JSON Kontrak'],
    },
    {
      step: '04',
      title: 'Pemodelan Logistik Perairan Multimodal',
      icon: Ship,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      tag: 'Logistik Seribu Parit Inhil',
      description:
        'Memformulasikan algoritma estimasi ongkos kirim khusus geografis perairan rawa dan parit Inhil (Pompong Parit 21 & Speedboat Express) yang tidak ada di e-commerce konvensional.',
      deliverables: ['Algoritma Tarif Bobot & Jarak', 'Integrasi Moda Air & Darat', 'Koridor Ekspor Kuala Enok'],
    },
    {
      step: '05',
      title: 'Sistem Analitik & Pendukung Keputusan UMKM',
      icon: BarChart3,
      color: 'bg-lime-50 text-lime-800 border-lime-200',
      tag: 'Seller Centre Dashboard',
      description:
        'Merancang antarmuka analitik omzet harian, visualisasi dinamika penjualan bulanan, dan sistem peringatan dini persediaan kritis dengan aksi restock cepat bagi mitra koperasi tani.',
      deliverables: ['KPI Cards Omzet & Tonase', 'Monitoring Level Stok Kritis', 'Grafik Pertumbuhan Penjualan'],
    },
  ];

  return (
    <div id="si-role-explainer" className="bg-white rounded-2xl border border-emerald-100 shadow-soft overflow-hidden transition-all">
      {/* Clickable Header Banner */}
      <div
        onClick={handleToggle}
        className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-b border-emerald-100/60 cursor-pointer flex items-center justify-between gap-3 select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                S1 Sistem Informasi UNISI
              </span>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">•</span>
              <span className="text-xs text-slate-600 font-medium hidden sm:inline">
                Rekayasa & Kontribusi Nyata
              </span>
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-0.5">
              S1 Sistem Informasi di Proyek Ini Ngapain Aja?
            </h3>
          </div>
        </div>

        <button
          className="p-2 rounded-xl text-emerald-800 hover:bg-emerald-100/80 transition-colors shrink-0"
          title={isExpanded ? 'Tutup Rincian' : 'Buka Rincian'}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-200">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            Sebagai sarjana <strong>Sistem Informasi (SI)</strong>, proyek <strong>PasarTembilahan</strong> bukan sekadar membuat tampilan web, melainkan <strong>mendiagnosis masalah proses bisnis di lapangan</strong> dan menerjemahkannya ke dalam <strong>solusi arsitektur data, integrasi sistem, dan teknologi rantai pasok terotomasi</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col justify-between space-y-3 bg-white"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        LANGKAH {pillar.step}
                      </span>
                      <div className={`p-1.5 rounded-lg border ${pillar.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Output Rekayasa:
                    </span>
                    {pillar.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
