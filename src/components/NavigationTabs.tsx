'use client';

import React from 'react';
import { ShoppingBag, BarChart3, Ship, Network, Database } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: 'katalog' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql';
  onTabChange: (tab: 'katalog' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql') => void;
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
      label: 'Katalog Komoditas & UMKM Inhil',
      shortLabel: 'Katalog',
      icon: ShoppingBag,
      badge: '11 Produk',
    },
    {
      id: 'dashboard' as const,
      label: 'Seller Centre / Analitik UMKM',
      shortLabel: 'Seller Centre',
      icon: BarChart3,
      badge: `${orderCount} Pesanan`,
    },
    {
      id: 'ongkir' as const,
      label: 'Kalkulator Ongkir Jalur Air & Darat',
      shortLabel: 'Logistik Inhil',
      icon: Ship,
      badge: 'Speedboat & Truk',
    },
    {
      id: 'arsitektur' as const,
      label: 'Blueprint Arsitektur & REST API',
      shortLabel: 'Arsitektur',
      icon: Network,
      badge: 'BPMN & Flow',
    },
    {
      id: 'sql' as const,
      label: 'Skema Database Relasional (DDL)',
      shortLabel: 'DDL SQL',
      icon: Database,
      badge: 'PostgreSQL / MySQL',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] border-b border-[#CCCCCC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#EE4D2D] text-[#EE4D2D] font-bold'
                    : 'border-transparent text-[#555555] hover:text-[#EE4D2D]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#EE4D2D]' : 'text-[#5A5A5A]'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-xs font-semibold ${
                    isActive
                      ? 'bg-[#FACAC0] text-[#D0011B]'
                      : 'bg-[#F5F5F5] text-[#555555]'
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
