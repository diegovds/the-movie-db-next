import { Serie } from '@/types/Series'
import { fetchTmdb } from '@/utils/tmdb'
import ApiState from '../components/ApiState'
import GridColumns from '../components/GridColumns'
import InfoCard from '../components/InfoCard'
import Pagination from '../components/Pagination'
import TagH2 from '../components/TagH2'

interface ResponseProps {
  results: Serie[]
  total_pages: number
  total_results: number
}

type Props = {
  searchParams: Promise<{ page: number | undefined }>
}

const TvPage = async ({ searchParams }: Props) => {
  const { page } = await searchParams

  const data = await fetchTmdb<ResponseProps>(
    `https://api.themoviedb.org/3/trending/tv/week?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}`,
  )

  if (!data) return <ApiState />

  return (
    <div className="w-full">
      <section className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end">
        <div>
          <TagH2 className="mt-0">Séries</TagH2>
          <h1 className="mt-2 text-4xl font-black leading-none text-white md:text-6xl">
            Histórias em alta
          </h1>
        </div>
        <p className="max-w-md text-sm leading-6 text-[var(--muted)] md:text-right">
          Séries mais comentadas da semana, de estreias a maratonas de
          prestígio.
        </p>
      </section>
      <GridColumns page={true}>
        {data.results.map((serie) => (
          <InfoCard key={serie.id} serie={serie} />
        ))}
      </GridColumns>
      <Pagination totalPages={data.total_pages} serie={data.results} />
    </div>
  )
}

export default TvPage
