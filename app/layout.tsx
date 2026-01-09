import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'NeuroTracker X - Enhancing Humans',
  description: 'The cognitive training system trusted by elite performers worldwide. 6 minutes. Measurable results.',
  keywords: ['NeuroTracker', 'cognitive training', 'brain training', 'performance', 'focus', 'attention'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#0A0A0A] font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
