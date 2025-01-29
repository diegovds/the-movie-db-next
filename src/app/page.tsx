import { Movie } from '@/types/Movies'
import GridColumns from './components/GridColumns'
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
    <GridColumns>
      {data.results.map((movie) => (
        <InfoCard key={movie.id} movie={movie} />
      ))}
    </GridColumns>
  )
}

export default Home
