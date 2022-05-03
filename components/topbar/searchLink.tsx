import { SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

const SearchLink = () => {
  const router = useRouter()
  return (
    <div
      title="search"
      onClick={() => router.push('/search')}
      className="h-[38px] w-[38px] grid place-items-center rounded-full border-2 border-white cursor-pointer py-px px-px hover:bg-slate-900 transition duration-100"
    >
      <SearchIcon className="h-6" />
    </div>
  )
}

export default SearchLink
