import { Person } from '@/types/Persons'
import { fetchTmdb } from '@/utils/tmdb'
import ApiState from '../components/ApiState'
import GridColumns from '../components/GridColumns'
import InfoCard from '../components/InfoCard'
import Pagination from '../components/Pagination'
import TagH2 from '../components/TagH2'

interface ResponseProps {
  results: Person[]
  total_pages: number
  total_results: number
}

type Props = {
  searchParams: Promise<{ page: number | undefined }>
}

const PersonPage = async ({ searchParams }: Props) => {
  const { page } = await searchParams

  const data = await fetchTmdb<ResponseProps>(
    `https://api.themoviedb.org/3/person/popular?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}`,
  )

  if (!data) return <ApiState />

  return (
    <div className="w-full">
      <section className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end">
        <div>
          <TagH2 className="mt-0">Artistas</TagH2>
          <h1 className="mt-2 text-4xl font-black leading-none text-white md:text-6xl">
            Rostos essenciais
          </h1>
        </div>
        <p className="max-w-md text-sm leading-6 text-[var(--muted)] md:text-right">
          Pessoas em destaque no cinema e na TV, com biografia e produções
          conhecidas.
        </p>
      </section>
      <GridColumns page={true}>
        {data.results.map((person) => (
          <InfoCard key={person.id} person={person} />
        ))}
      </GridColumns>
      <Pagination totalPages={data.total_pages} person={data.results} />
    </div>
  )
}

export default PersonPage
