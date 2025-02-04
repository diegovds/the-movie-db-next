import { Person } from '@/types/Persons'
import { Metadata } from 'next'

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
    <div className="flex w-full items-center justify-center">
      <h2>{data.name}</h2>
    </div>
  )
}

export default PersonPage
