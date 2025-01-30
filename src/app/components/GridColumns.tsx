import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type GridColumnsProps = HTMLAttributes<HTMLDivElement>

const GridColumns = ({ children, className, ...props }: GridColumnsProps) => {
  return (
    <div
      className={cn(
        'mx-auto my-0 grid w-[97%] grid-cols-[repeat(auto-fill,_minmax(11.25rem,_1fr))] gap-5 md:w-[94%] md:gap-10',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default GridColumns
