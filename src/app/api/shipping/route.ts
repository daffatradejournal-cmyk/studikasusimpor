import { NextResponse } from 'next/server';
import { INITIAL_SHIPPING_ROUTES } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const { weightKg, originDistrict, destinationArea } = await request.json();
    const weight = Math.max(1, Number(weightKg) || 1);

    const calculations = INITIAL_SHIPPING_ROUTES.map((route) => {
      const totalCost = route.baseCost + (weight - 1) * route.costPerKg;
      return {
        routeId: route.id,
        courierName: route.courierName,
        serviceType: route.serviceType,
        transportMode: route.transportMode,
        transportLabel: route.transportLabel,
        estimatedDays: route.estimatedDays,
        baseCost: route.baseCost,
        costPerKg: route.costPerKg,
        weightKg: weight,
        totalCost,
      };
    });

    return NextResponse.json({
      status: 'success',
      query: { originDistrict, destinationArea, weightKg: weight },
      estimates: calculations,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Gagal menghitung estimasi ongkos kirim.' },
      { status: 400 }
    );
  }
}
