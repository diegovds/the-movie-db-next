'use client'

import { Movie } from '@/types/Movies'
import { Person } from '@/types/Persons'
import { Serie } from '@/types/Series'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import PaginationButton from './PaginationButton'

type PaginationProps = {
  totalPages: number
  serie?: Serie[]
  person?: Person[]
  movieSearch?: Movie[]
  serieSearch?: Serie[]
  personSearch?: Person[]
  query?: string
}

const Pagination = ({
  totalPages,
  serie,
  person,
  movieSearch,
  serieSearch,
  personSearch,
  query,
}: PaginationProps) => {
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const [pageCount, setPageCount] = useState(
    page === null || isNaN(parseInt(page)) ? 1 : parseInt(page),
  )
  const [pageChanged, setPageChanged] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (pageCount !== 1) {
      if (serie && !pageChanged) {
        router.push(`tv/?page=${pageCount}`)
        setPageChanged(true)
      }
      if (person && !pageChanged) {
        router.push(`person/?page=${pageCount}`)
        setPageChanged(true)
      }
      if (movieSearch && query && !pageChanged) {
        router.push(`/search/movie/${query}/?page=${pageCount}`)
        setPageChanged(true)
      }
      if (serieSearch && query && !pageChanged) {
        router.push(`/search/tv/${query}/?page=${pageCount}`)
        setPageChanged(true)
      }
      if (personSearch && query && !pageChanged) {
        router.push(`/search/person/${query}/?page=${pageCount}`)
        setPageChanged(true)
      }
      if (!serie && !person && !movieSearch && !serieSearch && !personSearch) {
        router.push(`/?page=${pageCount}`)
      }
    }
  }, [
    router,
    serie,
    person,
    movieSearch,
    serieSearch,
    personSearch,
    query,
    pageChanged,
    pageCount,
  ])

  const handleAddingPages = () => {
    if (pageCount < totalPages - 5) {
      setPageCount(pageCount + 5)
      setPageChanged(false)
    }
  }

  const handlePageSubtraction = () => {
    if (pageCount > 5) {
      setPageCount(pageCount - 5)
      setPageChanged(false)
    }
  }

  return (
    <div className="mt-6 flex justify-center">
      <PaginationButton click={handlePageSubtraction}>
        <FaAngleDoubleLeft />
      </PaginationButton>
      {(() => {
        const link = []
        for (
          let index = 0;
          index < 5 && index + pageCount <= totalPages;
          index++
        ) {
          link.push(
            <Link
              key={index}
              className="min-w-8 rounded-md border border-solid border-gray-300 bg-blue-500 p-2 text-center text-white transition hover:bg-blue-300"
              href={
                serie
                  ? `/tv?page=${index + pageCount}`
                  : person
                    ? `/person?page=${index + pageCount}`
                    : movieSearch
                      ? `/search/movie/${query}/?page=${index + pageCount}`
                      : serieSearch
                        ? `/search/tv/${query}/?page=${index + pageCount}`
                        : personSearch
                          ? `/search/person/${query}/?page=${index + pageCount}`
                          : `/?page=${index + pageCount}`
              }
            >
              {index + pageCount}
            </Link>,
          )
        }
        return link
      })()}
      <PaginationButton click={handleAddingPages}>
        <FaAngleDoubleRight />
      </PaginationButton>
    </div>
  )
}

export default Pagination
