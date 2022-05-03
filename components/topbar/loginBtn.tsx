import { signIn } from 'next-auth/react'

const LoginBtn = () => {
  return (
    <button
      className="justify-self-end rounded px-4 py-1.5 font-medium capitalize tracking-wide transition bg-blue-600 duration-200 hover:bg-blue-700"
      onClick={() => signIn()}
    >
      login
    </button>
  )
}

export default LoginBtn
