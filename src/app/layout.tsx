import type { Metadata } from 'next'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Movie BD NextJS',
  description: '.........',
  openGraph: {
    title: 'The Movie BD NextJS',
    description: '.........',
    images: [''],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-dvh flex-col antialiased">
        <Navbar />
        <main className="flex flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
