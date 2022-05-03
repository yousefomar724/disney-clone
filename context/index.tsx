import { createContext, SetStateAction, useContext, useState } from 'react'
import { Movie } from '../types'

type Props = {
  favorites: Movie[]
  setFavorites: (item: SetStateAction<any[]>) => void
  addToFavorites: (item: Movie) => void
  removeFavorite: (item: Movie) => void
}

const AppContext = createContext<Props>({
  favorites: [],
  setFavorites: ({}) => [],
  addToFavorites: ({}) => [],
  removeFavorite: ({}) => [],
})

type ProviderProps = { children: React.ReactNode }

const AppProvider = ({ children }: ProviderProps) => {
  const saveToLocalStorage = (items: Movie[]) => {
    localStorage.setItem('Favorite-Movies', JSON.stringify(items))
  }

  const [favorites, setFavorites] = useState<any[]>([])

  const addToFavorites = (item: any) => {
    const newFavorites = favorites.includes(item)
      ? [...favorites]
      : [...favorites, item]

    setFavorites(newFavorites)
    saveToLocalStorage(newFavorites)
  }
  const removeFavorite = (item: Movie) => {
    const newFavorites = favorites.filter((fav) => fav.id !== item.id)
    setFavorites(newFavorites)
    saveToLocalStorage(newFavorites)
  }
  return (
    <AppContext.Provider
      value={{
        favorites,
        setFavorites,
        addToFavorites,
        removeFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider, AppContext }
