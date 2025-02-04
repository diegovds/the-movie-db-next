'use client'

import { Person } from '@/types/Persons'
import { Serie } from '@/types/Series'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import PaginationButton from './PaginationButton'

type PaginationProps = {
  totalPages: number
  serie?: Serie[]
  person?: Person[]
}

const Pagination = ({ totalPages, serie, person }: PaginationProps) => {
  const [pageCount, setPageCount] = useState(1)
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
      if (!serie && !person) {
        router.push(`/?page=${pageCount}`)
      }
    }
  }, [router, serie, person, pageChanged, pageCount])

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
      {Array.from({ length: 5 }).map((_, index) => (
        <Link
          key={index}
          className="min-w-8 rounded-md border border-solid border-gray-300 bg-blue-500 p-2 text-center text-white transition hover:bg-blue-300"
          href={
            serie
              ? `/tv?page=${index + pageCount}`
              : person
                ? `/person?page=${index + pageCount}`
                : `/?page=${index + pageCount}`
          }
        >
          {index + pageCount}
        </Link>
      ))}
      <PaginationButton click={handleAddingPages}>
        <FaAngleDoubleRight />
      </PaginationButton>
    </div>
  )
}

export default Pagination
