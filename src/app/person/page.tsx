import { Person } from '@/types/Persons'
import GridColumns from '../components/GridColumns'
import InfoCard from '../components/InfoCard'

interface ResponseProps {
  results: Person[]
  total_pages: number
  total_results: number
}

type Props = {
  searchParams: Promise<{ page: number | undefined }>
}

const PersonPage = async ({ searchParams }: Props) => {
  const { page } = await searchParams

  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}`,
    {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    },
  )
  const data: ResponseProps = await response.json()

  console.log(data.results)

  return (
    <div className="w-full">
      <GridColumns>
        {data.results.map((person) => (
          <InfoCard key={person.id} person={person} />
        ))}
      </GridColumns>
    </div>
  )
}

export default PersonPage
