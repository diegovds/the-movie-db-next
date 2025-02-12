'use client'

import { HTMLAttributes } from 'react'

type PaginationIconProps = HTMLAttributes<HTMLDivElement>

const PaginationIcon = ({ children }: PaginationIconProps) => {
  return (
    <div className="flex h-full min-w-8 items-center justify-center rounded-md border border-solid border-gray-300 bg-blue-500 p-2 text-center text-white transition hover:bg-blue-300">
      {children}
    </div>
  )
}

export default PaginationIcon
