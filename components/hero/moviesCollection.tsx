import { useEffect } from 'react'
import { useGlobalContext } from '../../context'
import { Movie } from '../../types'
import ThumbanilCheck from './thumbanilCheck'
import Thumbnail from './thumbnail'
import ThumbnailAdd from './thumbnailAdd'
import ViewMoreBtn from './viewMoreBtn'

interface Props {
  movies: Movie[]
  title: string
}
const MoviesCollection = ({ movies, title }: Props) => {
  const { favorites, setFavorites } = useGlobalContext()

  useEffect(() => {
    const ac = new AbortController()
    const previouslyFav = JSON.parse(localStorage.getItem('Favorite-Movies')!)
    setFavorites(previouslyFav || [])
    return () => ac.abort()
  }, [])

  return (
    <div className="realtive flex flex-col space-y-2 my-10 px-8 max-w[1400px] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{title}</h2>
        <ViewMoreBtn route="movies" />
      </div>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
        {movies.map((movie) => (
          <Thumbnail
            key={movie.id}
            data={movie}
            route="movie"
            icon={
              favorites?.some((m) => m?.id === movie.id) ? (
                <ThumbanilCheck />
              ) : (
                <ThumbnailAdd item={movie} />
              )
            }
          />
        ))}
      </div>
    </div>
  )
}

export default MoviesCollection
