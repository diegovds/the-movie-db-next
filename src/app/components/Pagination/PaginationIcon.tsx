import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type PaginationIconProps = HTMLAttributes<HTMLDivElement>

const PaginationIcon = ({
  children,
  className,
  ...props
}: PaginationIconProps) => {
  return (
    <div
      className={cn(
        'grid h-10 min-w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] px-3 text-sm font-black text-gray-100 transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default PaginationIcon
