import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import SocialMedia from '@/app/components/SocialMedia'
import { Person } from '@/types/Persons'
import {
  GetDepartmentPerson,
  GetGenderPerson,
  GetPersonAge,
  PersonDateFormatting,
} from '@/utils/functions'
import { Metadata } from 'next'
import Image from 'next/image'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=external_ids,combined_credits`,
  )
  const data: Person = await response.json()

  return {
    title: `The Movie BD NextJS - ${data.name}`,
    description: `${data.biography}`,
    openGraph: {
      title: `The Movie BD NextJS - ${data.name}`,
      description: `${data.biography}`,
      images: [`https://image.tmdb.org/t/p/w500${data.profile_path}`],
    },
  }
}

const PersonPage = async ({ params }: Props) => {
  const { id } = await params

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?${process.env.THE_MOVIE_DB}&include_adult=false&append_to_response=external_ids,combined_credits`,
    {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    },
  )
  const data: Person = await response.json()

  return (
    <div className="flex w-full flex-col px-6 text-gray-100 md:flex-row">
      <div className="md:flex-1">
        <div className="relative h-[500px] overflow-hidden rounded-lg md:h-[600px]">
          {data.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
              alt="poster"
              priority
              quality={100}
              fill
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white">
              <p className="text-center text-sm">Imagem não disponível</p>
            </div>
          )}
        </div>
        <SocialMedia
          className="my-6"
          face={data.external_ids.facebook_id}
          insta={data.external_ids.instagram_id}
          x={data.external_ids.twitter_id}
          imdb={data.external_ids.imdb_id}
        />
        <h2 className="mb-6 block text-center text-3xl font-bold md:hidden md:text-start md:text-4xl">
          {data.name}
        </h2>
        <h2 className="mb-3 text-center text-2xl font-bold md:text-start md:text-3xl">
          Informações pessoais
        </h2>
        <h2 className="mb-1 text-center text-xl font-bold md:text-start md:text-2xl">
          Conhecido(a) por
        </h2>
        <p className="mb-3 text-center text-base md:text-left">
          {GetDepartmentPerson(data.known_for_department)}
        </p>
        <h2 className="mb-1 text-center text-xl font-bold md:text-start md:text-2xl">
          Gênero
        </h2>
        <p className="mb-3 text-center text-base md:text-left">
          {GetGenderPerson(data.gender)}
        </p>
        <h2 className="mb-1 text-center text-xl font-bold md:text-start md:text-2xl">
          Nascimento
        </h2>
        <p className="mb-3 text-center text-base md:text-left">
          {data.deathday === null ? (
            <>
              {PersonDateFormatting(data.birthday)} (
              {GetPersonAge(data.birthday, data.deathday)} anos)
            </>
          ) : (
            <>{PersonDateFormatting(data.birthday)}</>
          )}
        </p>
        {data.deathday !== null && (
          <>
            <h2 className="mb-1 text-center text-xl font-bold md:text-start md:text-2xl">
              Falecimento
            </h2>
            <p className="mb-3 text-center text-base md:text-left">
              {PersonDateFormatting(data.deathday)} (
              {GetPersonAge(data.birthday, data.deathday)} anos)
            </p>
          </>
        )}
        <h2 className="mb-1 text-center text-xl font-bold md:text-start md:text-2xl">
          Local de nascimento
        </h2>
        <p className="mb-3 text-center text-base md:text-left">
          {data.place_of_birth}
        </p>
        <h2 className="mb-1 text-center text-xl font-bold md:text-start md:text-2xl">
          Também conhecido(a) como
        </h2>
        <div className="flex flex-col gap-1">
          {data.also_known_as.map((name, index) => (
            <p key={index} className="text-center text-base md:text-left">
              {name}
            </p>
          ))}
        </div>
      </div>
      <div className="pt-6 md:flex-[2] md:pl-6 md:pt-0">
        <h2 className="mb-3 hidden text-center text-3xl font-bold md:block md:text-start md:text-4xl">
          {data.name}
        </h2>
        <h2 className="mb-3 text-center text-2xl font-bold md:text-start md:text-3xl">
          Biografia
        </h2>
        <p className="text-center text-base md:text-left">{data.biography}</p>
        <h2 className="mb-3 mt-10 text-center text-2xl font-bold md:text-start md:text-3xl">
          Conhecido(a) por
        </h2>
        <GridColumns className="md:grid-cols-[repeat(auto-fill,_minmax(11.40rem,_1fr))]">
          {data.combined_credits.cast.slice(0, 8).map((movie) => (
            <InfoCard key={movie.id} movie={movie} />
          ))}
        </GridColumns>
      </div>
    </div>
  )
}

export default PersonPage
