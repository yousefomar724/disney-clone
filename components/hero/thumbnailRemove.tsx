import { XCircleIcon } from '@heroicons/react/solid'
import { useGlobalContext } from '../../context'
import { Movie } from '../../types'

const ThumbnailRemove = ({ movie }: { movie: Movie }) => {
  const { removeFavorite } = useGlobalContext()
  return (
    <span title="Remove from watchlist">
      <XCircleIcon
        className="h-10 text-red-600"
        onClick={() => removeFavorite(movie)}
      />
    </span>
  )
}

export default ThumbnailRemove
