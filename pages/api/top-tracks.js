/* eslint-disable import/no-anonymous-default-export */
import { getTopTracks } from '@/lib/spotify'

export default async function handler(req, res) {
  try {
    let response;
    try {
        response = await getTopTracks();
    } catch (error) {
        console.error('Error calling getTopTracks:', error);
        return res.status(500).json({ message: 'Failed to fetch top tracks due to an internal error.' });
    }

    if (response === null) {
      console.error('Failed to get top tracks response from Spotify library.');
      return res.status(503).json({ message: 'Could not retrieve top tracks from Spotify at this time.' });
    }

    if (!response.ok) {
      const statusCode = response.status;
      const statusText = response.statusText;
      let errorDetails = await response.text();
      try {
          errorDetails = JSON.parse(errorDetails);
      } catch (e) { }
      console.error(`Failed to get top tracks from Spotify API. Status: ${statusCode} ${statusText}`, errorDetails);
      return res.status(statusCode).json({ message: `Spotify API error: ${statusText}`, details: errorDetails });
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.items)) {
        console.error('Invalid data structure received from Spotify top tracks:', data);
        return res.status(500).json({ message: 'Received invalid data structure from Spotify.' });
    }

    const tracks = data.items.slice(0, 10).map((track) => ({
      artist: track.artists?.map((_artist) => _artist.name).join(', ') || 'Unknown Artist',
      songUrl: track.external_urls?.spotify,
      title: track.name || 'Unknown Title',
    }));

    if (!tracks) {
      return res.status(204).end();
    }

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=43200'
    );

    res.status(200).json(tracks);
  } catch (error) {
    console.error('Error in top‑tracks:', error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
}
