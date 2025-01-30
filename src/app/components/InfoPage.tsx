import { Movie } from '@/types/Movies'
import { Serie } from '@/types/Series'
import { dateFormatting, genresList, runtime } from '@/utils/functions'
import Image from 'next/image'
import ModalDiv from './Modal/ModalDiv'
import RatingCircle from './RatingCircle'

type InfoPageProps = {
  movie?: Movie
  serie?: Serie
}

const InfoPage = ({ movie, serie }: InfoPageProps) => {
  return (
    <div className="w-full">
      <section
        className="flex min-h-[600px] flex-col p-6 md:flex-row"
        style={{
          background: `linear-gradient(to right, rgb(16, 14, 14) 150px, rgba(16, 14, 14, 0.84) 100%), url(https://image.tmdb.org/t/p/original${movie ? movie.backdrop_path : serie?.backdrop_path}) no-repeat center/cover`,
        }}
      >
        <div className="relative h-[500px] md:h-[600px] md:flex-1">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie ? movie.poster_path : serie?.poster_path}`}
            alt="poster"
            priority
            quality={100}
            fill
            className="rounded-lg"
          />
          <RatingCircle
            voteAverage={movie ? movie.vote_average : serie?.vote_average}
          />
        </div>
        <div className="flex flex-col items-center pt-6 text-white md:flex-[2] md:items-start md:pl-6 md:pt-0">
          <h2 className="mb-3 text-balance text-center text-3xl font-bold md:text-wrap md:text-left md:text-4xl">
            {movie ? movie.title : serie?.name}
          </h2>
          <div className="flex flex-col items-center gap-2 text-center text-base md:flex-row">
            <p>
              {dateFormatting(
                movie ? movie.release_date : serie?.first_air_date,
              )}
            </p>
            <div className="mx-0 my-auto hidden h-[6px] w-[6px] rounded-[999px] bg-white md:block" />
            <p>{genresList(movie ? movie.genres : serie?.genres)}</p>
            {!serie && movie && (
              <>
                <div className="mx-0 my-auto hidden h-[6px] w-[6px] rounded-[999px] bg-white md:block" />
                <p>{runtime(movie.runtime)}</p>
              </>
            )}
          </div>
          {movie && movie.videos.results.length > 0 && (
            <ModalDiv movie={movie} />
          )}
          {serie && serie.videos.results.length > 0 && (
            <ModalDiv movie={serie} />
          )}
          {movie && (
            <h3
              className={`mb-3 text-3xl font-bold md:text-4xl ${movie.videos.results.length < 1 ? 'mt-3' : 'mt-0'}`}
            >
              Sinopse
            </h3>
          )}
          {serie && (
            <h3
              className={`mb-3 text-3xl font-bold md:text-4xl ${serie.videos.results.length < 1 ? 'mt-3' : 'mt-0'}`}
            >
              Sinopse
            </h3>
          )}
          <p className="text-center text-base md:text-left">
            {movie ? movie.overview : serie?.overview}
          </p>
        </div>
      </section>
    </div>
  )
}

export default InfoPage
