type RatingCircleProps = {
  voteAverage?: number
}

const RatingCircle = ({ voteAverage }: RatingCircleProps) => {
  const vote = voteAverage ? parseFloat(voteAverage.toFixed(0)) * 10 : 0
  const color =
    vote <= 35
      ? 'border-[var(--rose)] text-[var(--rose)]'
      : vote > 35 && vote <= 70
        ? 'border-[var(--gold)] text-[var(--gold)]'
        : 'border-[var(--green)] text-[var(--green)]'

  return (
    <p
      className={`absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full border-2 bg-black/80 text-xs font-black shadow-xl backdrop-blur ${color}`}
    >
      {vote}
    </p>
  )
}

export default RatingCircle
