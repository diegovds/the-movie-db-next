'use client'

import { Rotate as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav className="flex flex-col justify-between bg-slate-400 md:flex-row">
      <div className="flex justify-between px-6 py-3">
        <Link className="flex items-center" href={`/`}>
          Icon
        </Link>

        <div className="md:hidden">
          <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
      <ul
        className={`flex items-center gap-3 ${isOpen ? 'flex-col pb-3' : 'hidden flex-row pr-6 md:flex'}`}
      >
        <li
          className={`${pathname === '/' ? 'bg-white' : 'bg-slate-400'} rounded-lg p-1`}
        >
          <Link href={`/`}>Filmes</Link>
        </li>
        <li
          className={`${pathname === '/tv' ? 'bg-white' : 'bg-slate-400'} rounded-lg p-1`}
        >
          <Link href={`/tv`}>Séries</Link>
        </li>
        <li
          className={`${pathname === '/person' ? 'bg-white' : 'bg-slate-400'} rounded-lg p-1`}
        >
          <Link href={`/person`}>Artistas</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
