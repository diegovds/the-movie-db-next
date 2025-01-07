import Image from 'next/image'

export interface MovieProps {
  id: number
  title: string
  poster_path: string
}

interface ResponseProps {
  results: MovieProps[]
}

const Home = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${process.env.THE_MOVIE_DB}`,
    {
      next: {
        revalidate: 0,
      },
    },
  )
  const data: ResponseProps = await response.json()

  return (
    <div className="m-auto grid w-max grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
      {data.results.map((movie) => (
        <div className="max-w-[150px] md:max-w-[200px]" key={movie.id}>
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
        </div>
      ))}
    </div>
  )
}

export default Home
