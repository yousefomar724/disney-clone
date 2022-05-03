import { useEffect, useState } from 'react'

const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
  const [changeHeaderBg, setChangeHeaderBg] = useState(false)

  const changeBg = () => {
    if (global.window !== undefined) {
      if (global.window.scrollY >= 100) {
        setChangeHeaderBg(true)
      } else {
        setChangeHeaderBg(false)
      }
    }
  }
  useEffect(() => {
    const ac = new AbortController()
    if (global.window !== undefined) {
      global.window.addEventListener('scroll', changeBg)
    }
    return () => ac.abort()
  }, [])
  return (
    <header
      className={`fixed w-[100%] overflow-hidden top-0 z-[1000] flex h-[72px] items-center rounded-b-lg  justify-between px-6 md:px-10 ${
        changeHeaderBg ? 'bg-[#040714] bg-opacity-90' : 'bg-transparent'
      }`}
    >
      {children}
    </header>
  )
}

export default HeaderContainer
