import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import InfoPage from '@/app/components/InfoPage'
import Keyword from '@/app/components/Keyword'
import SocialMedia from '@/app/components/SocialMedia'
import TagH2 from '@/app/components/TagH2'
import { Movie } from '@/types/Movies'
import { FormatterDollar, StatusMovieToBr } from '@/utils/functions'
import { Metadata } from 'next'

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
    title: `${data.title}`,
    description: `${data.overview}`,
    openGraph: {
      title: `${data.title}`,
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
      <div className="my-3 flex flex-col md:flex-row">
        <div className="md:flex-[2]">
          <h2 className="mb-3 text-balance text-center text-2xl font-bold text-gray-100 md:text-wrap md:text-left md:text-3xl">
            Elenco principal
          </h2>
          <GridColumns page={false}>
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
            <p className="text-center text-sm text-gray-100">
              {data.original_title}
            </p>
            <TagH2>Situação</TagH2>
            <p className="text-sm text-gray-100">
              {StatusMovieToBr(data.status)}
            </p>
            <TagH2>Orçamento</TagH2>
            <p className="text-sm text-gray-100">
              {FormatterDollar(data.budget)}
            </p>
            <TagH2>Receita</TagH2>
            <p className="text-sm text-gray-100">
              {FormatterDollar(data.revenue)}
            </p>
          </div>
          <div>
            <TagH2 className="mb-2 text-center md:text-left">
              Palavras-chave
            </TagH2>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {data.keywords.keywords.map((keyword) => (
                <Keyword key={keyword.id}>{keyword.name}</Keyword>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 mb-0">
        <h2 className="mb-3 text-balance text-center text-2xl font-bold text-gray-100 md:text-wrap md:text-left md:text-3xl">
          Recomendações
        </h2>
        <GridColumns page={false} className="md:grid-cols-3 lg:grid-cols-5">
          {data.recommendations.results.slice(0, 10).map((recommendation) => (
            <InfoCard key={recommendation.id} movie={recommendation} />
          ))}
        </GridColumns>
      </div>
    </div>
  )
}

export default MoviePage
