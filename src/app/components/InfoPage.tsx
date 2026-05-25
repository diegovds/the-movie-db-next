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
  const title = movie ? movie.title : serie?.name
  const backdrop = movie ? movie.backdrop_path : serie?.backdrop_path
  const poster = movie ? movie.poster_path : serie?.poster_path
  const releaseDate = movie ? movie.release_date : serie?.first_air_date
  const hasTrailer = movie
    ? movie.videos.results.length > 0
    : Boolean(serie && serie.videos.results.length > 0)

  return (
    <section className="relative isolate overflow-hidden rounded-lg border border-white/10 bg-[#111214] shadow-2xl shadow-black/30">
      <div
        className="absolute inset-0 -z-10 opacity-55"
        style={{
          background: `linear-gradient(90deg, #111214 0%, rgba(17,18,20,0.86) 40%, rgba(17,18,20,0.58) 100%), url(https://image.tmdb.org/t/p/original${backdrop}) no-repeat center/cover`,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.58))]" />

      <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-[minmax(220px,320px)_1fr] lg:p-8">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[320px] overflow-hidden rounded-lg bg-white/[0.04] shadow-2xl shadow-black/50">
          {poster ? (
            <>
              <Image
                src={`https://image.tmdb.org/t/p/w780${poster}`}
                alt={title ?? 'poster'}
                priority
                quality={100}
                fill
                sizes="(max-width: 768px) 86vw, 320px"
              />
              <RatingCircle
                voteAverage={movie ? movie.vote_average : serie?.vote_average}
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6">
              <p className="text-center text-sm text-gray-400">
                Imagem não disponível
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center text-center md:text-left">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[var(--gold)]">
            {movie ? 'Filme' : 'Série'}
          </p>
          <h1 className="text-balance text-4xl font-black leading-none text-white sm:text-5xl lg:text-7xl">
            {title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-gray-300 md:justify-start">
            <span>{dateFormatting(releaseDate)}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            <span>{genresList(movie ? movie.genres : serie?.genres)}</span>
            {!serie && movie && (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                <span>{runtime(movie.runtime)}</span>
              </>
            )}
          </div>
          {movie && movie.videos.results.length > 0 && (
            <ModalDiv movie={movie} />
          )}
          {serie && serie.videos.results.length > 0 && (
            <ModalDiv serie={serie} />
          )}
          <h2
            className={`mb-3 text-2xl font-black ${hasTrailer ? 'mt-0' : 'mt-8'}`}
          >
            Sinopse
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-gray-200 md:text-base">
            {movie ? movie.overview : serie?.overview}
          </p>
        </div>
      </div>
    </section>
  )
}

export default InfoPage
