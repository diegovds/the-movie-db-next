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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#050505]/90 p-3 backdrop-blur-xl sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,164,65,0.18),transparent_34rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-70" />
      <div
        ref={contentRef}
        className="cinema-panel relative my-auto w-full max-w-6xl overflow-hidden rounded-lg p-0 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
