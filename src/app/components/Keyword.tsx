import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type KeywordProps = HTMLAttributes<HTMLParagraphElement>

const Keyword = ({ children, className, ...props }: KeywordProps) => {
  return (
    <span
      className={cn(
        'rounded-md bg-[#131313] px-2 py-1 text-xs text-gray-100',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Keyword
