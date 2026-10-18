export type CategoryId = 'kelapa' | 'perkebunan' | 'kuliner' | 'kerajinan';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export interface Merchant {
  id: string;
  businessName: string;
  ownerName: string;
  village: string;
  district: string;
  riverDock: string;
  nibNumber: string;
  certifications: string[];
  rating: number;
  totalSalesCount: number;
  phone: string;
  avatarUrl?: string;
}

export interface Commodity {
  id: string;
  merchantId: string;
  merchantName: string;
  district: string;
  categoryId: CategoryId;
  sku: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  unit: string; // 'kg' | 'butir' | 'liter' | 'kemasan 250g' | 'dus'
  minimumOrder: number;
  currentStock: number;
  minimumStockThreshold: number;
  weightGrams: number;
  harvestLocation: string;
  grade: 'Grade Super' | 'Grade A' | 'Grade Ekspor' | 'Khas Inhil';
  isOrganic: boolean;
  imageUrl: string;
  rating: number;
  soldCount: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
}

export interface ShippingRoute {
  id: string;
  courierCode: string;
  courierName: string;
  serviceType: string;
  transportMode: 'river_water' | 'land_road' | 'multimodal';
  transportLabel: string;
  baseCost: number;
  costPerKg: number;
  estimatedDays: string;
  description: string;
  originDistrict: string;
}

export interface CartItem {
  commodity: Commodity;
  quantity: number;
}

export interface OrderItem {
  commodityId: string;
  commodityName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  unit: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  shippingAddress: string;
  destinationDistrict: string;
  selectedCourier: string;
  transportMode: 'river_water' | 'land_road' | 'multimodal';
  items: OrderItem[];
  totalAmount: number;
  shippingCost: number;
  grandTotal: number;
  paymentMethod: string;
  paymentStatus: 'unpaid' | 'paid' | 'expired';
  fulfillmentStatus: 'pending' | 'processing' | 'shipped_river' | 'shipped_land' | 'delivered';
  trackingNumber: string;
  createdAt: string;
}

export interface MidtransPaymentPayload {
  orderId: string;
  grossAmount: number;
  customerDetails: {
    fullName: string;
    phone: string;
    email: string;
  };
  paymentType: 'qris' | 'bca_va' | 'bri_va' | 'mandiri_va' | 'brk_syariah';
}

export interface UmkmAnalytics {
  totalRevenue: number;
  revenueGrowthMonth: number;
  totalOrders: number;
  commoditiesSoldKg: number;
  activePartners: number;
  topCommodities: {
    name: string;
    soldVolume: string;
    revenue: number;
    sharePercent: number;
  }[];
  monthlyRevenue: {
    month: string;
    revenueJuta: number;
    orders: number;
  }[];
  stockAlerts: {
    commodityId: string;
    name: string;
    currentStock: number;
    unit: string;
    threshold: number;
  }[];
}
