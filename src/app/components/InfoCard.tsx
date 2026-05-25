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
  const title = movie ? movie.title : serie ? serie.name : person?.name
  const href = movie
    ? `/movie/${movie.id}`
    : serie
      ? `/tv/${serie.id}`
      : `/person/${person?.id}`
  const image = movie
    ? movie.poster_path
    : serie
      ? serie.poster_path
      : person?.profile_path

  return (
    <Link
      className="cinema-panel group relative flex min-w-0 flex-col overflow-hidden rounded-lg p-2 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]"
      href={href}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-[#0b0c0e]">
        {image ? (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w780${image}`}
              alt={title ?? 'poster'}
              priority
              quality={100}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
              className="transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80" />
            {(movie || serie) && (
              <RatingCircle
                voteAverage={movie ? movie.vote_average : serie?.vote_average}
              />
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/[0.04] px-4">
            <p className="text-center text-xs font-semibold text-gray-400">
              Imagem não disponível
            </p>
          </div>
        )}
      </div>
      <div className="flex min-h-24 flex-col justify-between px-1 pb-1 pt-3">
        <h2 className="line-clamp-2 text-sm font-black leading-snug text-gray-100">
          {title}
        </h2>
        {(movie || serie) && (
          <p className="mt-2 text-xs font-medium text-[var(--muted)]">
            {dateFormatting(movie ? movie.release_date : serie?.first_air_date)}
          </p>
        )}
        {person && (
          <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-[var(--muted)]">
            {!person.character
              ? productionsList(person.known_for)
              : person.character}
          </p>
        )}
      </div>
    </Link>
  )
}

export default InfoCard
