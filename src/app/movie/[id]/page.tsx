import { Movie } from '@/types/Movies'
import { dateFormatting, genresList, runtime } from '@/utils/functions'
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
    <div className="w-full">
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
        <div className="flex flex-col items-center gap-2 pt-6 text-white md:flex-[2] md:items-start md:pl-6 md:pt-0">
          <h2 className="text-balance text-center text-4xl font-bold md:text-5xl">
            {data.title}
          </h2>
          <div className="flex flex-col items-center gap-2 text-lg md:flex-row">
            <p>{dateFormatting(data.release_date)}</p>
            <div className="mx-0 my-auto hidden h-[6px] w-[6px] rounded-[999px] bg-white md:block" />
            <p>{genresList(data.genres)}</p>
            <div className="mx-0 my-auto hidden h-[6px] w-[6px] rounded-[999px] bg-white md:block" />
            <p>{runtime(data.runtime)}</p>
          </div>
          <h3 className="text-4xl font-bold md:text-5xl">Sinopse</h3>
          <p className="text-center text-base md:text-left">{data.overview}</p>
          {data.videos.results.length > 0 && (
            <>
              <h3 className="text-4xl font-bold md:text-5xl">Trailer</h3>
              <iframe
                width="100%"
                className="aspect-video"
                src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default MoviePage
