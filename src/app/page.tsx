import { Movie } from '@/types/Movies'
import Link from 'next/link'
import GridColumns from './components/GridColumns'
import InfoCard from './components/InfoCard'

interface ResponseProps {
  results: Movie[]
  total_pages: number
  total_results: number
}

type Props = {
  searchParams: Promise<{ page: number | undefined }>
}

const Home = async ({ searchParams }: Props) => {
  const { page } = await searchParams

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}`,
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
      <GridColumns>
        {data.results.map((movie) => (
          <InfoCard key={movie.id} movie={movie} />
        ))}
      </GridColumns>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Link key={index} href={`/?page=${index + 1}`}>
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
