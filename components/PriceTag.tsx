"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

export default function PriceTag({ 
  current, 
  original, 
  currency = "₦" 
}: { 
  current: number; 
  original?: number; 
  currency?: string;
}) {
  const discount = original ? Math.round(((original - current) / original) * 100) : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
        {currency}{current.toLocaleString()}
      </span>
      {original && original > current && (
        <>
          <span className="text-lg text-gray-400 line-through">
            {currency}{original.toLocaleString()}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
}
