import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arjun & Ananya | Our Forever",
  description: "A love story, unfolding into an invitation."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
