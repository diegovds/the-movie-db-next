'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useClickAway } from 'react-use'

type ModalProps = {
  children: React.ReactNode
  closeModal: () => void
}

const Modal = ({ children, closeModal }: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useClickAway(contentRef, closeModal)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md">
      <div
        ref={contentRef}
        className="cinema-panel w-full max-w-5xl rounded-lg p-4 sm:p-6"
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
