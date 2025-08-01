import Anchor from '@/app/components/Anchor'
import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import Pagination from '@/app/components/Pagination'
import TagH2 from '@/app/components/TagH2'
import { Serie } from '@/types/Series'

interface ResponseProps {
  results: Serie[]
  total_pages: number
  total_results: number
}

type Props = {
  params: Promise<{ query: string }>
  searchParams: Promise<{ page: number | undefined }>
}

const SearchSeriePage = async ({ params, searchParams }: Props) => {
  const { query } = await params
  const { page } = await searchParams

  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}&query=${query}`,
    {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    },
  )
  const data: ResponseProps = await response.json()

  return (
    <div className="w-full">
      <TagH2 className="ml-0 mt-0">Pesquisa por {query} em séries:</TagH2>
      <div className="my-3 flex gap-6">
        <p className="text-sm text-gray-100">Pesquise em </p>
        <Anchor
          href={`/search/person/${query}`}
          className="md:text-md text-sm font-bold text-green-500"
        >
          Artistas
        </Anchor>
        <p className="text-sm text-gray-100">ou</p>
        <Anchor
          href={`/search/movie/${query}`}
          className="md:text-md text-sm font-bold text-blue-400"
        >
          Filmes
        </Anchor>
      </div>
      <GridColumns className="px-0" page={true}>
        {data.results.map((serie) => (
          <InfoCard key={serie.id} serie={serie} />
        ))}
      </GridColumns>
      <Pagination
        totalPages={data.total_pages}
        serieSearch={data.results}
        query={query}
      />
    </div>
  )
}

export default SearchSeriePage
