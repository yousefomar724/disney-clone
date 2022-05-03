import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Thumbnail from '../components/hero/thumbnail'
import ThumbnailRemove from '../components/hero/thumbnailRemove'
import Header from '../components/topbar/header'
import { useGlobalContext } from '../context'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}

const Profile = () => {
  const { favorites, removeFavorite, setFavorites } = useGlobalContext()
  const uniqueIds: number[] = []

  const filteredFavorites = favorites.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id)

    if (!isDuplicate) {
      uniqueIds.push(element.id)
      return true
    }

    return false
  })

  useEffect(() => {
    const ac = new AbortController()
    const previouslyFav = JSON.parse(localStorage.getItem('Favorite-Movies')!)
    setFavorites(previouslyFav)
    return () => ac.abort()
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
        <title>{session?.user?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
        <div className="flex justify-center items-center">
          <div className="mb-3 xl:w-96">
            <h2 className="font-bold text-xl text-center">
              Watchlist (Favorites)
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 overflow-y-hidden p-2 -m-2">
          {filteredFavorites?.map((item: any) => {
            return (
              <Thumbnail
                key={item.id}
                data={item}
                route="movie"
                removeFavorite={removeFavorite}
                icon={<ThumbnailRemove movie={item} />}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Profile
