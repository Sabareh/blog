import { getNowPlaying } from '../../lib/spotify';

export default async function handler(req, res) {
  try {
    // Set a longer timeout for the response to avoid Node.js timing out too quickly
    res.setTimeout(8000);
    
    const response = await getNowPlaying();
    
    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }
    
    const song = await response.json();
    
    if (song.item === null) {
      return res.status(200).json({ isPlaying: false });
    }
    
    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0]?.url;
    const songUrl = song.item.external_urls.spotify;
    
    return res.status(200).json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    console.error('Error fetching now playing:', error);
    
    // Return a graceful fallback instead of an error
    return res.status(200).json({ 
      isPlaying: false,
      error: 'Unable to connect to music service'
    });
  }
}
