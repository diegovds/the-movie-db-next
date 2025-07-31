import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type TagH2Props = HTMLAttributes<HTMLHeadingElement>

const TagH2 = ({ children, className, ...props }: TagH2Props) => {
  return (
    <h2
      className={cn('mt-6 text-lg font-semibold text-gray-100', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export default TagH2
