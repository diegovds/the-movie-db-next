interface Genre {
  id: number
  name: string
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
}
