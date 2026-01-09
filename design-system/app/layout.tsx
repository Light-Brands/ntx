import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'VIBEUP Design Spec Dashboard',
  description: 'Comprehensive design specification and development dashboard for the VIBEUP platform - Your Energy Is Your Edge',
  keywords: ['VIBEUP', 'design spec', 'documentation', 'dashboard', 'consciousness', 'platform'],
  authors: [{ name: 'VIBEUP Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

