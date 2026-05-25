import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import InfoPage from '@/app/components/InfoPage'
import Keyword from '@/app/components/Keyword'
import SocialMedia from '@/app/components/SocialMedia'
import TagH2 from '@/app/components/TagH2'
import { Movie } from '@/types/Movies'
import { FormatterDollar, StatusMovieToBr } from '@/utils/functions'
import { fetchTmdb } from '@/utils/tmdb'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ApiState from '@/app/components/ApiState'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id

  const data = await fetchTmdb<Movie>(
    `https://api.themoviedb.org/3/movie/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=videos,external_ids,recommendations,keywords,credits`,
  )

  if (!data) {
    return {
      title: 'Filme indisponível',
    }
  }

  return {
    title: `${data.title}`,
    description: `${data.overview}`,
    openGraph: {
      title: `${data.title}`,
      description: `${data.overview}`,
      images: [`https://image.tmdb.org/t/p/w780${data.poster_path}`],
    },
  }
}

const MoviePage = async ({ params }: Props) => {
  const { id } = await params

  const data = await fetchTmdb<Movie>(
    `https://api.themoviedb.org/3/movie/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=videos,external_ids,recommendations,keywords,credits`,
  )

  if (!data) return <ApiState />

  if (!data.title) return notFound()

  return (
    <div className="w-full">
      <InfoPage movie={data} />
      <div className="my-7 grid gap-7 lg:grid-cols-[1fr_320px]">
        <section>
          <h2 className="mb-4 text-3xl font-black text-gray-100">
            Elenco principal
          </h2>
          <GridColumns page={false}>
            {data.credits.cast.slice(0, 8).map((person) => (
              <InfoCard key={person.id} person={person} />
            ))}
          </GridColumns>
        </section>

        <aside className="cinema-panel h-fit rounded-lg p-5">
          <SocialMedia
            face={data.external_ids.facebook_id}
            insta={data.external_ids.instagram_id}
            x={data.external_ids.twitter_id}
            imdb={data.external_ids.imdb_id}
          />
          <div className="mt-6 divide-y divide-white/10">
            <div className="py-4 first:pt-0">
              <TagH2 className="mt-0 text-xs">Título original</TagH2>
              <p className="mt-2 text-sm text-gray-100">
                {data.original_title}
              </p>
            </div>
            <div className="py-4">
              <TagH2 className="mt-0 text-xs">Situação</TagH2>
              <p className="mt-2 text-sm text-gray-100">
                {StatusMovieToBr(data.status)}
              </p>
            </div>
            <div className="py-4">
              <TagH2 className="mt-0 text-xs">Orçamento</TagH2>
              <p className="mt-2 text-sm text-gray-100">
                {FormatterDollar(data.budget)}
              </p>
            </div>
            <div className="py-4">
              <TagH2 className="mt-0 text-xs">Receita</TagH2>
              <p className="mt-2 text-sm text-gray-100">
                {FormatterDollar(data.revenue)}
              </p>
            </div>
          </div>
          {data.keywords.keywords.length > 0 && (
            <div className="pt-2">
              <TagH2 className="mb-3 text-xs">Palavras-chave</TagH2>
              <div className="flex flex-wrap gap-2">
                {data.keywords.keywords.map((keyword) => (
                  <Keyword key={keyword.id}>{keyword.name}</Keyword>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {data.recommendations && data.recommendations.results.length > 0 && (
        <section className="border-t border-white/10 pt-7">
          <h2 className="mb-4 text-3xl font-black text-gray-100">
            Recomendações
          </h2>
          <GridColumns page={false} className="xl:grid-cols-5">
            {data.recommendations.results.slice(0, 10).map((recommendation) => (
              <InfoCard key={recommendation.id} movie={recommendation} />
            ))}
          </GridColumns>
        </section>
      )}
    </div>
  )
}

export default MoviePage
