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
            : `/tv/${person?.id}`
      }
    >
      <div className="relative h-[250px] overflow-hidden rounded-lg md:h-[300px]">
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
      </div>
      <h2 className="truncate text-center text-sm">
        {movie ? movie.title : serie ? serie.name : person?.name}
      </h2>
      {(movie || serie) && (
        <data className="text-center text-xs text-gray-400">
          {dateFormatting(movie ? movie.release_date : serie?.first_air_date)}
        </data>
      )}
      {person && (
        <p className="text-center text-xs text-gray-400">
          {productionsList(person.known_for)}
        </p>
      )}
    </Link>
  )
}

export default InfoCard
