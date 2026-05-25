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
  query: z.string().trim().min(1),
})

type FormData = z.infer<typeof formSchema>

const navItems = [
  { href: '/', label: 'Filmes' },
  { href: '/tv', label: 'Séries' },
  { href: '/person', label: 'Artistas' },
]

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
    router.push(`/search/movie/${encodeURIComponent(query)}`)
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#101113]/90 backdrop-blur-xl">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex min-h-16 flex-col justify-center py-2 md:flex-row md:items-center md:justify-between md:gap-5 md:py-3">
          <div className="flex items-center justify-between">
            <Link
              className="group flex items-center gap-3"
              href="/"
              aria-label="The Movie BD"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] shadow-lg shadow-black/30 transition-transform group-hover:scale-105">
                <Image src={logo} width={28} alt="Logo The Movie BD" />
              </span>
              <span className="hidden leading-none sm:block">
                <span className="block text-sm font-black uppercase tracking-[0.24em] text-white">
                  Movie BD
                </span>
                <span className="text-xs text-[var(--muted)]">
                  catálogo cinéfilo
                </span>
              </span>
            </Link>
            <div className="text-gray-200 md:hidden">
              <Hamburger size={22} toggled={isOpen} toggle={setOpen} />
            </div>
          </div>

          <div
            className={`flex flex-1 flex-col-reverse items-stretch gap-4 overflow-hidden transition-all duration-300 ease-out md:max-h-none md:flex-row md:items-center md:justify-between md:overflow-visible md:opacity-100 ${
              isOpen ? 'max-h-52 pt-4 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="flex flex-col gap-2 md:flex-row md:items-center">
              {navItems.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-full px-4 py-2 text-sm font-bold transition-all ${
                        active
                          ? 'bg-[var(--gold)] text-black shadow-lg shadow-[#d9a441]/15'
                          : 'text-gray-300 hover:bg-white/[0.07] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <form
              className="flex min-w-0 rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-inner shadow-black/20 focus-within:border-[var(--gold)] md:w-[min(36vw,420px)]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder="Filme, série ou artista"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-gray-500"
                {...register('query', { required: true })}
              />
              <button
                type="submit"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105"
                aria-label="Pesquisar"
              >
                <IoMdSearch className="text-xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
