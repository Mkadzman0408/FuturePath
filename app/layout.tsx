import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'FuturePath 🧭 | Gamified Student Career Advisory & Booking',
  description:
    'Friction-free, approachable, and gamified appointment booking system for students and young teenagers seeking consultation and educational guidance.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
