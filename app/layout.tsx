import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/ui/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cek Data',
  description: 'Cek Data sesuai anda inginkan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
            {children}
      </body>
    </html>
  )
}
