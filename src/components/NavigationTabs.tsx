'use client';

import React from 'react';
import { ShoppingBag, Globe, Ship, BarChart3 } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: 'katalog' | 'ekspor' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql';
  onTabChange: (tab: 'katalog' | 'ekspor' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql') => void;
  orderCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  orderCount,
}) => {
  const tabs = [
    {
      id: 'katalog' as const,
      label: 'Katalog Komoditas Ekspor',
      shortLabel: 'Katalog',
      icon: ShoppingBag,
      badge: '11 Komoditas',
    },
    {
      id: 'ekspor' as const,
      label: 'Hub Pasar Ekspor Dunia',
      shortLabel: 'Pasar Global',
      icon: Globe,
      badge: 'Global B2B & RFQ',
    },
    {
      id: 'ongkir' as const,
      label: 'Kargo Sungai & Pelabuhan',
      shortLabel: 'Logistik',
      icon: Ship,
      badge: 'Kuala Enok & Parit 21',
    },
    {
      id: 'dashboard' as const,
      label: 'Seller Centre Petani & UMKM',
      shortLabel: 'Seller Centre',
      icon: BarChart3,
      badge: `${orderCount} Pesanan`,
    },
  ];

  return (
    <div className="bg-white border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 sm:space-x-3 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 py-2 px-3.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-emerald-700 text-emerald-100'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
