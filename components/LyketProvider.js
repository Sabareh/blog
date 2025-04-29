import { Provider } from '@lyket/react'
import { LyketErrorBoundary } from '../src/lib/lyket'

export default function LyketProvider({ children }) {
  const apiKey = process.env.NEXT_PUBLIC_LYKET_API_KEY

  if (!apiKey || apiKey === 'your_lyket_api_key_here') {
    console.warn(
      'Lyket API key is missing or invalid. Please set a valid NEXT_PUBLIC_LYKET_API_KEY in your .env.local file.'
    )
    return <>{children}</>
  }

  return (
    <LyketErrorBoundary>
      <Provider apiKey={apiKey}>{children}</Provider>
    </LyketErrorBoundary>
  )
}
