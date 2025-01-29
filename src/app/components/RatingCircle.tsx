type RatingCircleProps = {
  voteAverage?: number
}

const RatingCircle = ({ voteAverage }: RatingCircleProps) => {
  const vote = voteAverage ? parseFloat(voteAverage.toFixed(0)) * 10 : 0
  const color =
    vote <= 35
      ? 'ring-red-600'
      : vote > 35 && vote <= 70
        ? 'ring-yellow-400'
        : 'ring-green-600'

  return (
    <p
      className={`absolute ml-3 mt-3 rounded-full bg-black p-2 text-xs text-white ring-4 ${color}`}
    >
      {vote}
    </p>
  )
}

export default RatingCircle
