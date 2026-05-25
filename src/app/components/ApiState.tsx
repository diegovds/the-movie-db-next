import Link from 'next/link'
import TagH2 from './TagH2'

type ApiStateProps = {
  title?: string
  description?: string
}

const ApiState = ({
  title = 'Não foi possível carregar os dados',
  description = 'A conexão com o The Movie Database falhou agora. Tente recarregar a página em alguns instantes.',
}: ApiStateProps) => {
  return (
    <div className="flex w-full items-center justify-center py-14">
      <div className="cinema-panel max-w-xl rounded-lg p-8 text-center">
        <TagH2 className="mt-0">TMDB indisponível</TagH2>
        <h1 className="mt-2 text-3xl font-black text-white">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          {description}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition-transform hover:scale-[1.02]"
        >
          Voltar para filmes
        </Link>
      </div>
    </div>
  )
}

export default ApiState
