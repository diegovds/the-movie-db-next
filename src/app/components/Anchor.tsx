import { cn } from '@/libs/utils'
import { AnchorHTMLAttributes } from 'react'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

const Anchor = ({ children, className, ...props }: AnchorProps) => {
  return (
    <a className={cn('text-3xl md:text-4xl', className)} {...props}>
      {children}
    </a>
  )
}

export default Anchor
