import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'

type TagH2Props = HTMLAttributes<HTMLHeadingElement>

const TagH2 = ({ children, className, ...props }: TagH2Props) => {
  return (
    <h2
      className={cn(
        'mt-7 text-lg font-black uppercase tracking-[0.16em] text-[var(--gold)]',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export default TagH2
