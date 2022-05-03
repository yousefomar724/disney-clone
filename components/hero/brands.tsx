import Image from 'next/image'
import data from '../../data/data'

const Brands = () => {
  const {
    heroData: { brandsData },
  } = data
  return (
    <section className="flex flex-wrap justify-center items-center gap-6 mt-10 px-8 max-w-[1400px] mx-auto">
      {brandsData.map((brand) => {
        const { id, title, img, video, url } = brand
        return (
          <a
            href={url}
            target="_blank"
            key={id}
            title={title}
            className="group relative flex w-52 h-32 sm:w-54 sm:h-36 border-[2px] border-[#f9f9f9] border-opacity-10 rounded-lg cursor-pointer shadow-xl overflow-hidden hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-100"
          >
            <Image src={img} layout="fill" objectFit="cover" />
            <video
              autoPlay
              loop
              playsInline
              className="hidden group-hover:inline rounded-lg object-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
          </a>
        )
      })}
    </section>
  )
}

export default Brands
