import { FaFacebook, FaImdb, FaInstagram } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import Anchor from './Anchor'

type SocialMediaProps = {
  face: string
  insta: string
  x: string
  imdb: string
}

const SocialMedia = ({ face, imdb, insta, x }: SocialMediaProps) => {
  return (
    <div className="flex justify-center gap-6 md:justify-start">
      {face !== null && (
        <Anchor
          href={`https://www.facebook.com/${face}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook />
        </Anchor>
      )}
      {insta !== null && (
        <Anchor
          href={`https://www.instagram.com/${insta}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </Anchor>
      )}
      {x !== null && (
        <Anchor href={`https://x.com/${x}`} target="_blank" rel="noreferrer">
          <FaSquareXTwitter />
        </Anchor>
      )}
      {imdb !== null && (
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
