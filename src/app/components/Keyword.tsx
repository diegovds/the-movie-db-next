import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type KeywordProps = HTMLAttributes<HTMLParagraphElement>

const Keyword = ({ children, className, ...props }: KeywordProps) => {
  return (
    <p
      className={cn('rounded-md bg-slate-300 p-1 text-slate-500', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export default Keyword
