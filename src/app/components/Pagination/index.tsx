'use client'

import { Movie } from '@/types/Movies'
import { Person } from '@/types/Persons'
import { Serie } from '@/types/Series'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import PaginationIcon from './PaginationIcon'

type PaginationProps = {
  totalPages: number
  serie?: Serie[]
  person?: Person[]
  movieSearch?: Movie[]
  serieSearch?: Serie[]
  personSearch?: Person[]
  query?: string
}

type HandlePageProps = {
  operation: 'add' | 'sub'
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
    page === null || isNaN(parseInt(page)) || parseInt(page) <= 0
      ? 1
      : parseInt(page),
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

  const handlePage = ({ operation }: HandlePageProps) => {
    if (pageCount < totalPages - 5 && operation === 'add') {
      setPageCount(pageCount + 5)
      setPageChanged(false)
    }

    if (pageCount > 5 && operation === 'sub') {
      setPageCount(pageCount - 5)
      setPageChanged(false)
    }

    if (pageCount > 0 && pageCount < 5 && operation === 'sub') {
      setPageCount(pageCount + 1 - pageCount)
      setPageChanged(false)
    }
  }

  return (
    <div className="mt-6 flex justify-center">
      <button onClick={() => handlePage({ operation: 'sub' })}>
        <PaginationIcon>
          <FaAngleDoubleLeft />
        </PaginationIcon>
      </button>
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
              <PaginationIcon>{index + pageCount}</PaginationIcon>
            </Link>,
          )
        }
        return link
      })()}
      <button onClick={() => handlePage({ operation: 'add' })}>
        <PaginationIcon>
          <FaAngleDoubleRight />
        </PaginationIcon>
      </button>
    </div>
  )
}

export default Pagination
