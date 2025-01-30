import { Person } from './Persons'

export interface Genre {
  id: number
  name: string
}

interface MovieKey {
  key: string
}

interface Results {
  results: MovieKey[]
}

interface Cast {
  cast: Person[]
}

interface Social {
  imdb_id: string
  facebook_id: string
  instagram_id: string
  twitter_id: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  genres: Genre[]
  release_date: Date
  runtime: number
  videos: Results
  vote_average: number
  credits: Cast
  external_ids: Social
}
