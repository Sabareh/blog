import querystring from 'querystring'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks'

// Improve fetch with timeout and retry mechanism
const fetchWithTimeout = async (url, options, retries = 3, timeout = 10000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (retries > 0) {
      console.log(`Retrying fetch to ${url}, ${retries} retries left`)
      return fetchWithTimeout(url, options, retries - 1, timeout)
    }
    throw error
  }
}

// More robust access token retrieval
const getAccessToken = async () => {
  try {
    if (!refresh_token || !client_id || !client_secret) {
      console.error('Spotify credentials missing from environment variables')
      throw new Error('Spotify credentials missing')
    }

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }).toString(),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(
        `Spotify token error response: ${response.status} ${response.statusText}`,
        errorBody
      )
      throw new Error(`Failed to get Spotify access token. Status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.access_token) {
      console.error('Access token not found in Spotify response:', data)
      throw new Error('Access token not found in Spotify response')
    }
    return data.access_token
  } catch (error) {
    console.error('Error in getAccessToken function:', error.message)
    throw new Error(`Failed to get Spotify access token: ${error.message}`)
  }
}

// Safe now playing function with error handling
export const getNowPlaying = async () => {
  let accessToken
  try {
    accessToken = await getAccessToken()
  } catch (error) {
    console.error('Could not get access token for getNowPlaying.')
    return null
  }

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    })

    if (response.status === 204) {
      return { isPlaying: false }
    }

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(
        `Spotify Now Playing error response: ${response.status} ${response.statusText}`,
        errorBody
      )
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    if (!data || !data.item) {
      console.log('Currently playing data is unavailable or malformed.')
      return { isPlaying: data?.is_playing || false }
    }

    const item = data.item
    return {
      isPlaying: data.is_playing,
      title: item.name || 'Unknown Track',
      artist: item.artists?.map((artist) => artist.name).join(', ') || 'Unknown Artist',
      album: item.album?.name || 'Unknown Album',
      albumImageUrl: item.album?.images?.[0]?.url || null,
      songUrl: item.external_urls?.spotify || null,
      progressMs: data.progress_ms,
      durationMs: item.duration_ms,
      explicit: item.explicit,
      previewUrl: item.preview_url,
      trackId: item.id,
    }
  } catch (error) {
    console.error('Error fetching or processing Now Playing data:', error.message)
    return null
  }
}

// Safe top tracks function with error handling
export const getTopTracks = async () => {
  let accessToken
  try {
    accessToken = await getAccessToken()
  } catch (error) {
    console.error('Could not get access token for getTopTracks.')
    return null
  }

  try {
    const response = await fetch(`${TOP_TRACKS_ENDPOINT}?time_range=short_term`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    })

    return response
  } catch (error) {
    console.error('Error fetching Top Tracks data:', error.message)
    return null
  }
}

export { getAccessToken, fetchWithTimeout }
