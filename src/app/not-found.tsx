import { Metadata } from 'next'
import Link from 'next/link'
import TagH2 from './components/TagH2'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="rounded-md bg-[#131313] p-7 text-center">
        <TagH2 className="mt-0">404 - Página não encontrada</TagH2>
        <p className="mt-2 text-sm text-gray-300">
          Não conseguimos encontrar o recurso solicitado.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-blue-600 px-2 py-2 text-sm text-gray-100 transition-colors hover:bg-blue-700"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
