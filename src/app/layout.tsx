import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

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
    <html lang="pt-BR" className={`${poppins.className} bg-gray-100`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <Navbar />
        <main className="flex flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
