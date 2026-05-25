import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type KeywordProps = HTMLAttributes<HTMLParagraphElement>

const Keyword = ({ children, className, ...props }: KeywordProps) => {
  return (
    <span
      className={cn(
        'rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-bold text-gray-200 shadow-sm shadow-black/20',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Keyword
