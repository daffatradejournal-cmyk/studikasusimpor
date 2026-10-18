'use client';

import React, { useState } from 'react';
import { usePasarStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { NavigationTabs } from '@/components/NavigationTabs';
import { CommodityCatalog } from '@/components/CommodityCatalog';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { MidtransModal } from '@/components/MidtransModal';
import { ShippingCalculator } from '@/components/ShippingCalculator';
import { UmkmDashboard } from '@/components/UmkmDashboard';
import { ArchitectureModal } from '@/components/ArchitectureModal';
import { SqlSchemaViewer } from '@/components/SqlSchemaViewer';
import { SiRoleExplainer } from '@/components/SiRoleExplainer';
import { Footer } from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
  const store = usePasarStore();
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isSiRoleExpanded, setIsSiRoleExpanded] = useState(true);

  const handleOpenSiRole = () => {
    setIsSiRoleExpanded(true);
    const element = document.getElementById('si-role-explainer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-800">
      {/* Toast Notification */}
      {store.toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-150">
          <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-medium border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{store.toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Leaf Green Header */}
      <Header
        cart={store.cart}
        onOpenCart={() => store.setIsCartOpen(true)}
        searchQuery={store.searchQuery}
        onSearchChange={store.setSearchQuery}
        onResetData={store.resetDemoData}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenSiRole={handleOpenSiRole}
      />

      {/* Navigation Sub-Tabs */}
      <NavigationTabs
        activeTab={store.activeTab}
        onTabChange={store.setActiveTab}
        orderCount={store.orders.length}
      />

      {/* Main Body Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* S1 Sistem Informasi Role Explainer Accordion */}
        <SiRoleExplainer
          isExpanded={isSiRoleExpanded}
          onToggle={() => setIsSiRoleExpanded(!isSiRoleExpanded)}
        />

        {store.activeTab === 'katalog' && (
          <CommodityCatalog
            commodities={store.commodities}
            selectedCategory={store.selectedCategory}
            onSelectCategory={store.setSelectedCategory}
            searchQuery={store.searchQuery}
            onAddToCart={store.addToCart}
            onSelectProduct={store.setSelectedProduct}
            onOpenShippingCalculator={() => store.setActiveTab('ongkir')}
          />
        )}

        {store.activeTab === 'dashboard' && (
          <UmkmDashboard
            orders={store.orders}
            commodities={store.commodities}
            analytics={store.analytics}
            onRestock={store.restockCommodity}
            onUpdateOrderStatus={store.updateOrderStatus}
          />
        )}

        {store.activeTab === 'ongkir' && <ShippingCalculator />}

        {store.activeTab === 'arsitektur' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-titillium text-base sm:text-lg font-bold text-slate-900">
                  Dokumentasi Blueprint Rekayasa Sistem Informasi
                </h2>
                <p className="text-xs text-slate-600">
                  Arsitektur RESTful API, Pemetaan Proses Bisnis BPMN & Relational Database
                </p>
              </div>
              <button
                onClick={() => store.setActiveTab('sql')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                Lihat Skema SQL DDL
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft">
              <ArchitectureModal
                isOpen={true}
                onClose={() => store.setActiveTab('katalog')}
                onSwitchToSql={() => store.setActiveTab('sql')}
              />
            </div>
          </div>
        )}

        {store.activeTab === 'sql' && <SqlSchemaViewer />}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={store.isCartOpen}
        onClose={() => store.setIsCartOpen(false)}
        cart={store.cart}
        onUpdateQuantity={store.updateCartQuantity}
        onRemoveItem={store.removeFromCart}
        onClearCart={store.clearCart}
        onCreateOrder={store.createOrder}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={store.selectedProduct}
        onClose={() => store.setSelectedProduct(null)}
        onAddToCart={store.addToCart}
        onBuyNow={(commodity, qty) => {
          store.addToCart(commodity, qty);
          store.setIsCartOpen(true);
        }}
      />

      {/* Midtrans Payment Simulation Modal */}
      <MidtransModal
        order={store.activePaymentOrder}
        onClose={() => store.setActivePaymentOrder(null)}
        onPaymentSuccess={store.completeMidtransPayment}
      />

      {/* Standalone Architecture Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
        onSwitchToSql={() => {
          setIsArchitectureOpen(false);
          store.setActiveTab('sql');
        }}
      />

      {/* Footer */}
      <Footer onSelectTab={store.setActiveTab} />
    </div>
  );
}
