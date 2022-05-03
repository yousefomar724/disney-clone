import Link from 'next/link'
import { useRouter } from 'next/router'
import data from '../data/data'

const Footer = () => {
  const {
    headerData: { logo },
    footerData,
  } = data
  const router = useRouter()
  return (
    <footer className="relative px-8 py-12 bg-footer bg-top bg-cover bg-no-repeat">
      <div className="container max-w-[900px] mx-auto">
        <div className="flex justify-center items-center mb-4">
          <Link href="/">
            <img
              src={logo.img}
              width={100}
              height={100}
              className="cursor-pointer"
              onClick={() => router.push('/')}
              title={logo.title}
            />
          </Link>
        </div>
        <div className="flex flex-wrap justify-evenly gap-2">
          {footerData.map((col, index) => {
            return (
              <div
                className="flex justify-start items-start flex-col mt-4 text-lg min-w-[150px]"
                key={index}
              >
                <div className="flex justify-start items-start flex-col mt-4 text-lg max-w-sm">
                  {col.map((footerLink, index) => {
                    return (
                      <a
                        key={index}
                        href={footerLink.route}
                        className="hover:underline transition duration-100"
                      >
                        {footerLink.text}
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
