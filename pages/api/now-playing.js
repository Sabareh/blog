import { getNowPlaying } from '../../lib/spotify'

export default async function handler(req, res) {
  try {
    const response = await getNowPlaying()

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

    // If not playing or error, return simplified response
    if (!response || !response.isPlaying) {
      return res.status(204).end()
    }

    // Return the now playing data
    return res.status(200).json({
      isPlaying: response.isPlaying,
      title: response.title,
      artist: response.artist,
      album: response.album,
      albumImageUrl: response.albumImageUrl,
      songUrl: response.songUrl,
      trackId: response.trackId,
      progressMs: response.progressMs,
      durationMs: response.durationMs,
      explicit: response.explicit,
      previewUrl: response.previewUrl,
    })
  } catch (error) {
    console.error('Error fetching now playing:', error)
    return res.status(error.status || 500).json({
      error: error.message || 'Internal Server Error',
    })
  }
}
