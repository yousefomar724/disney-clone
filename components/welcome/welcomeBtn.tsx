import { signIn } from 'next-auth/react'

const WelcomeBtn = () => {
  return (
    <button
      className="bg-blue-600 uppercase text-xl tracking-wide font-extrabold py-4 px-6 w-full rounded hover:bg-blue-700 transition duration-200"
      onClick={() => signIn()}
    >
      Get All There
    </button>
  )
}

export default WelcomeBtn
