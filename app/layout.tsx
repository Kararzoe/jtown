import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import PlateauBackground from "@/components/PlateauBackground";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "JosMKT — Find Service Providers in Jos, Plateau State Nigeria",
  description: "Find trusted plumbers, electricians, bakers, mechanics and more in Jos. Your #1 platform to discover and hire professional service providers in Plateau State, Nigeria.",
  keywords: "Jos marketplace, service providers Jos, plumber Jos, electrician Jos, Jos Nigeria, Plateau State services, hire professionals Jos",
  manifest: "/manifest.json",
  themeColor: "#059669",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "JosMKT — Find Service Providers in Jos",
    description: "Find trusted plumbers, electricians, bakers, mechanics and more in Jos, Plateau State.",
    url: "https://www.josmkt.com.ng",
    siteName: "JosMKT",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JosMKT — Find Service Providers in Jos",
    description: "Find trusted professionals in Jos, Plateau State Nigeria.",
    creator: "@josMKTPlace",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Analytics />
      </body>
    </html>
  );
}
