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
        'grid w-full gap-4 sm:gap-5 lg:gap-6',
        page
          ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-5'
          : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default GridColumns
