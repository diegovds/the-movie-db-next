import { Serie } from '@/types/Series'
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

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}`,
    {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    },
  )
  const data: ResponseProps = await response.json()

  return (
    <div className="w-full">
      <TagH2 className="mb-3 ml-6 mt-0">Séries populares:</TagH2>
      <GridColumns className="px-6" page={true}>
        {data.results.map((serie) => (
          <InfoCard key={serie.id} serie={serie} />
        ))}
      </GridColumns>
      <Pagination totalPages={data.total_pages} serie={data.results} />
    </div>
  )
}

export default TvPage
