import { Movie } from '@/types/Movies'
import InfoCard from './components/InfoCard'

interface ResponseProps {
  results: Movie[]
}

const Home = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${process.env.THE_MOVIE_DB}`,
    {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    },
  )
  const data: ResponseProps = await response.json()

  return (
    <div className="mx-auto my-0 grid w-max grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
      {data.results.map((movie) => (
        <InfoCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default Home
