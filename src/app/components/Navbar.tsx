import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-between bg-slate-400 md:flex-row">
      <Link href={`/`}>Icon</Link>
      <ul>
        <li>
          <Link href={`/`}>Home</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
