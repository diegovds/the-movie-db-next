import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type GridColumnsProps = HTMLAttributes<HTMLDivElement> & {
  page: boolean
}

const GridColumns = ({
  children,
  className,
  page,
  ...props
}: GridColumnsProps) => {
  return (
    <div
      className={cn(
        `mx-auto my-0 grid ${page ? 'grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5 lg:gap-8' : 'grid-cols-2 gap-4 lg:grid-cols-4'}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default GridColumns
