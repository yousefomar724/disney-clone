import { Url } from 'url'

export type Show = {
  adult: boolean
  backdrop_path: null | string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  first_air_date?: string
  runtime?: number | undefined
  genres?: [genre: { name: string }]
  videos?: any
  original_name?: string
  status?: string
}

export type Movie = {
  adult: boolean
  backdrop_path: null | string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  first_air_date?: string
  runtime?: number | undefined
  genres?: [genre: { name: string }]
  videos?: any
  original_name?: string
  status?: string
  name?: string
  homepage: Url
}

export type User = {
  image: string
  name: string
  email: string
}

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element
