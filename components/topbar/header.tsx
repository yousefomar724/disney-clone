import data from '../../data/data'
import HeaderLinks from './headerLinks'
import Options from './options'
import HeaderContainer from './headerContainer'
import { useSession } from 'next-auth/react'
import SearchLink from './searchLink'
import Link from 'next/link'

const Header = () => {
  const { data: session } = useSession()
  const {
    headerData: { logo },
  } = data
  return (
    <HeaderContainer>
      <Link href="/">
        <img
          src={logo.img}
          width={80}
          height={80}
          className="cursor-pointer"
          title={logo.title}
        />
      </Link>
      {session && <HeaderLinks />}
      <div className="flex justify-center items-center gap-4">
        {session && <SearchLink />}
        <Options />
      </div>
    </HeaderContainer>
  )
}

export default Header
