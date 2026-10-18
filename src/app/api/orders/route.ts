import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    total: INITIAL_ORDERS.length,
    data: INITIAL_ORDERS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);

    const newOrder = {
      ...body,
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-INHIL-${timestamp}`,
      createdAt: new Date().toLocaleString('id-ID'),
      paymentStatus: 'unpaid',
      fulfillmentStatus: 'pending',
    };

    return NextResponse.json(
      {
        status: 'success',
        message: 'Pesanan komoditas berhasil dibuat. Silakan lanjutkan ke Midtrans Payment Gateway.',
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Gagal memproses pesanan komoditas.' },
      { status: 400 }
    );
  }
}
