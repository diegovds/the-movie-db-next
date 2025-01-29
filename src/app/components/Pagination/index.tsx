'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import PaginationButton from './PaginationButton'

type PaginationProps = {
  totalPages: number
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const [pageCount, setPageCount] = useState(1)
  const router = useRouter()

  useEffect(() => {
    router.push(`/?page=${pageCount}`)
  }, [router, pageCount])

  const handleAddingPages = () => {
    if (pageCount < totalPages - 5) {
      setPageCount(pageCount + 5)
    }
  }

  const handlePageSubtraction = () => {
    if (pageCount > 5) {
      setPageCount(pageCount - 5)
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
          href={`/?page=${index + pageCount}`}
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
