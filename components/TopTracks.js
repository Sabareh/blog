import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import Track from '@/components/Track';

export default function TopTracks() {
  const { data, error } = useSWR('/api/top-tracks', fetcher);

  // Handle loading state
  if (!data && !error) {
    return <div>Loading top tracks...</div>;
  }

  // Handle error state
  if (error) {
    console.error('Error fetching top tracks:', error);
    // You could inspect the error object further if needed
    return <div>Failed to load top tracks. Please try again later.</div>;
  }

  // Handle cases where data is fetched but might be an error response from the API
  // or doesn't contain the expected 'tracks' array.
  if (!data || !Array.isArray(data.tracks)) {
    // Log the unexpected data structure for debugging
    console.warn('Received unexpected data structure for top tracks:', data);
    // Check if there's a message from the API error response
    const message = data?.message || 'Could not retrieve top tracks.';
    return <div>{message}</div>;
  }

  // Handle case where tracks array is empty
  if (data.tracks.length === 0) {
    return <div>No top tracks available right now.</div>;
  }

  // Only map if data.tracks is a non-empty array
  return data.tracks.map((track, index) => (
    <Track ranking={index + 1} key={track.songUrl} {...track} />
  ));
}
