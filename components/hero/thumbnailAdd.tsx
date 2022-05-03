import { PlusCircleIcon } from '@heroicons/react/solid'
import { useGlobalContext } from '../../context'
import { Movie } from '../../types'

const ThumbnailAdd = ({ item }: { item: Movie }) => {
  const { addToFavorites } = useGlobalContext()
  return (
    <span title="Add to watchlist">
      <PlusCircleIcon onClick={() => addToFavorites(item)} className="h-10" />
    </span>
  )
}

export default ThumbnailAdd
