import Image from 'next/image'

const Welcome = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div className="relative min-h-screen">
      <Image src={imgSrc} layout="fill" objectFit="cover" />
    </div>
  )
}

export default Welcome
