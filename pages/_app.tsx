import { SessionProvider } from 'next-auth/react'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AppProvider } from '../context'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  )
}
