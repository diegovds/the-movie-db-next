import Anchor from '@/app/components/Anchor'
import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import Pagination from '@/app/components/Pagination'
import TagH2 from '@/app/components/TagH2'
import { Person } from '@/types/Persons'
import { fetchTmdb } from '@/utils/tmdb'
import ApiState from '@/app/components/ApiState'

interface ResponseProps {
  results: Person[]
  total_pages: number
  total_results: number
}

type Props = {
  params: Promise<{ query: string }>
  searchParams: Promise<{ page: number | undefined }>
}

const SearchPersonPage = async ({ params, searchParams }: Props) => {
  const { query } = await params
  const { page } = await searchParams
  const decodedQuery = decodeURIComponent(query)

  const data = await fetchTmdb<ResponseProps>(
    `https://api.themoviedb.org/3/search/person?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}&query=${query}`,
  )

  if (!data) return <ApiState />

  return (
    <div className="w-full">
      <section className="mb-6 border-b border-white/10 pb-5">
        <TagH2 className="mt-0">Busca em artistas</TagH2>
        <h1 className="mt-2 text-4xl font-black leading-none text-white md:text-6xl">
          {decodedQuery}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
          <span>Pesquisar também em</span>
          <Anchor
            href={`/search/movie/${query}`}
            className="rounded-full bg-white/[0.07] px-3 py-1 text-sm font-black text-[var(--cyan)] md:text-sm"
          >
            Filmes
          </Anchor>
          <Anchor
            href={`/search/tv/${query}`}
            className="rounded-full bg-white/[0.07] px-3 py-1 text-sm font-black text-[var(--gold)] md:text-sm"
          >
            Séries
          </Anchor>
        </div>
      </section>
      <GridColumns page={true}>
        {data.results.map((person) => (
          <InfoCard key={person.id} person={person} />
        ))}
      </GridColumns>
      <Pagination
        totalPages={data.total_pages}
        personSearch={data.results}
        query={query}
      />
    </div>
  )
}

export default SearchPersonPage
