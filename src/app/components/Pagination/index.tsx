'use client'

import { Serie } from '@/types/Series'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import PaginationButton from './PaginationButton'

type PaginationProps = {
  totalPages: number
  serie?: Serie[]
}

const Pagination = ({ totalPages, serie }: PaginationProps) => {
  const [pageCount, setPageCount] = useState(1)
  const [pageChanged, setPageChanged] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (serie && !pageChanged) {
      router.push(`tv/?page=${pageCount}`)
      setPageChanged(true)
    }
    if (!serie) {
      router.push(`/?page=${pageCount}`)
    }
  }, [router, serie, pageChanged, pageCount])

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
            !serie
              ? `/?page=${index + pageCount}`
              : `/tv?page=${index + pageCount}`
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
