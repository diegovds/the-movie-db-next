const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-[#131313] p-2 text-gray-300">
      <h3 className="mb-1 text-xs">
        Desenvolvido por{' '}
        <a
          href="https://portfoliodiegoviana.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold hover:opacity-50"
        >
          Diego Viana
        </a>
      </h3>
      <p className="text-xs">
        Acesso ao repositório no{' '}
        <a
          href="https://github.com/diegovds/the-movie-db-next"
          target="_blank"
          rel="noreferrer"
          className="font-semibold hover:opacity-50"
        >
          Github
        </a>
      </p>
    </footer>
  )
}

export default Footer
