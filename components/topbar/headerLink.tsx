import { useRouter } from 'next/router'
import { HeroIcon } from '../../types'
import HeaderA from './headerA'
import HeaderSpan from './headerSpan'

interface Props {
  linkItem: {
    id: number
    icon: HeroIcon
    text: string
    route: string
  }
  index: number
  value: number
  setValue: (v: any) => void
}

const HeaderLink = ({ linkItem, value, index, setValue }: Props) => {
  const router = useRouter()
  return (
    <div onClick={() => router.push(linkItem.route)}>
      <HeaderA value={value} index={index} setValue={setValue}>
        <linkItem.icon className="h-4 text-s" />
        <HeaderSpan>{linkItem.text}</HeaderSpan>
      </HeaderA>
    </div>
  )
}

export default HeaderLink
