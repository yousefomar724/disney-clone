import { useSession } from 'next-auth/react'
import LoginBtn from './loginBtn'
import UserOptions from './userOptions'

const Options = () => {
  const { data: session } = useSession()
  if (!session) {
    return <LoginBtn />
  }
  return <UserOptions />
}

export default Options
