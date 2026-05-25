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
  const title = movie ? movie.title : serie?.name
  const videoKey = movie
    ? movie.videos.results[0].key
    : serie?.videos.results[0].key

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
          <div className="border-b border-white/10 bg-[#111214]/95 px-4 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--gold)]">
                  Trailer oficial
                </p>
                <h3 className="mt-1 line-clamp-2 text-2xl font-black leading-tight text-white sm:text-3xl">
                  {title}
                </h3>
              </div>
              <button
                onClick={() => handleIsOpen()}
                aria-label="Fechar trailer"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-white transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="bg-black p-2 sm:p-4">
            <div className="relative overflow-hidden rounded-md border border-white/10 bg-black shadow-2xl">
              <div className="absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-black/55 to-transparent" />
              {videoKey && (
                <iframe
                  width="100%"
                  className="aspect-video"
                  src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                  title={`Trailer de ${title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ModalDiv
