'use client';

import React from 'react';
import { ShoppingBag, Globe, Ship, BarChart3, ShoppingCart } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'katalog' | 'ekspor' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql';
  onTabChange: (tab: 'katalog' | 'ekspor' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
}) => {
  const navItems = [
    {
      id: 'katalog' as const,
      label: 'Katalog',
      icon: ShoppingBag,
    },
    {
      id: 'ekspor' as const,
      label: 'Ekspor B2B',
      icon: Globe,
    },
    {
      id: 'ongkir' as const,
      label: 'Kargo Air',
      icon: Ship,
    },
    {
      id: 'dashboard' as const,
      label: 'Seller',
      icon: BarChart3,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)] safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                isActive
                  ? 'text-emerald-700 font-bold scale-105'
                  : 'text-slate-500 hover:text-emerald-600 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-emerald-100 text-emerald-800' : 'text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* Floating Cart Button */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center flex-1 py-1 text-slate-600 hover:text-emerald-700 relative font-medium transition-all"
        >
          <div className="p-1 rounded-xl bg-slate-100 text-slate-700 relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-lime-500 text-emerald-950 font-black text-[10px] rounded-full flex items-center justify-center shadow-xs">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Keranjang</span>
        </button>
      </div>
    </nav>
  );
};
