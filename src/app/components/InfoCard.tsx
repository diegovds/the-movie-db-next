import { Movie } from '@/types/Movies'
import Image from 'next/image'
import Link from 'next/link'

type InfoCardProps = {
  movie: Movie
}

const InfoCard = ({ movie }: InfoCardProps) => {
  return (
    <Link
      className="flex max-w-[150px] flex-col gap-2 overflow-hidden rounded-lg bg-gray-50 p-3 shadow-md md:max-w-[200px]"
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
      </div>
      <h2 className="truncate text-center font-medium">{movie.title}</h2>
    </Link>
  )
}

export default InfoCard
