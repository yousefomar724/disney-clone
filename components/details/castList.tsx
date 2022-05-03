import Image from 'next/image'

interface Props {
  casts: {
    name: string
    original_name: string
    profile_path: string
  }[]
}
const CastList = ({ casts }: Props) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {casts.slice(0, 5)?.map((item, index: number) => {
        const { name, original_name, profile_path } = item
        const BASE_URL_w500 = 'https://image.tmdb.org/t/p/w500'
        const w500Src = `${BASE_URL_w500}${profile_path}`
        return (
          <div
            className="flex flex-col items-center gap-1 max-w-[100px] max-h-[130px]"
            key={index}
          >
            <div className="relative min-w-[100px] min-h-[130px] max-w-[100px] max-h-[130px] transition duration-200 hover:-translate-y-1">
              <Image
                src={w500Src}
                loader={() => w500Src}
                unoptimized
                layout="fill"
                objectFit="cover"
                className="rounded-md items-end"
              />
            </div>
            <p className="text-center text-xs">{name || original_name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default CastList
