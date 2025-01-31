import { Person } from './Persons'

export interface Genre {
  id: number
  name: string
}

interface MovieKey {
  key: string
}

export interface Results {
  results: MovieKey[]
}

export interface Cast {
  cast: Person[]
}

export interface Social {
  imdb_id: string
  facebook_id: string
  instagram_id: string
  twitter_id: string
}

export interface Content {
  id: number
  name: string
}

interface Keyword {
  keywords: Content[]
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
  original_title: string
  budget: number
  revenue: number
  status: string
  keywords: Keyword
  recommendations: {
    results: Movie[]
  }
}
