import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anaya & Arjun | A beautiful beginning",
  description: "A cinematic wedding invitation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
