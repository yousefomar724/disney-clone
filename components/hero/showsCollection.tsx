import { useEffect } from 'react'
import { useGlobalContext } from '../../context'
import { Show } from '../../types'
import ThumbanilCheck from './thumbanilCheck'
import Thumbnail from './thumbnail'
import ThumbnailAdd from './thumbnailAdd'
import ViewMoreBtn from './viewMoreBtn'

interface Props {
  shows: Show[]
  title: string
}

const ShowsCollection = ({ shows, title }: Props) => {
  const { favorites, setFavorites } = useGlobalContext()

  useEffect(() => {
    const previouslyFav = JSON.parse(localStorage.getItem('Favorite-Movies')!)
    setFavorites(previouslyFav || [])
  }, [])

  return (
    <div className="realtive flex flex-col space-y-2 my-10 px-8 max-w[1400px] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{title}</h2>
        <ViewMoreBtn route="shows" />
      </div>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
        {shows.map((show) => (
          <Thumbnail
            key={show.id}
            data={show}
            route="tv"
            icon={
              favorites?.some((m) => m.id === show.id) ? (
                <ThumbanilCheck />
              ) : (
                <ThumbnailAdd item={show} />
              )
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ShowsCollection
