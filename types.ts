import { UrlObject } from 'url'

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
  homepage?: UrlObject | string
}

export type User = {
  image: string
  name: string
  email: string
}

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

export interface Reviews {
  id: number
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export interface Result {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: Date
  id: string
  updated_at: Date
  url: string
}

export interface AuthorDetails {
  name: string
  username: string
  avatar_path: string
  rating: number
}
