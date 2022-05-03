import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

interface Props {
  text: string
  route: string
}
const SliderBtn = ({ text, route }: Props) => {
  return (
    <Link href={route}>
      <button className="text-xs gap-2 justify-center md:text-base bg-[#f9f9f9] text-black flex items-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
        <span className="font-bold tracking-wide">{text}</span>
        <ArrowNarrowRightIcon className="h-5" />
      </button>
    </Link>
  )
}

export default SliderBtn
