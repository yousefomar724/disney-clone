import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useGlobalContext } from '../../context'
import { Movie } from '../../types'
import DetailsBtn from '../details/detailsBtn'
import SliderBtn from './sliderBtn'
import ThumbanilCheck from './thumbanilCheck'
import ThumbnailAdd from './thumbnailAdd'

interface Props {
  upcomingMovies: Movie[]
}
const Slider = ({ upcomingMovies }: Props) => {
  const { favorites } = useGlobalContext()
  const [readMore, setReadMore] = useState(false)
  const BASE_URL_original = 'https://image.tmdb.org/t/p/original'
  const BASE_URL_w500 = 'https://image.tmdb.org/t/p/w500'
  return (
    <section className=" shadow-2xl max-w-screen-2xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {upcomingMovies.map((slide) => {
          const {
            id,
            title,
            original_title,
            poster_path,
            backdrop_path,
            overview,
          } = slide

          const originalSrc =
            `${BASE_URL_original}${backdrop_path || poster_path}` ||
            `${BASE_URL_original} ${poster_path}`
          const w500Src =
            `${BASE_URL_w500}${poster_path || backdrop_path}` ||
            `${BASE_URL_w500} ${backdrop_path}`
          return (
            <section className="relative z-50" key={id}>
              <div className="relative min-h-screen max-w-[1400px] mx-auto z-[11]">
                <Image
                  loader={() => originalSrc}
                  src={originalSrc}
                  layout="fill"
                  unoptimized
                  objectFit="cover"
                />
              </div>
              <div className="flex justify-center items-center h-screen max-w-4xl max-h-[80%] mx-auto gap-5 absolute inset-y-28 md:inset-y-auto px-4 md:bottom-10 inset-x-4 md:inset-x-12 z-[14]">
                <div className="space-y-6 z-[14]">
                  <h1 className="text-3xl text-left sm-text-4xl md:text-5xl font-bold">
                    {title || original_title}
                  </h1>
                  <h4 className="text-left md-text-lg max-w-4xl">
                    {readMore ? overview : `${overview.slice(0, 100)}...`}{' '}
                    <a
                      onClick={() => setReadMore(!readMore)}
                      className="underline cursor-pointer font-bold"
                    >
                      {readMore ? 'read less' : 'read more'}
                    </a>
                  </h4>
                  <div className="flex items-center space-x-3 md:space-x-5">
                    <SliderBtn text="Go to Movie page" route={`/movie/${id}`} />
                    <DetailsBtn title="Add Review">
                      {favorites?.some((m) => m?.id === slide.id) ? (
                        <ThumbanilCheck />
                      ) : (
                        <ThumbnailAdd item={slide} />
                      )}
                    </DetailsBtn>
                    <DetailsBtn title="Reviews">
                      <Link href={`/movie/${id}`}>
                        <a>
                          <img src="/images/group-icon.svg" alt="group" />
                        </a>
                      </Link>
                    </DetailsBtn>
                  </div>
                </div>
                <Link href={`/movie/${id}`}>
                  <a className="rounded-md z-[14] hidden md:flex hover:shadow-xl hover:scale-[1.01] transition duration-20 cursor-pointer">
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
                  </a>
                </Link>
              </div>
              {/* Bg Overlay */}
              <div className="absolute inset-0 bg-black opacity-70 h-full w-full z-[12]" />
            </section>
          )
        })}
      </Carousel>
    </section>
  )
}

export default Slider
