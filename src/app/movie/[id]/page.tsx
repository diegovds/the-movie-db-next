import Anchor from '@/app/components/Anchor'
import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import InfoPage from '@/app/components/InfoPage'
import { Movie } from '@/types/Movies'
import { Metadata } from 'next'
import { FaFacebook, FaImdb, FaInstagram, FaTwitter } from 'react-icons/fa'

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
    <div className="w-full flex-col">
      <InfoPage movie={data} />
      <div className="m-6 flex flex-col md:flex-row">
        <div className="md:flex-[2]">
          <h2 className="mb-3 text-balance text-center text-3xl font-bold md:text-wrap md:text-left md:text-4xl">
            Elenco principal
          </h2>
          <GridColumns className="grid-cols-[repeat(auto-fill,_minmax(9.80rem,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(11.43rem,_1fr))]">
            {data.credits.cast.slice(0, 9).map((person) => (
              <InfoCard key={person.id} person={person} />
            ))}
          </GridColumns>
        </div>
        <div className="mt-6 flex justify-center gap-6 md:ml-6 md:mt-0 md:flex-1 md:justify-start">
          <Anchor
            href={`https://www.facebook.com/${data.external_ids.facebook_id}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </Anchor>
          <Anchor
            href={`https://www.instagram.com/${data.external_ids.instagram_id}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </Anchor>
          <Anchor
            href={`https://x.com/${data.external_ids.twitter_id}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </Anchor>
          <Anchor
            href={`https://www.imdb.com/pt/title/${data.external_ids.imdb_id}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaImdb />
          </Anchor>
        </div>
      </div>
    </div>
  )
}

export default MoviePage
