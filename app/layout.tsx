import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav, MobileTabBar, Footer } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PrigeeX · Elevate DeFi Investments",
  description:
    "Tokenize. Trade. Thrive. PrigeeX is an ultra-low-fee DEX and rewards protocol for tokenized real-world assets. Secure, audited, non-custodial.",
  keywords: [
    "PrigeeX", "PGX", "DeFi", "RWA", "tokenization", "staking",
    "non-custodial", "DEX", "yield",
  ],
  openGraph: {
    title: "PrigeeX · Elevate DeFi Investments",
    description:
      "Tokenize. Trade. Thrive. Ultra-low-fee DEX and rewards protocol for tokenized real-world assets.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#071D49",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <Nav />
          <div className="app-shell">{children}</div>
          <Footer />
          <MobileTabBar />
        </Providers>
      </body>
    </html>
  );
}
