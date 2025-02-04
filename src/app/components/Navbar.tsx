'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Rotate as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { z } from 'zod'

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
    <nav className="flex flex-col justify-between bg-gray-800 px-6 py-1 md:flex-row md:py-2">
      <div className="flex justify-between">
        <Link className="flex items-center text-gray-300" href={`/`}>
          Icon
        </Link>

        <div className="text-gray-300 md:hidden">
          <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Filme, série ou artista"
          className="rounded-lg bg-gray-300 p-1 outline-none placeholder:text-gray-400"
          {...register('query', { required: true })}
        />
        <button type="submit">
          <FaSearch
            className="h-full rounded-md bg-gray-300 px-1 transition-opacity hover:opacity-85"
            size={22}
          />
        </button>
      </form>
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
