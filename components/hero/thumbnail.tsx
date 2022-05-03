import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'

const Thumbnail = (props: any) => {
  const { data, route, icon: ThumbnailIcon } = props

  const { poster_path, backdrop_path, id, title, vote_average, name } = data

  const BASE_URL = 'https://image.tmdb.org/t/p/original'
  const src =
    `${BASE_URL}${backdrop_path || poster_path}` || `${BASE_URL} ${poster_path}`
  const movieTitle = title || name

  return (
    <div
      className="flex flex-col min-h-[360px] h-[360px] w-[280px] min-w-[280px]  md:min-w-[280px] md:min-h-[300px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-2 border-[#f9f9f9] border-opacity-10 hover:border-opacity-80 transition duration-200"
      title={title || name}
    >
      <Link href={`/${route}/${id}`}>
        <a className="relative min-h-[250px] min-w-[150px]">
          <Image
            loading="lazy"
            loader={() => src}
            src={src}
            layout="fill"
            unoptimized
            objectFit="cover"
            className="rounded-t-lg hover:scale-105 transition duration-200"
          />
        </a>
      </Link>
      <div className=" flex flex-col justify-between h-[100%] p-2">
        <h3 className="text-xl font-bold">
          {movieTitle.length > 25
            ? `${movieTitle.slice(0, 25)}...`
            : movieTitle}
        </h3>
        <div className="flex justify-self-end justify-between items-center gap-2 bg-red">
          <p className="flex items-center justify-center gap-1">
            <StarIcon className="h-6 text-yellow-400" />
            <b>{vote_average ? vote_average : 5.5}</b>
          </p>
          <button className="text-white">{ThumbnailIcon}</button>
        </div>
      </div>
    </div>
  )
}

export default Thumbnail
