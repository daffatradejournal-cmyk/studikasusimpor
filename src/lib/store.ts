'use client';

import { useState, useEffect } from 'react';
import { Commodity, CartItem, Order, ShippingRoute, UmkmAnalytics, CategoryId } from './types';
import { INITIAL_COMMODITIES, INITIAL_ORDERS, INITIAL_SHIPPING_ROUTES, INITIAL_ANALYTICS } from './mockData';

const STORAGE_KEY_COMMODITIES = 'pasartembilahan_commodities_v1';
const STORAGE_KEY_CART = 'pasartembilahan_cart_v1';
const STORAGE_KEY_ORDERS = 'pasartembilahan_orders_v1';

export function usePasarStore() {
  const [commodities, setCommodities] = useState<Commodity[]>(INITIAL_COMMODITIES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [shippingRoutes] = useState<ShippingRoute[]>(INITIAL_SHIPPING_ROUTES);
  const [analytics, setAnalytics] = useState<UmkmAnalytics>(INITIAL_ANALYTICS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'katalog' | 'dashboard' | 'ongkir' | 'arsitektur' | 'sql'>('katalog');
  const [selectedProduct, setSelectedProduct] = useState<Commodity | null>(null);
  const [activePaymentOrder, setActivePaymentOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedComm = localStorage.getItem(STORAGE_KEY_COMMODITIES);
      if (savedComm) setCommodities(JSON.parse(savedComm));

      const savedCart = localStorage.getItem(STORAGE_KEY_CART);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {
      // fallback to initial mock
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (commodity: Commodity, quantity = 1) => {
    if (commodity.currentStock < quantity) {
      showToast(`⚠️ Stok ${commodity.name} tidak mencukupi (sisa ${commodity.currentStock} ${commodity.unit})`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.commodity.id === commodity.id);
      let updated: CartItem[];
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > commodity.currentStock) {
          showToast(`⚠️ Jumlah melebihi stok tersedia (${commodity.currentStock} ${commodity.unit})`);
          return prev;
        }
        updated = prev.map((item) =>
          item.commodity.id === commodity.id ? { ...item, quantity: newQty } : item
        );
      } else {
        updated = [...prev, { commodity, quantity }];
      }
      try {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    showToast(`🛒 Ditambahkan ke keranjang: ${quantity} ${commodity.unit} ${commodity.name}`);
  };

  const updateCartQuantity = (commodityId: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.commodity.id === commodityId) {
            const nextQty = item.quantity + delta;
            if (nextQty > item.commodity.currentStock) {
              showToast(`⚠️ Melebihi stok tersedia (${item.commodity.currentStock})`);
              return item;
            }
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      try {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeFromCart = (commodityId: string) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i.commodity.id !== commodityId);
      try {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('🗑️ Item dihapus dari keranjang belanja');
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(STORAGE_KEY_CART);
    } catch {}
  };

  // Restock for UMKM Dashboard
  const restockCommodity = (commodityId: string, amount: number) => {
    setCommodities((prev) => {
      const updated = prev.map((item) => {
        if (item.id === commodityId) {
          const newStock = item.currentStock + amount;
          return {
            ...item,
            currentStock: newStock,
            status: (newStock > item.minimumStockThreshold ? 'active' : 'low_stock') as Commodity['status'],
          };
        }
        return item;
      });
      try {
        localStorage.setItem(STORAGE_KEY_COMMODITIES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(`📦 Restock sukses: +${amount} unit komoditas dicatat ke gudang`);
  };

  // Create Order from Checkout
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-INHIL-${timestamp}`,
      createdAt: new Date().toLocaleString('id-ID'),
    };

    // Deduct stock
    setCommodities((prev) => {
      const updated = prev.map((comm) => {
        const orderedItem = newOrder.items.find((i) => i.commodityId === comm.id);
        if (orderedItem) {
          const newStock = Math.max(0, comm.currentStock - orderedItem.quantity);
          return {
            ...comm,
            currentStock: newStock,
            soldCount: comm.soldCount + orderedItem.quantity,
            status: (newStock === 0 ? 'out_of_stock' : newStock <= comm.minimumStockThreshold ? 'low_stock' : 'active') as Commodity['status'],
          };
        }
        return comm;
      });
      try {
        localStorage.setItem(STORAGE_KEY_COMMODITIES, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Update Analytics dynamically
    setAnalytics((prev) => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      totalRevenue: prev.totalRevenue + newOrder.totalAmount,
    }));

    clearCart();
    setIsCartOpen(false);
    setActivePaymentOrder(newOrder);
    return newOrder;
  };

  // Settle Midtrans Payment
  const completeMidtransPayment = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            paymentStatus: 'paid' as const,
            fulfillmentStatus: ord.transportMode === 'river_water' ? ('shipped_river' as const) : ('processing' as const),
          };
        }
        return ord;
      });
      try {
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setActivePaymentOrder(null);
    showToast('✅ Pembayaran Midtrans Terverifikasi Otomatis! Notifikasi dikirim ke Koperasi/Petani.');
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['fulfillmentStatus']) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, fulfillmentStatus: newStatus };
        }
        return ord;
      });
      try {
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(`🔄 Status pesanan diperbarui menjadi: ${newStatus}`);
  };

  // Reset to initial mock data
  const resetDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_COMMODITIES);
      localStorage.removeItem(STORAGE_KEY_CART);
      localStorage.removeItem(STORAGE_KEY_ORDERS);
    } catch {}
    setCommodities(INITIAL_COMMODITIES);
    setCart([]);
    setOrders(INITIAL_ORDERS);
    setAnalytics(INITIAL_ANALYTICS);
    showToast('🔄 Data simulasi berhasil direset ke status awal');
  };

  return {
    commodities,
    cart,
    orders,
    shippingRoutes,
    analytics,
    selectedCategory,
    searchQuery,
    isCartOpen,
    activeTab,
    selectedProduct,
    activePaymentOrder,
    toastMessage,
    setSelectedCategory,
    setSearchQuery,
    setIsCartOpen,
    setActiveTab,
    setSelectedProduct,
    setActivePaymentOrder,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    restockCommodity,
    createOrder,
    completeMidtransPayment,
    updateOrderStatus,
    resetDemoData,
    showToast,
  };
}
