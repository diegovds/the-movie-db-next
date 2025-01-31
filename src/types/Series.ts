import { Cast, Content, Social } from './Movies'

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
  name: string
  original_name: string
  first_air_date: Date
  type: string
  networks: [
    {
      id: number
      logo_path: string
    },
  ]
  keywords: Keyword
  recommendations: {
    results: Serie[]
  }
}
