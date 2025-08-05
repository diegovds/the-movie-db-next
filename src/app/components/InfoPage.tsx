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
        <div className="relative h-[500px] overflow-hidden rounded-lg md:h-[600px] md:flex-1">
          {movie?.poster_path || serie?.poster_path ? (
            <>
              <Image
                src={
                  movie
                    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                    : `https://image.tmdb.org/t/p/w780${serie?.poster_path}`
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
            <div className="flex h-full w-full items-center justify-center bg-white">
              <p className="text-center text-sm">Imagem não disponível</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center pt-6 text-gray-100 md:flex-1 md:pl-6 md:pt-0 lg:flex-[2] lg:items-start">
          <h2 className="mb-3 text-balance text-center text-2xl font-bold md:text-wrap md:text-3xl lg:text-left">
            {movie ? movie.title : serie?.name}
          </h2>
          <div className="flex flex-col items-center gap-2 text-center text-sm lg:flex-row">
            <p>
              {dateFormatting(
                movie ? movie.release_date : serie?.first_air_date,
              )}
            </p>
            <div className="mx-0 my-auto hidden h-[6px] w-[6px] rounded-[999px] bg-gray-100 lg:block" />
            <p>{genresList(movie ? movie.genres : serie?.genres)}</p>
            {!serie && movie && (
              <>
                <div className="mx-0 my-auto hidden h-[6px] w-[6px] rounded-[999px] bg-gray-100 lg:block" />
                <p>{runtime(movie.runtime)}</p>
              </>
            )}
          </div>
          {movie && movie.videos.results.length > 0 && (
            <ModalDiv movie={movie} />
          )}
          {serie && serie.videos.results.length > 0 && (
            <ModalDiv serie={serie} />
          )}
          {movie && (
            <h3
              className={`mb-3 text-2xl font-bold md:text-3xl ${movie.videos.results.length < 1 ? 'mt-3' : 'mt-0'}`}
            >
              Sinopse
            </h3>
          )}
          {serie && (
            <h3
              className={`mb-3 text-2xl font-bold md:text-3xl ${serie.videos.results.length < 1 ? 'mt-3' : 'mt-0'}`}
            >
              Sinopse
            </h3>
          )}
          <p className="text-center text-sm leading-relaxed tracking-wide lg:text-left">
            {movie ? movie.overview : serie?.overview}
          </p>
        </div>
      </section>
    </div>
  )
}

export default InfoPage
