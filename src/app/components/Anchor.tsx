import { cn } from '@/libs/utils'
import { AnchorHTMLAttributes } from 'react'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

const Anchor = ({ children, className, ...props }: AnchorProps) => {
  return (
    <a
      className={cn('h-fit text-3xl hover:opacity-80 md:text-4xl', className)}
      {...props}
    >
      {children}
    </a>
  )
}

export default Anchor
