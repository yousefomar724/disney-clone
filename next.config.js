/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    MOVIES_API_KEY: process.env.MOVIES_API_KEY,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'tmdb.org', 'pbs.twimg.com'],
  },
}
