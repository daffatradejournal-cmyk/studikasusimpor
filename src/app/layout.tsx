import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PasarTembilahan — Platform E-Commerce & Rantai Distribusi Komoditas UMKM Indragiri Hilir',
  description: 'Marketplace komoditas kelapa, perkebunan gambut, dan UMKM Indragiri Hilir (UNISI Studi Kasus) dengan Shopee Design System, kalkulator logistik perairan sungai, dan Midtrans Payment Gateway.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Titillium+Web:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#F5F5F5] text-[#222222] font-sans">
        {children}
      </body>
    </html>
  );
}
