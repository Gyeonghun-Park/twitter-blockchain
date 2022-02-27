import { TwitterProvider } from '@contexts/TwitterContext'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TwitterProvider>
      <Component {...pageProps} />
    </TwitterProvider>
  )
}

export default MyApp
