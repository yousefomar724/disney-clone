import { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import data from '../data/data'
import Head from 'next/head'
import Brands from '../components/hero/brands'
import MoviesCollection from '../components/hero/moviesCollection'
import ShowsCollection from '../components/hero/showsCollection'
import Slider from '../components/hero/slider'
import Header from '../components/topbar/header'
import Welcome from '../components/welcome/welcome'
import { Movie, Show } from '../types'
import Main from '../components/main'
import Footer from '../components/footer'

const moviesApiKey = `${process.env.MOVIES_API_KEY!}`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const [
    popularMoviesRes,
    upcomingMoviesRes,
    popularShowsRes,
    topRatedMoviesRes,
    topRatedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${moviesApiKey}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${moviesApiKey}&language=en-US&page=1&append_to_response=videos`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${moviesApiKey}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${moviesApiKey}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${moviesApiKey}&language=en-US&page=1`
    ),
  ])
  const [
    popularMovies,
    upcomingMovies,
    popularShows,
    topRatedMovies,
    topRatedShows,
  ] = await Promise.all([
    popularMoviesRes.json(),
    upcomingMoviesRes.json(),
    popularShowsRes.json(),
    topRatedMoviesRes.json(),
    topRatedShowsRes.json(),
  ])
  return {
    props: {
      session,
      movies: {
        popularMovies: popularMovies.results,
        topRatedMovies: topRatedMovies.results,
        upcomingMovies: upcomingMovies.results,
      },
      shows: {
        popularShows: popularShows.results,
        topRatedShows: topRatedShows.results,
      },
    },
  }
}

interface Props {
  movies: {
    popularMovies: Movie[]
    upcomingMovies: Movie[]
    topRatedMovies: Movie[]
  }
  shows: { popularShows: Show[]; topRatedShows: Show[] }
}

const Home: NextPage<Props> = ({ movies, shows }) => {
  const { popularMovies, topRatedMovies, upcomingMovies } = movies
  const { popularShows, topRatedShows } = shows
  const { data: session } = useSession()
  const {
    headerData: { logo },
  } = data
  return (
    <div className="relative">
      <Head>
        <title>{logo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session?.user ? (
        <Welcome />
      ) : (
        <Main>
          <Slider upcomingMovies={upcomingMovies.slice(1, 7)} />
          <Brands />
          <MoviesCollection movies={popularMovies} title="Popular Movies" />
          <ShowsCollection shows={popularShows} title="Popular Shows" />
          <MoviesCollection movies={topRatedMovies} title="Top rated Movies" />
          <ShowsCollection shows={topRatedShows} title="Top rated Shows" />
          {session && <Footer />}
        </Main>
      )}
    </div>
  )
}

export default Home
