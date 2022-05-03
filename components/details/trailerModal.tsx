import { XIcon } from '@heroicons/react/solid'
import ReactPlayer from 'react-player'

interface Props {
  showTrailer: boolean
  setShowTrailer: (showTrailer: boolean) => void
  title: string
  original_title: string
  videos: { results: { type: string; key: string }[] }
}
const TrailerModal = (props: Props) => {
  const { showTrailer, setShowTrailer, title, original_title, videos } = props
  const trailerIndex = videos?.results.findIndex(
    (vid: { type: string }) => vid.type === 'Trailer'
  )
  return (
    <div className="flex justify-center">
      <div
        className={`absolute top-20 w-[80%] lg:w-[70%] lg:h-[85%]  h-3/4 mx-auto rounded overflow-hidden transition duration-200 ${
          showTrailer ? 'opacity-100 z-50' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5 z-50">
          <span className="font-semibold">{title || original_title}</span>
          <div
            className="cursor-pointer w-8 h-8 rounded-lg place-items-center grid opacity-50 hover:opacity-75 hover:bg-[#0f0f0f]"
            onClick={() => setShowTrailer(false)}
          >
            <XIcon className="h-5" />
          </div>
        </div>
        <div className="relative pt-[56.25%] lg:pt-[50%]">
          <ReactPlayer
            url={`http://www.youtube.com/watch?v=${videos?.results[trailerIndex]?.key}`}
            width="100%"
            height="100%"
            controls={true}
            playing={showTrailer}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TrailerModal
