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
    <div className="my-7">
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-black text-black shadow-xl shadow-black/25 transition-transform hover:scale-[1.02]"
      >
        <BsPlayFill size={28} /> Reproduzir trailer
      </button>
      {isOpen && (
        <Modal closeModal={handleIsOpen}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-2xl font-black text-gray-100 md:text-3xl">
              Trailer
            </h3>
            <button onClick={() => handleIsOpen()} aria-label="Fechar trailer">
              <IoClose className="rounded-full bg-white p-1 text-3xl text-black transition-transform hover:scale-105" />
            </button>
          </div>
          {movie && (
            <iframe
              width="100%"
              className="aspect-video rounded-md"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
          {serie && (
            <iframe
              width="100%"
              className="aspect-video rounded-md"
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
