'use client'

type Props = {
  click: () => void
}

type PaginationButtonProps = React.HTMLProps<HTMLButtonElement> & Props

const PaginationButton = ({ children, click }: PaginationButtonProps) => {
  return (
    <button
      onClick={() => click()}
      className="min-w-8 rounded-md border border-solid border-gray-300 bg-blue-500 p-2 text-center text-white transition hover:bg-blue-300"
    >
      {children}
    </button>
  )
}

export default PaginationButton
