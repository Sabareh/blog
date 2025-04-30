import { LyketProvider } from '../lib/lyket'
import LyketWrapper from '../components/LyketProvider'

function MyApp({ Component, pageProps }) {
  return (
    <LyketProvider>
      <Component {...pageProps} />
    </LyketProvider>
  )
}

export default MyApp
