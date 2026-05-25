import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import SocialMedia from '@/app/components/SocialMedia'
import TagH2 from '@/app/components/TagH2'
import { Person } from '@/types/Persons'
import {
  GetDepartmentPerson,
  GetGenderPerson,
  GetPersonAge,
  PersonDateFormatting,
} from '@/utils/functions'
import { fetchTmdb } from '@/utils/tmdb'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ApiState from '@/app/components/ApiState'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id

  const data = await fetchTmdb<Person>(
    `https://api.themoviedb.org/3/person/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=external_ids,combined_credits`,
  )

  if (!data) {
    return {
      title: 'Artista indisponível',
    }
  }

  return {
    title: `${data.name}`,
    description: `${data.biography}`,
    openGraph: {
      title: `${data.name}`,
      description: `${data.biography}`,
      images: [`https://image.tmdb.org/t/p/w780${data.profile_path}`],
    },
  }
}

const PersonPage = async ({ params }: Props) => {
  const { id } = await params

  const data = await fetchTmdb<Person>(
    `https://api.themoviedb.org/3/person/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=external_ids,combined_credits`,
  )

  if (!data) return <ApiState />

  if (!data.name) return notFound()

  return (
    <div className="grid w-full gap-7 lg:grid-cols-[340px_1fr]">
      <aside className="space-y-5">
        <div className="cinema-panel overflow-hidden rounded-lg p-3">
          <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-white/[0.04]">
            {data.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w780${data.profile_path}`}
                alt={data.name}
                priority
                quality={100}
                fill
                sizes="(max-width: 1024px) 90vw, 340px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-6">
                <p className="text-center text-sm text-gray-400">
                  Imagem não disponível
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="cinema-panel rounded-lg p-5">
          <SocialMedia
            className="mb-6"
            face={data.external_ids.facebook_id}
            insta={data.external_ids.instagram_id}
            x={data.external_ids.twitter_id}
            imdb={data.external_ids.imdb_id}
          />
          <h2 className="mb-4 text-2xl font-black text-white">
            Informações pessoais
          </h2>
          <div className="divide-y divide-white/10">
            <div className="py-4 first:pt-0">
              <TagH2 className="mt-0 text-xs">Conhecido(a) por</TagH2>
              <p className="mt-2 text-sm text-gray-100">
                {GetDepartmentPerson(data.known_for_department)}
              </p>
            </div>
            <div className="py-4">
              <TagH2 className="mt-0 text-xs">Gênero</TagH2>
              <p className="mt-2 text-sm text-gray-100">
                {GetGenderPerson(data.gender)}
              </p>
            </div>
            <div className="py-4">
              <TagH2 className="mt-0 text-xs">Nascimento</TagH2>
              <p className="mt-2 text-sm text-gray-100">
                {data.deathday === null ? (
                  <>
                    {PersonDateFormatting(data.birthday)} (
                    {GetPersonAge(data.birthday, data.deathday)} anos)
                  </>
                ) : (
                  <>{PersonDateFormatting(data.birthday)}</>
                )}
              </p>
            </div>
            {data.deathday !== null && (
              <div className="py-4">
                <TagH2 className="mt-0 text-xs">Falecimento</TagH2>
                <p className="mt-2 text-sm text-gray-100">
                  {PersonDateFormatting(data.deathday)} (
                  {GetPersonAge(data.birthday, data.deathday)} anos)
                </p>
              </div>
            )}
            <div className="py-4">
              <TagH2 className="mt-0 text-xs">Local de nascimento</TagH2>
              <p className="mt-2 text-sm text-gray-100">
                {data.place_of_birth}
              </p>
            </div>
            {data.also_known_as.length > 0 && (
              <div className="py-4">
                <TagH2 className="mt-0 text-xs">Também conhecido(a) como</TagH2>
                <div className="mt-2 flex flex-col gap-1">
                  {data.also_known_as.map((name, index) => (
                    <p key={index} className="text-sm text-gray-100">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        <section className="mb-7 border-b border-white/10 pb-7">
          <TagH2 className="mt-0">Perfil</TagH2>
          <h1 className="mt-2 text-balance text-5xl font-black leading-none text-white md:text-7xl">
            {data.name}
          </h1>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-gray-200 md:text-base">
            {data.biography || 'Biografia não disponível.'}
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-black text-gray-100">
            Conhecido(a) por
          </h2>
          <GridColumns page={false}>
            {data.combined_credits.cast.slice(0, 8).map((movie) => (
              <InfoCard key={movie.id} movie={movie} />
            ))}
          </GridColumns>
        </section>
      </main>
    </div>
  )
}

export default PersonPage
