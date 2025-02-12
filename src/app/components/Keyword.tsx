import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type KeywordProps = HTMLAttributes<HTMLParagraphElement>

const Keyword = ({ children, className, ...props }: KeywordProps) => {
  return (
    <p
      className={cn('rounded-md bg-[#131313] p-1 text-gray-100', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export default Keyword
