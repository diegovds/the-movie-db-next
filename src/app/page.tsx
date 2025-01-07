import { Movie } from '@/types/Movies'
import Image from 'next/image'
import Link from 'next/link'

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
        <Link
          className="max-w-[150px] md:max-w-[200px]"
          key={movie.id}
          href={`/movie/${movie.id}`}
        >
          <div className="relative h-[250px] md:h-[300px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster"
              priority
              quality={100}
              fill
            />
          </div>
          <h2 className="text-ellipsis text-center">{movie.title}</h2>
        </Link>
      ))}
    </div>
  )
}

export default Home
