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
    <nav className="flex flex-col justify-between bg-gray-800 px-6 py-1 md:flex-row md:py-2">
      <div className="flex justify-between">
        <Link className="flex items-center text-gray-300" href={`/`}>
          Icon
        </Link>

        <div className="text-gray-300 md:hidden">
          <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
      <ul
        className={`flex items-center gap-3 ${isOpen ? 'flex-col pb-3' : 'hidden flex-row md:flex'}`}
      >
        <li
          className={`${pathname === '/' ? 'bg-gray-300' : 'text-gray-300'} rounded-lg p-1`}
        >
          <Link href={`/`}>Filmes</Link>
        </li>
        <li
          className={`${pathname === '/tv' ? 'bg-gray-300' : 'text-gray-300'} rounded-lg p-1`}
        >
          <Link href={`/tv`}>Séries</Link>
        </li>
        <li
          className={`${pathname === '/person' ? 'bg-gray-300' : 'text-gray-300'} rounded-lg p-1`}
        >
          <Link href={`/person`}>Artistas</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
