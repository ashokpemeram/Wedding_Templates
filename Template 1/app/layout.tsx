import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arjun & Priya — Wedding Invitation',
  description:
    'You are warmly invited to celebrate the wedding of Arjun Kumar & Priya Sharma. October 25, 2026.',
  openGraph: {
    title: 'Arjun & Priya — Wedding Invitation',
    description:
      'Join us to celebrate the sacred union of Arjun & Priya on October 25, 2026.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Arjun & Priya Wedding Invitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arjun & Priya — Wedding Invitation',
    description: 'Join us to celebrate the sacred union of Arjun & Priya.',
    images: ['/images/og-cover.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Fonts are loaded in globals.css */}
      </head>
      <body className="font-body bg-cream antialiased">{children}</body>
    </html>
  )
}
