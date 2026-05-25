type NextFetchOptions = RequestInit & {
  next?: {
    revalidate?: number
  }
}

const defaultFetchOptions: NextFetchOptions = {
  cache: 'no-store',
  next: {
    revalidate: 0,
  },
}

export async function fetchTmdb<T>(
  url: string,
  options: NextFetchOptions = defaultFetchOptions,
) {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      console.error(
        `TMDB request failed: ${response.status} ${response.statusText}`,
      )
      return null
    }

    return (await response.json()) as T
  } catch (error) {
    console.error('TMDB request failed:', error)
    return null
  }
}
