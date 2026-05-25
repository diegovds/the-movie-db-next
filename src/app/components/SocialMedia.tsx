import { cn } from '@/libs/utils'
import { HTMLAttributes } from 'react'
import { FaFacebook, FaImdb, FaInstagram } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import Anchor from './Anchor'

type SocialMediaProps = HTMLAttributes<HTMLDivElement> & {
  face: string
  insta: string
  x: string
  imdb: string
}

const SocialMedia = ({
  face,
  insta,
  x,
  imdb,
  className,
  ...props
}: SocialMediaProps) => {
  return (
    <div
      className={cn('flex justify-center gap-3 md:justify-start', className)}
      {...props}
    >
      {face !== null && face !== '' && (
        <Anchor
          href={`https://www.facebook.com/${face}`}
          target="_blank"
          rel="noreferrer"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl md:text-xl"
        >
          <FaFacebook />
        </Anchor>
      )}
      {insta !== null && insta !== '' && (
        <Anchor
          href={`https://www.instagram.com/${insta}`}
          target="_blank"
          rel="noreferrer"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl md:text-xl"
        >
          <FaInstagram />
        </Anchor>
      )}
      {x !== null && x !== '' && (
        <Anchor
          href={`https://x.com/${x}`}
          target="_blank"
          rel="noreferrer"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl md:text-xl"
        >
          <FaSquareXTwitter />
        </Anchor>
      )}
      {imdb !== null && imdb !== '' && (
        <Anchor
          href={`https://www.imdb.com/pt/title/${imdb}`}
          target="_blank"
          rel="noreferrer"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl md:text-xl"
        >
          <FaImdb />
        </Anchor>
      )}
    </div>
  )
}

export default SocialMedia
