'use client'

import { HTMLAttributes } from 'react'

type PaginationIconProps = HTMLAttributes<HTMLDivElement>

const PaginationIcon = ({ children }: PaginationIconProps) => {
  return (
    <div className="flex h-full min-w-8 items-center justify-center rounded-md border border-solid border-black bg-[#131313] p-2 text-center text-gray-100 transition-opacity hover:opacity-75">
      {children}
    </div>
  )
}

export default PaginationIcon
