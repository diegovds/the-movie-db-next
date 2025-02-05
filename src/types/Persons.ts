import { Movie, Social } from './Movies'

export interface Production {
  name?: string
  title?: string
}

export interface Person {
  id: number
  name: string
  known_for: Production[]
  profile_path?: string
  character?: string
  biography: string
  combined_credits: {
    cast: Movie[]
  }
  external_ids: Social
}
