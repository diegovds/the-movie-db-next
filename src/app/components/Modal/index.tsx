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
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center backdrop-blur-sm">
      <div
        ref={contentRef}
        className="w-[97%] rounded-xl bg-gray-50 p-5 shadow-2xl sm:w-[60%]"
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
