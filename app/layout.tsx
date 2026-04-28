import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import PlateauBackground from "@/components/PlateauBackground";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "JosMKT — Business Visibility & Promotions in Jos",
  description: "Grow your business visibility, get promoted, and reach thousands of buyers in Jos, Plateau State",
  manifest: "/manifest.json",
  themeColor: "#10b981",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={poppins.className}>
        <AuthProvider>
          <CartProvider>
            <LanguageProvider>
              <PlateauBackground />
              <div className="relative z-10">{children}</div>
            </LanguageProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
