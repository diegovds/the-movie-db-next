'use client'

import { Movie } from '@/types/Movies'
import { useState } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import Modal from '.'

type ModalDivProps = {
  movie: Movie
}

const ModalDiv = ({ movie }: ModalDivProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 text-lg font-bold transition-opacity hover:opacity-80"
      >
        <BsPlayFill size={40} /> Reproduzir trailer
      </button>
      {isOpen && (
        <Modal closeModal={handleIsOpen}>
          <div className="mb-2 flex justify-between">
            <h3 className="text-xl font-bold text-black md:text-4xl">
              Trailer
            </h3>
            <button onClick={() => handleIsOpen()}>
              <IoClose className="rounded-full bg-black text-2xl transition-opacity hover:opacity-80 md:text-4xl" />
            </button>
          </div>
          <iframe
            width="100%"
            className="aspect-video"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </Modal>
      )}
    </div>
  )
}

export default ModalDiv
