const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0d0e10]/95 px-3 py-6 text-gray-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 text-center text-xs sm:flex-row sm:text-left">
        <h3>
          Desenvolvido por{' '}
          <a
            href="https://portfoliodiegoviana.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-gray-100 transition-colors hover:text-[var(--gold)]"
          >
            Diego Viana
          </a>
        </h3>
        <p>
          Repositório no{' '}
          <a
            href="https://github.com/diegovds/the-movie-db-next"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-gray-100 transition-colors hover:text-[var(--gold)]"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
