'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Clock,
  QrCode,
  Building,
  CreditCard,
  Check,
} from 'lucide-react';
import { Order } from '../lib/types';

interface MidtransModalProps {
  order: Order | null;
  onClose: () => void;
  onPaymentSuccess: (orderId: string) => void;
}

export const MidtransModal: React.FC<MidtransModalProps> = ({
  order,
  onClose,
  onPaymentSuccess,
}) => {
  if (!order) return null;

  const [paymentType, setPaymentType] = useState<'qris' | 'va_brk' | 'va_bca' | 'va_mandiri'>('qris');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getVaNumber = () => {
    switch (paymentType) {
      case 'va_brk':
        return `1140 8829 ${order.id.slice(-6)}`;
      case 'va_bca':
        return `7000 1289 ${order.id.slice(-6)}`;
      case 'va_mandiri':
        return `8870 0941 ${order.id.slice(-6)}`;
      default:
        return `1140 8829 ${order.id.slice(-6)}`;
    }
  };

  const handleCopyVa = () => {
    navigator.clipboard.writeText(getVaNumber().replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(order.id);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#000000]/60 backdrop-blur-2xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-xs shadow-shopee-hover border border-[#CCCCCC] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Midtrans Snap Header */}
        <div className="bg-[#EE4D2D] text-white p-3.5 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xs bg-white text-[#EE4D2D] font-bold text-sm flex items-center justify-center shadow-xs">
              PT
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-titillium font-bold text-sm">Midtrans Snap Gateway</h3>
                <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.2 rounded-xs font-mono">
                  SANDBOX
                </span>
              </div>
              <p className="text-[10px] text-white/90">
                Merchant: PasarTembilahan Hub Indragiri Hilir
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xs bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Amount Banner */}
        <div className="p-4 bg-[#FAFAFA] border-b border-[#CCCCCC]/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#555555] font-semibold block uppercase">
              Total Pembayaran
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#EE4D2D]">
              Rp {order.grandTotal.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#5A5A5A] block font-mono">No. Pesanan</span>
            <span className="text-xs font-mono font-bold text-[#222222]">
              {order.orderNumber}
            </span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs font-bold text-[#222222] block mb-1.5">
              Pilih Metode Pembayaran:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                onClick={() => setPaymentType('qris')}
                className={`p-2 rounded-xs border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                  paymentType === 'qris'
                    ? 'border-[#EE4D2D] bg-[#FACAC0]/25 text-[#EE4D2D]'
                    : 'border-[#CCCCCC] hover:border-[#EE4D2D]/60 text-[#555555]'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#EE4D2D]" />
                <span>QRIS Instan</span>
              </button>
              <button
                onClick={() => setPaymentType('va_brk')}
                className={`p-2 rounded-xs border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                  paymentType === 'va_brk'
                    ? 'border-[#EE4D2D] bg-[#FACAC0]/25 text-[#EE4D2D]'
                    : 'border-[#CCCCCC] hover:border-[#EE4D2D]/60 text-[#555555]'
                }`}
              >
                <Building className="w-4 h-4 text-[#00BFA5]" />
                <span>BRK Syariah</span>
              </button>
              <button
                onClick={() => setPaymentType('va_bca')}
                className={`p-2 rounded-xs border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                  paymentType === 'va_bca'
                    ? 'border-[#EE4D2D] bg-[#FACAC0]/25 text-[#EE4D2D]'
                    : 'border-[#CCCCCC] hover:border-[#EE4D2D]/60 text-[#555555]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#066BC8]" />
                <span>BCA VA</span>
              </button>
              <button
                onClick={() => setPaymentType('va_mandiri')}
                className={`p-2 rounded-xs border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                  paymentType === 'va_mandiri'
                    ? 'border-[#EE4D2D] bg-[#FACAC0]/25 text-[#EE4D2D]'
                    : 'border-[#CCCCCC] hover:border-[#EE4D2D]/60 text-[#555555]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#FFCE3D]" />
                <span>Mandiri Bill</span>
              </button>
            </div>
          </div>

          {/* Active Payment Details */}
          {paymentType === 'qris' ? (
            <div className="bg-[#FAFAFA] border border-[#CCCCCC]/60 rounded-xs p-4 text-center space-y-2">
              <span className="text-xs font-semibold text-[#222222] block">
                Pindai QRIS Menggunakan ShopeePay, GoPay, BCA, OVO, atau Dana
              </span>

              {/* QR Mock */}
              <div className="inline-block p-3 bg-white rounded-xs shadow-2xs border border-[#CCCCCC]">
                <svg
                  className="w-36 h-36 text-[#222222] mx-auto"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" rx="1" stroke="black" strokeWidth="4" />
                  <rect x="17" y="17" width="11" height="11" fill="black" />
                  <rect x="65" y="10" width="25" height="25" rx="1" stroke="black" strokeWidth="4" />
                  <rect x="72" y="17" width="11" height="11" fill="black" />
                  <rect x="10" y="65" width="25" height="25" rx="1" stroke="black" strokeWidth="4" />
                  <rect x="17" y="72" width="11" height="11" fill="black" />
                  <rect x="42" y="12" width="6" height="6" fill="black" />
                  <rect x="52" y="16" width="6" height="6" fill="black" />
                  <rect x="42" y="26" width="16" height="6" fill="black" />
                  <rect x="12" y="44" width="8" height="6" fill="black" />
                  <rect x="25" y="48" width="12" height="6" fill="black" />
                  <rect x="45" y="42" width="10" height="10" fill="black" />
                  <rect x="62" y="44" width="16" height="6" fill="black" />
                  <rect x="82" y="48" width="6" height="10" fill="black" />
                  <rect x="42" y="64" width="12" height="8" fill="black" />
                  <rect x="60" y="66" width="12" height="6" fill="black" />
                  <rect x="78" y="68" width="8" height="8" fill="black" />
                  <rect x="50" y="78" width="14" height="8" fill="black" />
                  <rect x="70" y="80" width="18" height="8" fill="black" />
                </svg>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-[#555555]">
                <Clock className="w-3.5 h-3.5 text-[#EE4D2D]" />
                <span>Batas waktu pembayaran: 14 menit 59 detik</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#FAFAFA] border border-[#CCCCCC]/60 rounded-xs p-4 space-y-2">
              <span className="text-xs text-[#555555] block">
                Nomor Virtual Account Terverifikasi:
              </span>
              <div className="flex items-center justify-between p-2.5 bg-white rounded-xs border border-[#CCCCCC] font-mono">
                <span className="text-base font-bold text-[#222222] tracking-wider">
                  {getVaNumber()}
                </span>
                <button
                  onClick={handleCopyVa}
                  className="px-2 py-1 rounded-xs bg-[#F5F5F5] hover:bg-[#CCCCCC] text-[#222222] text-xs font-semibold flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#00BFA5]" />
                      <span className="text-[#00BFA5]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#5A5A5A]">
                Pembayaran akan diverifikasi otomatis oleh webhook dalam hitungan detik.
              </p>
            </div>
          )}

          {/* Action Simulation Button */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={handleSimulateSuccess}
              disabled={isProcessing}
              className="w-full py-2.5 rounded-xs bg-[#EE4D2D] hover:bg-[#F05D40] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memproses Webhook Midtrans...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulasikan Pembayaran Berhasil (HTTP 200)</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[#5A5A5A]">
              Menstimulasikan Midtrans Callback URL: `/api/payment`
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
