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
}
