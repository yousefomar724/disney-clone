import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import data from '../../data/data'
import HeaderLink from './headerLink'

const HeaderLinks = () => {
  const [value, setValue] = useState(0)
  const { pathname } = useRouter()
  const {
    headerData: { links },
  } = data

  return (
    <div className="flex justify-center gap-2">
      <div className="bg-[#040714] bg-opacity-70 flex justify-center p-4 rounded-full fixed inset-x-4 sm:inset-x-2 bottom-6 items-center gap-3 md:gap-5 md:static">
        {links.map((linkItem, index) => {
          useEffect(() => {
            const ac = new AbortController()
            setValue((val) => (pathname === linkItem.route ? index : val))
            return () => ac.abort()
          }, [])

          return (
            <HeaderLink
              linkItem={linkItem}
              index={index}
              key={index}
              value={value}
              setValue={setValue}
            />
          )
        })}
      </div>
    </div>
  )
}

export default HeaderLinks
