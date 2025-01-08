import { Movie } from '@/types/Movies'
import { dateFormatting, runtime } from '@/utils/functions'
import { Metadata } from 'next'
import Image from 'next/image'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=videos,external_ids,recommendations,keywords,credits`,
  )
  const data: Movie = await response.json()

  return {
    title: `The Movie BD NextJS - ${data.title}`,
    description: `${data.overview}`,
    openGraph: {
      title: `The Movie BD NextJS - ${data.title}`,
      description: `${data.overview}`,
      images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
    },
  }
}

const MoviePage = async ({ params }: Props) => {
  const { id } = await params

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=videos,external_ids,recommendations,keywords,credits`,
    {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    },
  )
  const data: Movie = await response.json()

  return (
    <div>
      <section
        className="flex min-h-[600px] flex-col p-6 md:flex-row"
        style={{
          background: `linear-gradient(to right, rgb(16, 14, 14) 150px, rgba(16, 14, 14, 0.84) 100%), url(https://image.tmdb.org/t/p/original${data.backdrop_path}) no-repeat center/cover`,
        }}
      >
        <div className="relative h-[500px] md:h-[600px] md:flex-1">
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt="poster"
            priority
            quality={100}
            fill
            className="rounded-lg"
          />
        </div>
        <div className="pt-6 text-white md:flex-[2] md:pl-6 md:pt-0">
          <h2>{data.title}</h2>
          <p>{dateFormatting(data.release_date)}</p>
          <ul>
            {data.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p>{runtime(data.runtime)}</p>
          <p>{data.overview}</p>
        </div>
      </section>
    </div>
  )
}

export default MoviePage
