import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import ThumbanilCheck from '../components/hero/thumbanilCheck'
import Thumbnail from '../components/hero/thumbnail'
import ThumbnailAdd from '../components/hero/thumbnailAdd'
import Header from '../components/topbar/header'
import { useGlobalContext } from '../context'
import data from '../data/data'
import { Movie } from '../types'

const defaultMovies = (cat: string, page: number) => {
  return `https://api.themoviedb.org/3/movie/${cat}?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=${page}`
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  const [popularMoviesRes, topRatedMoviesRes, upcomingMoviesRes] =
    await Promise.all([
      fetch(defaultMovies('popular', 1)),
      fetch(defaultMovies('top_rated', 1)),
      fetch(defaultMovies('upcoming', 1)),
    ])
  const [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
    popularMoviesRes.json(),
    topRatedMoviesRes.json(),
    upcomingMoviesRes.json(),
  ])

  return {
    props: {
      session,
      movies: [
        popularMovies.results,
        topRatedMovies.results,
        upcomingMovies.results,
      ],
    },
  }
}

const Movies = ({ movies }: { movies: Movie[][] }) => {
  const [value, setValue] = useState(0)
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState(movies)
  const selectedMovies = allMovies[value]
  const {
    moviesData: { tabs },
  } = data

  useEffect(() => {
    const request = async () => {
      if (page > 1) {
        if (value === 0) {
          const response = await fetch(defaultMovies('popular', page))
          const popular = await response.json()
          setAllMovies((previousMovies) => [
            [...previousMovies[0], ...popular.results],
            [...previousMovies[1]],
            [...previousMovies[2]],
          ])
        }
        if (value === 1) {
          const response = await fetch(defaultMovies('top_rated', page))
          const topRated = await response.json()
          setAllMovies((previousMovies) => [
            [...previousMovies[0]],
            [...previousMovies[1], ...topRated.results],
            [...previousMovies[2]],
          ])
        }
        if (value === 2) {
          const response = await fetch(defaultMovies('upcoming', page))
          const upcoming = await response.json()
          setAllMovies((previousMovies) => [
            [...previousMovies[0]],
            [...previousMovies[1]],
            [...previousMovies[2], ...upcoming.results],
          ])
        }
      }
      return
    }
    request()
  }, [page])

  const loadMore = () => {
    setPage(page + 1)
  }

  const { favorites, setFavorites } = useGlobalContext()
  useEffect(() => {
    const previouslyFav = JSON.parse(localStorage.getItem('Favorite-Movies')!)
    setFavorites(previouslyFav)
  }, [])
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session])
  return (
    <>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
          <div className="flex mx-auto items-center justify-center flex-wrap mb-20">
            {tabs.map((tab, index) => {
              return (
                <a
                  key={tab.id}
                  onClick={() => setValue(index)}
                  className={` cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none  text-white tracking-wider rounded-t ${
                    index === value && 'border-indigo-500 bg-gray-800'
                  }`}
                >
                  {tab.text}
                </a>
              )
            })}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 overflow-y-hidden p-2 -m-2">
            {selectedMovies?.map((selectedMovie: any, index) => {
              return (
                <Thumbnail
                  key={index}
                  data={selectedMovie}
                  route="movie"
                  icon={
                    favorites.some((m) => m.id === selectedMovie.id) ? (
                      <ThumbanilCheck />
                    ) : (
                      <ThumbnailAdd movie={selectedMovie} />
                    )
                  }
                />
              )
            })}
          </div>
          {page < 16 && (
            <button
              onClick={loadMore}
              className="justify-center md:text-base w-fit mx-auto mt-8 bg-[#f9f9f9] text-black flex items-center py-2 px-5 rounded-full hover:bg-[#c6c6c6] font-bold"
            >
              Load More
            </button>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Movies
