import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SIFEMKLEN | Clean Spaces, Better Living',
  description: 'Cleaning and facility care management for homes, workplaces, and hospitality teams in Abuja.',
  generator: 'SIFEMKLEN',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f5f8f7', userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
