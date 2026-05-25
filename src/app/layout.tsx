import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque as BricolageGrotesque } from 'next/font/google'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'

const bricolage = BricolageGrotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
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
    <html
      lang="pt-BR"
      className={`${bricolage.className} ${bricolage.variable}`}
    >
      <body className="antialiased">
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="container mx-auto flex flex-1 px-3 py-6 sm:px-4 lg:py-9">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
