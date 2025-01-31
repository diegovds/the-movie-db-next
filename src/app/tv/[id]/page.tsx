import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import InfoPage from '@/app/components/InfoPage'
import { Serie } from '@/types/Series'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=videos,external_ids,recommendations,keywords,credits`,
  )
  const data: Serie = await response.json()

  return {
    title: `The Movie BD NextJS - ${data.name}`,
    description: `${data.overview}`,
    openGraph: {
      title: `The Movie BD NextJS - ${data.name}`,
      description: `${data.overview}`,
      images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
    },
  }
}

const MoviePage = async ({ params }: Props) => {
  const { id } = await params

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=videos,external_ids,recommendations,keywords,credits`,
    {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    },
  )
  const data: Serie = await response.json()

  return (
    <div className="w-full flex-col">
      <InfoPage serie={data} />
      <div className="m-6 flex flex-col md:flex-row">
        <div className="md:flex-[2]">
          <h2 className="mb-3 text-balance text-center text-2xl font-bold md:text-wrap md:text-left md:text-3xl">
            Elenco principal
          </h2>
          <GridColumns className="md:grid-cols-[repeat(auto-fill,_minmax(11.40rem,_1fr))]">
            {data.credits.cast.slice(0, 8).map((person) => (
              <InfoCard key={person.id} person={person} />
            ))}
          </GridColumns>
        </div>
        <div className="mt-6 md:ml-6 md:mt-0 md:flex-1"></div>
      </div>
    </div>
  )
}

export default MoviePage
