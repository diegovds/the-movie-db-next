type GridColumnsProps = {
  children: React.ReactNode
}

const GridColumns = ({ children }: GridColumnsProps) => {
  return (
    <div className="mx-auto my-0 grid w-[97%] grid-cols-[repeat(auto-fill,_minmax(11.25rem,_1fr))] gap-5 md:w-[94%] md:gap-10">
      {children}
    </div>
  )
}

export default GridColumns
