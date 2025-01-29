import { Movie } from '@/types/Movies'
import { Serie } from '@/types/Series'
import { dateFormatting } from '@/utils/functions'
import Image from 'next/image'
import Link from 'next/link'
import RatingCircle from './RatingCircle'

type InfoCardProps = {
  movie?: Movie
  serie?: Serie
}

const InfoCard = ({ movie, serie }: InfoCardProps) => {
  return (
    <Link
      className="flex flex-col gap-2 overflow-hidden rounded-lg bg-gray-50 p-3 shadow-md"
      href={movie ? `/movie/${movie.id}` : `/tv/${serie?.id}`}
    >
      <div className="relative h-[250px] overflow-hidden rounded-lg md:h-[300px]">
        <Image
          src={
            movie
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `https://image.tmdb.org/t/p/w500${serie?.poster_path}`
          }
          alt="poster"
          priority
          quality={100}
          fill
        />
        <RatingCircle
          voteAverage={movie ? movie.vote_average : serie?.vote_average}
        />
      </div>
      <h2 className="truncate text-center text-sm">
        {movie ? movie.title : serie?.name}
      </h2>
      <data className="text-center text-xs text-gray-400">
        {dateFormatting(movie ? movie.release_date : serie?.first_air_date)}
      </data>
    </Link>
  )
}

export default InfoCard
