import { Cast, Content, Genre, Results, Social } from './Movies'

interface Keyword {
  results: Content[]
}

export type Serie = {
  id: number
  credits: Cast
  external_ids: Social
  status: string
  overview: string
  poster_path: string
  genres: Genre[]
  backdrop_path: string
  videos: Results
  vote_average: number
  name: string
  original_name: string
  first_air_date: Date
  type: string
  networks: [
    {
      id: number
      logo_path?: string
    },
  ]
  keywords: Keyword
  recommendations: {
    results: Serie[]
  }
}
