import Anchor from '@/app/components/Anchor'
import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import Pagination from '@/app/components/Pagination'
import TagH2 from '@/app/components/TagH2'
import { Person } from '@/types/Persons'

interface ResponseProps {
  results: Person[]
  total_pages: number
  total_results: number
}

type Props = {
  params: Promise<{ query: string }>
  searchParams: Promise<{ page: number | undefined }>
}

const SearchPersonPage = async ({ params, searchParams }: Props) => {
  const { query } = await params
  const { page } = await searchParams

  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}&query=${query}`,
    {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    },
  )
  const data: ResponseProps = await response.json()

  return (
    <div className="mx-6 w-full">
      <TagH2 className="ml-0 mt-0">Pesquisa por {query} em artistas:</TagH2>
      <div className="my-3 flex gap-6">
        <p className="text-gray-100">Pesquise em </p>
        <Anchor
          href={`/search/movie/${query}`}
          className="text-base font-bold text-blue-400 md:text-base"
        >
          Filmes
        </Anchor>
        <p className="text-gray-100">ou</p>
        <Anchor
          href={`/search/tv/${query}`}
          className="text-base font-bold text-yellow-400 md:text-base"
        >
          Séries
        </Anchor>
      </div>
      <GridColumns className="px-0" page={true}>
        {data.results.map((person) => (
          <InfoCard key={person.id} person={person} />
        ))}
      </GridColumns>
      <Pagination
        totalPages={data.total_pages}
        personSearch={data.results}
        query={query}
      />
    </div>
  )
}

export default SearchPersonPage
