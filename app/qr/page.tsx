'use client';

import { QRCodeSVG } from 'qrcode.react';

export default function QRPage() {
  const siteUrl = 'https://jos-marketplace.vercel.app';

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <img src="/photo_2026-05-10_20-15-35.jpg" alt="JosMKT" className="w-20 h-20 rounded-2xl object-cover" />
        <h1 className="text-3xl font-bold text-gray-900">Jos Marketplace</h1>
        <p className="text-gray-600">Scan this QR code to visit our marketplace</p>
        <QRCodeSVG
          value={siteUrl}
          size={300}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin
        />
        <p className="text-sm text-gray-500">{siteUrl}</p>
        <p className="text-xs text-gray-400">Right-click the QR code and save as image for your flyer</p>
      </div>
    </div>
  );
}
