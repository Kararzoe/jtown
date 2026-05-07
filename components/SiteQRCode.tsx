'use client';

import { QRCodeSVG } from 'qrcode.react';

export default function SiteQRCode({ url = 'http://localhost:3000', size = 200 }: { url?: string; size?: number }) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800">Scan to visit Jos Marketplace</h3>
      <QRCodeSVG
        value={url}
        size={size}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin
      />
      <p className="text-sm text-gray-500">{url}</p>
    </div>
  );
}
