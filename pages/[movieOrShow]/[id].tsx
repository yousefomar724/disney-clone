import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CastList from '../../components/details/castList'
import DetailsBtn from '../../components/details/detailsBtn'
import PlayBtn from '../../components/details/playBtn'
import TrailerBtn from '../../components/details/trailerBtn'
import TrailerModal from '../../components/details/trailerModal'
import VidList from '../../components/details/vidList'
import Footer from '../../components/footer'
import MoviesCollection from '../../components/hero/moviesCollection'
import ThumbanilCheck from '../../components/hero/thumbanilCheck'
import ThumbnailAdd from '../../components/hero/thumbnailAdd'
import Header from '../../components/topbar/header'
import Welcome from '../../components/welcome/welcome'
import { useGlobalContext } from '../../context'
import { Movie, Result, Reviews } from '../../types'
import reviewImg from '../../public/images/default.png'

const defaultExtras = (
  type: string | string[] | undefined,
  id: string | string[] | undefined,
  extra: string
) => {
  return `https://api.themoviedb.org/3/${type}/${id}/${extra}?api_key=${process.env.MOVIES_API_KEY}&language=en-US`
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, movieOrShow } = context.query
  const session = await getSession(context)

  const [
    detailsRes,
    creditRes,
    vidsRes,
    similarRes,
    recommendationsRes,
    reviewsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/${movieOrShow}/${id}?api_key=${process.env.MOVIES_API_KEY}&language=en-US&append_to_response=videos`
    ),
    fetch(defaultExtras(movieOrShow, id, 'credits')),
    fetch(defaultExtras(movieOrShow, id, 'videos')),
    fetch(defaultExtras(movieOrShow, id, 'similar')),
    fetch(defaultExtras(movieOrShow, id, 'recommendations')),
    fetch(defaultExtras(movieOrShow, id, 'reviews')),
  ])
  const [details, credit, vids, similar, recommendations, reviews] =
    await Promise.all([
      detailsRes.json(),
      creditRes.json(),
      vidsRes.json(),
      similarRes.json(),
      recommendationsRes.json(),
      reviewsRes.json(),
    ])
  return {
    props: {
      details,
      credit,
      vids: vids.results,
      similar: similar.results,
      recommendations: recommendations.results,
      reviews: reviews.results,
      session,
    },
  }
}

interface Props {
  details: Movie
  credit: any
  vids: {
    name: string
    key: string
    type?: string
  }[]
  similar: any
  recommendations: any
  reviews: Result[]
}

const Details = ({
  details,
  credit,
  vids,
  similar,
  recommendations,
  reviews,
}: Props) => {
  console.log(reviews)
  const { favorites } = useGlobalContext()
  const [showTrailer, setShowTrailer] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const dialogRef = useRef<any>(null)
  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session])

  const {
    title,
    original_title,
    poster_path,
    backdrop_path,
    release_date,
    first_air_date,
    runtime,
    genres,
    overview,
    videos,
    original_name,
    status,
    name,
    homepage,
  } = details
  const BASE_URL_original = 'https://image.tmdb.org/t/p/original'
  const BASE_URL_w500 = 'https://image.tmdb.org/t/p/w500'
  const originalSrc =
    `${BASE_URL_original}${backdrop_path || poster_path}` ||
    `${BASE_URL_original} ${poster_path}`
  const w500Src =
    `${BASE_URL_w500}${poster_path || backdrop_path}` ||
    `${BASE_URL_w500} ${backdrop_path}`
  return (
    <div>
      <Head>
        <title>{title || original_title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Welcome />
      ) : (
        <>
          <section className="relative z-50">
            <div className="relative min-h-screen max-w-[1400px] mx-auto z-[11]">
              <Image
                loader={() => originalSrc}
                src={originalSrc}
                unoptimized
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <div className="flex flex-row-reverse justify-center items-center h-screen max-w-4xl max-h-[80%] mx-auto gap-5 absolute inset-y-28 md:inset-y-auto md:px-4 md:bottom-10 inset-x-4 md:inset-x-12 z-[14]">
              <div className="flex flex-col gap-2 md:gap-4 z-[14] max-h-screen">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">
                  {title || name || original_title || original_name}
                </h1>
                <div className="hidden sm:flex items-center space-x-3 md:space-x-5">
                  <PlayBtn url={homepage ? homepage : '/'} />
                  <TrailerBtn setShowTrailer={setShowTrailer} />
                  <DetailsBtn title="Reviews">
                    {favorites?.some((m) => m.id === details.id) ? (
                      <ThumbanilCheck />
                    ) : (
                      <ThumbnailAdd item={details} />
                    )}
                  </DetailsBtn>
                  <button
                    className="rounded-full border-2 outline-none border-white flex items-center justify-center w-8 h-8 cursor-pointer bg:black/60"
                    title="Add review"
                    onClick={() => dialogRef.current.showModal()}
                  >
                    <img src="/images/group-icon.svg" alt="group" />
                  </button>
                  <dialog className="w-full rounded-2xl" ref={dialogRef}>
                    <div className="bg-white mb-4">
                      <header className="flex items-center justify-between px-4 py-2 mb-6 font-bold bg-[#efefef]">
                        {title || name || original_title || original_name}
                        <button
                          className="text-2xl"
                          onClick={() => dialogRef?.current?.close()}
                        >
                          ✕
                        </button>
                      </header>
                      <section className="flex flex-col gap-6 px-4">
                        {reviews.length > 0 ? (
                          reviews.map((review, index) => {
                            const {
                              author_details: {
                                name,
                                avatar_path,
                                rating,
                                username,
                              },
                              content,
                            } = review
                            const BASE_URL_w500 =
                              'https://image.tmdb.org/t/p/w500'
                            const BASE_URL_original =
                              'https://image.tmdb.org/t/p/original'
                            const w500Src = `${BASE_URL_w500}${avatar_path}`
                            const originalSrc = `${BASE_URL_original}${avatar_path}`
                            return (
                              <div
                                className="flex content-center flex-col gap-4"
                                key={index}
                              >
                                <div className="flex gap-2">
                                  <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={
                                      w500Src || originalSrc
                                        ? `/images/default.png`
                                        : w500Src
                                    }
                                    alt={name}
                                  />
                                  <div className="flex flex-col">
                                    <h6 className="font-bold">
                                      {name ? name : 'Unknown'}
                                    </h6>
                                    <span className="font-thin text-xs">
                                      @{username}
                                    </span>
                                  </div>
                                  <span className="flex items-center gap-1 text-xs ml-auto">
                                    Rating:
                                    <span className="font-bold text-sm">
                                      {rating ? rating : 5}
                                    </span>
                                  </span>
                                </div>

                                <p className="">{content}</p>
                              </div>
                            )
                          })
                        ) : (
                          <h2 className="text-center text-xl font-bold">
                            No Reviews Found :/
                          </h2>
                        )}
                      </section>
                    </div>
                  </dialog>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  {genres &&
                    genres.map((genre: { name: string }, index) => {
                      return (
                        <span
                          className="py-[0.2rem] px-2 rounded-3xl border-2 text-sm cursor-pointer border-gray-300"
                          key={index}
                        >
                          {genre.name}
                        </span>
                      )
                    })}
                </div>
                <p className="text-xs md:text-sm">
                  {release_date?.toString() ||
                    first_air_date?.toString() ||
                    '2000-12-24'}{' '}
                  |{' '}
                  {(runtime && (
                    <b className="text-base">
                      {' '}
                      {Math.floor(runtime / 60)}h {runtime % 60}m{' '}
                    </b>
                  )) ||
                    status}
                </p>
                <h4 className="text-xs md:text-sm max-w-4xl">
                  {overview.length > 400
                    ? `${overview.slice(0, 400)}...`
                    : overview}
                </h4>
                {credit.cast.length > 1 && <CastList casts={credit?.cast} />}
              </div>
              <div className="rounded-xl z-[14] hidden lg:flex hover:shadow-xl hover:scale-[1.01] transition duration-20 cursor-pointer">
                <Image
                  src={w500Src}
                  loader={() => w500Src}
                  width={300}
                  height={420}
                  unoptimized
                  layout="fixed"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>
            {/* Bg Overlay */}
            <div className="absolute inset-0 bg-black opacity-70 h-full w-full z-[12]" />

            <TrailerModal
              videos={videos}
              showTrailer={showTrailer}
              title={title}
              original_title={original_title}
              setShowTrailer={setShowTrailer}
            />
          </section>
          <VidList vids={vids} />
          {similar.length > 1 && (
            <MoviesCollection movies={similar} title={'Similar'} />
          )}
          {recommendations.length > 1 && (
            <MoviesCollection
              movies={recommendations}
              title={'Recommendations'}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  )
}

export default Details
