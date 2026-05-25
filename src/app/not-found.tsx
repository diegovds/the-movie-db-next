import { Metadata } from 'next'
import Link from 'next/link'
import TagH2 from './components/TagH2'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}

export default function NotFound() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="cinema-panel max-w-lg rounded-lg p-8 text-center">
        <TagH2 className="mt-0">404</TagH2>
        <h1 className="mt-2 text-4xl font-black text-white">
          Página não encontrada
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Não conseguimos encontrar o recurso solicitado.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition-transform hover:scale-[1.02]"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
