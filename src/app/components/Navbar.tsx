'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Rotate as Hamburger } from 'hamburger-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdSearch } from 'react-icons/io'
import { z } from 'zod'
import logo from '../../assets/logo.png'

const formSchema = z.object({
  query: z.string(),
})

type FormData = z.infer<typeof formSchema>

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)

  const { handleSubmit, register, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    setOpen(false)
    reset()
  }, [pathname, reset])

  const onSubmit = ({ query }: FormData) => {
    router.push(`/search/movie/${query}`)
  }

  return (
    <nav className="bg-[#131313]">
      <div className="container mx-auto flex flex-col justify-between px-3 py-1 md:flex-row md:gap-4 md:py-3">
        <div className="flex justify-between">
          <Link className="flex items-center" href={`/`}>
            <Image src={logo} width={40} alt="Logo" />
          </Link>
          <div className="text-gray-300 md:hidden">
            <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
          </div>
        </div>
        <div
          className={`flex flex-1 flex-col-reverse items-center justify-between gap-4 transition-all duration-300 ease-in-out md:flex-row md:items-start md:gap-0 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <ul className={`flex flex-col items-center gap-3 md:flex-row`}>
            <li
              className={`${pathname === '/' ? 'bg-gray-300' : 'text-gray-300'} rounded-lg p-1 transition-opacity hover:opacity-85`}
            >
              <Link href={`/`}>Filmes</Link>
            </li>
            <li
              className={`${pathname === '/tv' ? 'bg-gray-300' : 'text-gray-300'} rounded-lg p-1 transition-opacity hover:opacity-85`}
            >
              <Link href={`/tv`}>Séries</Link>
            </li>
            <li
              className={`${pathname === '/person' ? 'bg-gray-300' : 'text-gray-300'} rounded-lg p-1 transition-opacity hover:opacity-85`}
            >
              <Link href={`/person`}>Artistas</Link>
            </li>
          </ul>
          <form className={`flex gap-2`} onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Filme, série ou artista"
              className="w-60 rounded-lg bg-gray-300 p-1 text-sm outline-none placeholder:text-gray-400"
              {...register('query', { required: true })}
            />
            <button type="submit" className="w-8">
              <IoMdSearch className="h-full w-full rounded-md bg-gray-300 px-1 transition-opacity hover:opacity-85" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
