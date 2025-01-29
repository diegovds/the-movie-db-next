import { Movie } from '@/types/Movies'
import { dateFormatting } from '@/utils/functions'
import Image from 'next/image'
import Link from 'next/link'
import RatingCircle from './RatingCircle'

type InfoCardProps = {
  movie: Movie
}

const InfoCard = ({ movie }: InfoCardProps) => {
  return (
    <Link
      className="flex flex-col gap-2 overflow-hidden rounded-lg bg-gray-50 p-3 shadow-md"
      key={movie.id}
      href={`/movie/${movie.id}`}
    >
      <div className="relative h-[250px] overflow-hidden rounded-lg md:h-[300px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="poster"
          priority
          quality={100}
          fill
        />
        <RatingCircle voteAverage={movie.vote_average} />
      </div>
      <h2 className="truncate text-center text-sm">{movie.title}</h2>
      <data className="text-center text-xs text-gray-400">
        {dateFormatting(movie.release_date)}
      </data>
    </Link>
  )
}

export default InfoCard
