'use client'

import { useRef } from 'react'
import { useClickAway } from 'react-use'

type ModalProps = {
  children: React.ReactNode
  closeModal: () => void
}

const Modal = ({ children, closeModal }: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useClickAway(contentRef, closeModal)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-md">
      <div
        ref={contentRef}
        className="cinema-panel w-full max-w-5xl rounded-lg p-4 sm:p-6"
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
