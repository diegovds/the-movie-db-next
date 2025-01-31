import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type GridColumnsProps = HTMLAttributes<HTMLDivElement>

const GridColumns = ({ children, className, ...props }: GridColumnsProps) => {
  return (
    <div
      className={cn(
        'mx-auto my-0 grid grid-cols-[repeat(auto-fill,_minmax(10.15rem,_1fr))] gap-5 md:grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))] md:gap-10',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default GridColumns
