import querystring from 'querystring'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks'

// Function to create a fetch call with a timeout
const fetchWithTimeout = async (url, options, timeout = 7000) => {
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
    throw error
  }
}

// Get access token using refresh token
const getAccessToken = async () => {
  try {
    const response = await fetchWithTimeout(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    })

    return response.json()
  } catch (error) {
    console.error('Error getting Spotify access token:', error)
    throw new Error('Failed to get Spotify access token')
  }
}

// Get currently playing song
export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken()

    return fetchWithTimeout(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  } catch (error) {
    console.error('Error in getNowPlaying:', error)

    // Create a mock Response object to maintain the expected API
    return new Response(JSON.stringify({ is_playing: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// Get top tracks
export const getTopTracks = async () => {
  try {
    const { access_token } = await getAccessToken()

    return fetchWithTimeout(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  } catch (error) {
    console.error('Error in getTopTracks:', error)
    throw new Error('Failed to fetch top tracks')
  }
}
