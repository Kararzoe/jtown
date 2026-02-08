"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link href="/" className="flex items-center gap-1 hover:text-primary-600">
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {i === items.length - 1 ? (
            <span className="font-semibold text-gray-900 dark:text-white">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-primary-600">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
