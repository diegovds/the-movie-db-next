import type { Metadata, Viewport } from 'next'
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
  title: {
    default: 'The Movie BD',
    template: '%s | The Movie BD',
  },
  description:
    'The Movie BD é uma plataforma com um catálogo de filmes, séries e artistas.',
  openGraph: {
    title: {
      default: 'The Movie BD',
      template: '%s | The Movie BD',
    },
    description:
      'The Movie BD é uma plataforma com um catálogo de filmes, séries e artistas.',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.className} bg-[#272727]`}>
      <body className="antialiased">
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="container mx-auto my-5 flex flex-1 px-3">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
