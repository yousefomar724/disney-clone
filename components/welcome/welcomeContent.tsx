import Image from 'next/image'
import WelcomeBtn from './welcomeBtn'

const WelcomeContent = () => {
  return (
    <div className="grid place-items-center">
      <div className="absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center max-w-screen-sm mx-auto p-8 -mt-16">
        <Image
          src="/images/cta-logo-one.svg"
          width={600}
          height={150}
          objectFit="contain"
        />
        <WelcomeBtn />
        <p className="text-s text-center ">
          TV series, movies and documentries you can't see anywhere else, from
          the world's greatest styorytellers.
        </p>
        <Image
          src="/images/cta-logo-two.png"
          width={600}
          height={70}
          objectFit="contain"
        />
      </div>
    </div>
  )
}

export default WelcomeContent
