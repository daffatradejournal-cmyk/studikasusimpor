import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { order_id, transaction_status } = payload;

    // Simulate Midtrans Webhook Callback
    return NextResponse.json({
      status: 'success',
      message: `Midtrans webhook callback accepted for Order ${order_id}. Transaction status updated to: ${transaction_status}`,
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Invalid Midtrans callback signature.' },
      { status: 400 }
    );
  }
}
