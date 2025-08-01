'use client'

import { Movie } from '@/types/Movies'
import { Serie } from '@/types/Series'
import { useState } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import Modal from '.'

type ModalDivProps = {
  movie?: Movie
  serie?: Serie
}

const ModalDiv = ({ movie, serie }: ModalDivProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = () => {
    setIsOpen(false)
  }

  return (
    <div className="my-6">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 text-lg font-semibold transition-opacity hover:opacity-80"
      >
        <BsPlayFill size={40} /> Reproduzir trailer
      </button>
      {isOpen && (
        <Modal closeModal={handleIsOpen}>
          <div className="mb-3 flex justify-between">
            <h3 className="text-2xl font-bold text-gray-100 md:text-3xl">
              Trailer
            </h3>
            <button onClick={() => handleIsOpen()}>
              <IoClose className="rounded-full bg-gray-100 text-2xl text-black transition-opacity hover:opacity-85 md:text-3xl" />
            </button>
          </div>
          {movie && (
            <iframe
              width="100%"
              className="aspect-video"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
          {serie && (
            <iframe
              width="100%"
              className="aspect-video"
              src={`https://www.youtube.com/embed/${serie.videos.results[0].key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </Modal>
      )}
    </div>
  )
}

export default ModalDiv
