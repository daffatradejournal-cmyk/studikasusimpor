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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="leaf-header-bg text-white p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-emerald-700 font-extrabold text-sm flex items-center justify-center shadow-xs">
              PT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-wide">Midtrans Snap Payment Gateway</h3>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                  SANDBOX
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">
                Merchant: PasarTembilahan Hub Indragiri Hilir
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Amount Banner */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">
              Total Pembayaran
            </span>
            <span className="text-2xl font-black text-emerald-700">
              Rp {order.grandTotal.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-mono">No. Pesanan</span>
            <span className="text-xs font-mono font-bold text-slate-800">
              {order.orderNumber}
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-2">
              Pilih Metode Pembayaran Otomatis:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setPaymentType('qris')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                  paymentType === 'qris'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 hover:border-emerald-300 text-slate-600 bg-white'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>QRIS Instan</span>
              </button>
              <button
                onClick={() => setPaymentType('va_brk')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                  paymentType === 'va_brk'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 hover:border-emerald-300 text-slate-600 bg-white'
                }`}
              >
                <Building className="w-4 h-4 text-teal-600" />
                <span>BRK Syariah</span>
              </button>
              <button
                onClick={() => setPaymentType('va_bca')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                  paymentType === 'va_bca'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 hover:border-emerald-300 text-slate-600 bg-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span>BCA VA</span>
              </button>
              <button
                onClick={() => setPaymentType('va_mandiri')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                  paymentType === 'va_mandiri'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 hover:border-emerald-300 text-slate-600 bg-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>Mandiri Bill</span>
              </button>
            </div>
          </div>

          {/* Active Payment View */}
          {paymentType === 'qris' ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2.5">
              <span className="text-xs font-bold text-slate-800 block">
                Pindai QRIS Menggunakan ShopeePay, GoPay, BCA Mobile, OVO, atau Dana
              </span>

              {/* QR Mock */}
              <div className="inline-block p-3.5 bg-white rounded-2xl shadow-xs border border-slate-200">
                <svg
                  className="w-36 h-36 text-slate-900 mx-auto"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" rx="2" stroke="black" strokeWidth="4" />
                  <rect x="17" y="17" width="11" height="11" fill="black" />
                  <rect x="65" y="10" width="25" height="25" rx="2" stroke="black" strokeWidth="4" />
                  <rect x="72" y="17" width="11" height="11" fill="black" />
                  <rect x="10" y="65" width="25" height="25" rx="2" stroke="black" strokeWidth="4" />
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

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Batas waktu pembayaran: 14 menit 59 detik</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <span className="text-xs text-slate-500 font-semibold block">
                Nomor Virtual Account Terverifikasi:
              </span>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 font-mono">
                <span className="text-base font-bold text-slate-900 tracking-wider">
                  {getVaNumber()}
                </span>
                <button
                  onClick={handleCopyVa}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Pembayaran akan diverifikasi secara otomatis oleh sistem webhook.
              </p>
            </div>
          )}

          {/* Action Simulation Button */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleSimulateSuccess}
              disabled={isProcessing}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memproses Webhook Midtrans...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulasikan Pembayaran Berhasil (HTTP 200)</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Menstimulasikan Midtrans Callback URL: `/api/payment`
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
