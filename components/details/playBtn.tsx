import { useRouter } from "next/router"
import { Url, UrlObject } from "url"

const PlayBtn = (props: { url: string | UrlObject }) => {
  const router = useRouter()
  return (
    <button
      onClick={()=>router.push(props.url)}
      className="text-sm cursor-pointer bg-[#f9f9f9] text-black flex items-center justify-center py-1 px-4 rounded hover:bg-[#c6c6c6]"
    >
      <img src="/images/play-icon-black.svg" alt="play icon" className="h-6" />
      <span className="uppercase font-medium tracking-wide">Play</span>
    </button>
  )
}

export default PlayBtn
