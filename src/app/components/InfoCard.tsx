import { Movie } from '@/types/Movies'
import { Person } from '@/types/Persons'
import { Serie } from '@/types/Series'
import { dateFormatting, productionsList } from '@/utils/functions'
import Image from 'next/image'
import Link from 'next/link'
import RatingCircle from './RatingCircle'

type InfoCardProps = {
  movie?: Movie
  serie?: Serie
  person?: Person
}

const InfoCard = ({ movie, serie, person }: InfoCardProps) => {
  return (
    <Link
      className="flex flex-col gap-2 overflow-hidden rounded-lg bg-gray-50 p-3 shadow-md"
      href={
        movie
          ? `/movie/${movie.id}`
          : serie
            ? `/tv/${serie.id}`
            : `/person/${person?.id}`
      }
    >
      <div className="relative h-[250px] overflow-hidden rounded-lg md:h-[300px]">
        {movie?.poster_path || person?.profile_path || serie?.poster_path ? (
          <>
            <Image
              src={
                movie
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : serie
                    ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                    : `https://image.tmdb.org/t/p/w500${person?.profile_path}`
              }
              alt="poster"
              priority
              quality={100}
              fill
            />
            {(movie || serie) && (
              <RatingCircle
                voteAverage={movie ? movie.vote_average : serie?.vote_average}
              />
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-center text-xs">Imagem não disponível</p>
          </div>
        )}
      </div>
      <h2 className="truncate text-center text-sm">
        {movie ? movie.title : serie ? serie.name : person?.name}
      </h2>
      {(movie || serie) && (
        <p className="text-center text-xs text-gray-400">
          {dateFormatting(movie ? movie.release_date : serie?.first_air_date)}
        </p>
      )}
      {person && (
        <p className="text-center text-xs text-gray-400">
          {!person.character
            ? productionsList(person.known_for)
            : person.character}
        </p>
      )}
    </Link>
  )
}

export default InfoCard
