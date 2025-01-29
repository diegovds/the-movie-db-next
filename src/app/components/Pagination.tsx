'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

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
    <div className="mt-6 flex items-center justify-center gap-2">
      <button onClick={handlePageSubtraction}>
        <FaAngleDoubleLeft />
      </button>
      {Array.from({ length: 5 }).map((_, index) => (
        <Link key={index} href={`/?page=${index + pageCount}`}>
          {index + pageCount}
        </Link>
      ))}
      <button onClick={handleAddingPages}>
        <FaAngleDoubleRight />
      </button>
    </div>
  )
}

export default Pagination
