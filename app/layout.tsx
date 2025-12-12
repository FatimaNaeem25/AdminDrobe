import type { Metadata } from 'next'
import React from 'react'
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'DrobeAI',
  description: 'Admin dashboard for DrobeAI',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}

