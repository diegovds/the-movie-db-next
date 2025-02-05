import Anchor from '@/app/components/Anchor'
import GridColumns from '@/app/components/GridColumns'
import InfoCard from '@/app/components/InfoCard'
import Pagination from '@/app/components/Pagination'
import TagH2 from '@/app/components/TagH2'
import { Movie } from '@/types/Movies'

interface ResponseProps {
  results: Movie[]
  total_pages: number
  total_results: number
}

type Props = {
  params: Promise<{ query: string }>
  searchParams: Promise<{ page: number | undefined }>
}

const SearchMoviePage = async ({ params, searchParams }: Props) => {
  const { query } = await params
  const { page } = await searchParams

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?${process.env.THE_MOVIE_DB}&include_adult=false&page=${page !== undefined && page > 0 ? page : 1}&query=${query}`,
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
      <TagH2 className="ml-0 mt-0">Pesquisa por {query} em filmes:</TagH2>
      <div className="my-3 flex gap-6">
        <p>Pesquise em </p>
        <Anchor
          href={`/search/person/${query}`}
          className="text-base font-bold text-green-500 md:text-base"
        >
          Artistas
        </Anchor>
        <p>ou</p>
        <Anchor
          href={`/search/tv/${query}`}
          className="text-base font-bold text-yellow-400 md:text-base"
        >
          Séries
        </Anchor>
      </div>
      <GridColumns className="px-0">
        {data.results.map((movie) => (
          <InfoCard key={movie.id} movie={movie} />
        ))}
      </GridColumns>
      <Pagination
        totalPages={data.total_pages}
        movieSearch={data.results}
        query={query}
      />
    </div>
  )
}

export default SearchMoviePage
