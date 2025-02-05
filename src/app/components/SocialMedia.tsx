import { HTMLAttributes } from 'react'
import { FaFacebook, FaImdb, FaInstagram } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import Anchor from './Anchor'
import { cn } from '@/libs/utils'

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
      className={cn('flex justify-center gap-6 md:justify-start', className)}
      {...props}
    >
      {face !== null && face !== '' && (
        <Anchor
          href={`https://www.facebook.com/${face}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook />
        </Anchor>
      )}
      {insta !== null && insta !== '' && (
        <Anchor
          href={`https://www.instagram.com/${insta}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </Anchor>
      )}
      {x !== null && x !== '' && (
        <Anchor href={`https://x.com/${x}`} target="_blank" rel="noreferrer">
          <FaSquareXTwitter />
        </Anchor>
      )}
      {imdb !== null && imdb !== '' && (
        <Anchor
          href={`https://www.imdb.com/pt/title/${imdb}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaImdb />
        </Anchor>
      )}
    </div>
  )
}

export default SocialMedia
