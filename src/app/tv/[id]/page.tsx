import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import InfoPage from '@/app/components/InfoPage'
import Keyword from '@/app/components/Keyword'
import SocialMedia from '@/app/components/SocialMedia'
import TagH2 from '@/app/components/TagH2'
import { Serie } from '@/types/Series'
import { StatusTvToBr, TypeTvToBr } from '@/utils/functions'
import { Metadata } from 'next'
import Image from 'next/image'

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
        <div className="mt-6 md:ml-6 md:mt-0 md:flex-1">
          <SocialMedia
            face={data.external_ids.facebook_id}
            insta={data.external_ids.instagram_id}
            x={data.external_ids.twitter_id}
            imdb={data.external_ids.imdb_id}
          />
          <div className="flex flex-col items-center md:items-start">
            <TagH2 className="mt-6 md:mt-3">Título original</TagH2>
            <p className="text-center">{data.original_name}</p>
            <TagH2>Situação</TagH2>
            <p>{StatusTvToBr(data.status)}</p>
            <TagH2>Emissora</TagH2>
            {data.networks[0] && (
              <Image
                src={`https://image.tmdb.org/t/p/h30${data.networks[0].logo_path}`}
                width={50}
                height={50}
                alt="emissora"
                priority
                quality={100}
              />
            )}
            <TagH2>Tipo</TagH2>
            <p>{TypeTvToBr(data.type)}</p>
          </div>
          <div>
            <TagH2 className="mb-2 text-center md:text-left">
              Palavras-chave
            </TagH2>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {data.keywords.results.map((keyword) => (
                <Keyword key={keyword.id}>{keyword.name}</Keyword>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="m-6 mb-0">
        <TagH2 className="mb-3">Recomendações</TagH2>
        <GridColumns>
          {data.recommendations.results.slice(0, 10).map((recommendation) => (
            <InfoCard key={recommendation.id} serie={recommendation} />
          ))}
        </GridColumns>
      </div>
    </div>
  )
}

export default MoviePage
