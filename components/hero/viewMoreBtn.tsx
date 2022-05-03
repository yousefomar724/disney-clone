import { useRouter } from 'next/router'

const ViewMoreBtn = ({ route }: { route: string }) => {
  const router = useRouter()
  return (
    <button
      className="justify-center md:text-base bg-[#f9f9f9] text-black flex items-center py-2 px-5 rounded-full hover:bg-[#c6c6c6]"
      onClick={() => router.push(`/${route}`)}
    >
      <span className="font-bold text-xs tracking-wide">View More</span>
    </button>
  )
}

export default ViewMoreBtn
