import { Movie } from '@/types/Movies'
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

  const runtime = () => {
    const auxH = Math.floor(data.runtime / 60)
    const auxM = data.runtime % 60
    let h = auxH < 10 ? '0' + auxH + 'h' : auxH + 'h'
    let m = auxM < 10 ? '0' + auxM + 'min' : auxM + 'min'
    if (h === '00h') h = ''
    if (m === '00min') m = ''
    return `${h} ${m}`
  }

  return (
    <div className="relative w-full overflow-hidden md:min-h-[600px]">
      <section
        className="absolute inset-0 z-[-1] flex flex-col p-6 md:flex-row"
        style={{
          background: `linear-gradient(to right, rgb(16, 14, 14) 150px, rgba(16, 14, 14, 0.84) 100%), url(https://image.tmdb.org/t/p/original${data.backdrop_path}) no-repeat center/cover`,
        }}
      >
        <div className="relative h-[300px] flex-1 md:h-full">
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt="poster"
            priority
            quality={100}
            fill
          />
        </div>
        <div className="flex-[2] pl-6 text-white">
          <h2>{data.title}</h2>
          <p>{data.release_date}</p>
          <ul>
            {data.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p>{runtime()}</p>
          <p>{data.overview}</p>
        </div>
      </section>
    </div>
  )
}

export default MoviePage
