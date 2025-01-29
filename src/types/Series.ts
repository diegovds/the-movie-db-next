import { Movie } from './Movies'

export type Serie = Movie & {
  name: string
  first_air_date: Date
}
