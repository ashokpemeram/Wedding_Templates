import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Noto_Serif_Telugu } from "next/font/google";
import { SmoothScrollProvider } from "@/lib/SmoothScroll";
import { wedding } from "@/data/wedding";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const telugu = Noto_Serif_Telugu({
  subsets: ["telugu"],
  weight: ["400", "600"],
  variable: "--font-telugu",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${wedding.groom.name} & ${wedding.bride.name} — Our Forever`,
  description: `Two strangers, one beautiful journey. Join ${wedding.groom.name} and ${wedding.bride.name} as they begin their forever.`,
  openGraph: {
    title: `${wedding.groom.name} & ${wedding.bride.name} — Our Forever`,
    description: "Every love story has a beginning. Here is ours.",
    url: wedding.siteUrl,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${telugu.variable}`}>
      <body className="bg-ink text-jasmine font-body antialiased selection:bg-gold/30 selection:text-ivory">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
