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
    <nav className="flex flex-col justify-between bg-[#131313] px-6 py-1 md:flex-row md:py-2">
      <div className="flex flex-col md:flex-row md:gap-6">
        <div className="flex justify-between">
          <Link className="flex items-center" href={`/`}>
            <Image src={logo} width={40} alt="Logo" />
          </Link>

          <div className="text-gray-300 md:hidden">
            <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
          </div>
        </div>
        <ul
          className={`flex items-center gap-3 ${isOpen ? 'flex-col justify-center' : 'hidden flex-row justify-start md:flex'}`}
        >
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
      </div>
      <form
        className={`flex gap-2 ${isOpen ? 'mb-4 mt-3 justify-center' : 'hidden justify-start md:flex'}`}
        onSubmit={handleSubmit(onSubmit)}
      >
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
    </nav>
  )
}

export default Navbar
