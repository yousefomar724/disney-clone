import { SearchIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useRef, useState } from 'react'
import ThumbanilCheck from '../components/hero/thumbanilCheck'
import Thumbnail from '../components/hero/thumbnail'
import ThumbnailAdd from '../components/hero/thumbnailAdd'
import Header from '../components/topbar/header'
import { useGlobalContext } from '../context'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}

const Search = () => {
  const { data: session } = useSession()
  const { favorites } = useGlobalContext()
  const router = useRouter()
  const searchEndPoint =
    `https://api.themoviedb.org/3/search/multi?api_key=` +
    `${process.env.MOVIES_API_KEY}`

  // Input Focus
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  // Handle Filters
  const [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [lastPage, setLastPage] = useState(0)
  const [filters, setFilters] = useState({
    searchQuery: '',
    page: 1,
  })

  useEffect(() => {
    const getData = async () => {
      const arr = []
      if (filters.searchQuery) {
        arr.push(`query=${filters.searchQuery}`)
      }
      if (filters.page) {
        arr.push(`page=${filters.page}`)
      }

      if (filters.searchQuery.length > 0) {
        const response = await fetch(`${searchEndPoint}&${arr.join('&')}`)
        const content = await response.json()
        const { total_pages } = content
        setResults(
          filters.page === 1
            ? content.results
            : [...results, ...content.results]
        )
        setLastPage(total_pages)
      }
    }
    getData()
  }, [filters])
  const loadMore = () => {
    setFilters({
      ...filters,
      page: filters.page + 1,
    })
  }

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFilters({ searchQuery: searchInput, page: 1 })
  }

  let LoadMoreBtn
  if (filters.page !== lastPage && results.length !== 0) {
    LoadMoreBtn = (
      <button
        onClick={loadMore}
        className="justify-center md:text-base w-fit mx-auto mt-8 bg-[#f9f9f9] text-black flex items-center py-2 px-5 rounded-full hover:bg-[#c6c6c6] font-bold"
      >
        Load More
      </button>
    )
  }

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{router.pathname.slice(1, router.pathname.length)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
        <div className="flex justify-center items-center">
          <div className="mb-3 xl:w-96">
            <form
              onSubmit={(e) => search(e)}
              className="relative flex items-stretch w-full mb-4"
            >
              <input
                type="search"
                ref={inputRef}
                className="relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid outline-none border-gray-300 rounded transition ease-in-out m-0"
                placeholder="Search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                type="submit"
              >
                <SearchIcon className="h-5" />
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 overflow-y-hidden p-2 -m-2">
          {results?.map((item: any) => {
            return (
              <Thumbnail
                key={item.id}
                data={item}
                route={item.media_type}
                icon={
                  favorites?.some((m) => m.id === item.id) ? (
                    <ThumbanilCheck />
                  ) : (
                    <ThumbnailAdd item={item} />
                  )
                }
              />
            )
          })}
        </div>
        {LoadMoreBtn}
      </div>
    </>
  )
}

export default Search
