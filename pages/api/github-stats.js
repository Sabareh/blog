export const runtime = 'edge' // Specify Edge runtime

export default async function handler(req, res) {
  // Added req, res for explicit response handling
  try {
    // Fetch user data
    const userResponse = await fetch('https://api.github.com/users/sabare-ab', {
      cache: 'no-store',
    }) // Add cache control if needed
    if (!userResponse.ok) {
      console.error(`GitHub user fetch failed: ${userResponse.status} ${userResponse.statusText}`)
      throw new Error(`Failed to fetch user data. Status: ${userResponse.status}`)
    }
    const user = await userResponse.json()

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Fetch repos data
    const reposResponse = await fetch('https://api.github.com/users/sabare-ab/repos?per_page=100', {
      cache: 'no-store',
    }) // Add cache control
    if (!reposResponse.ok) {
      console.error(
        `GitHub repos fetch failed: ${reposResponse.status} ${reposResponse.statusText}`
      )
      throw new Error(`Failed to fetch repos data. Status: ${reposResponse.status}`)
    }
    const repos = await reposResponse.json()

    // Calculate stars
    const stars = repos.reduce((acc, repo) => {
      // Ensure stargazers_count exists and is a number
      return acc + (repo.stargazers_count || 0)
    }, 0)

    // Define headers for the response
    const headers = {
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600', // 20 min cache, 10 min stale
      'Content-Type': 'application/json',
    }

    // Use res.json to return data and set headers
    res.status(200).json({
      followers: user.followers,
      stars: stars,
    })
  } catch (error) {
    console.error('Error fetching GitHub stats:', error.message)
    // Return error response using res.json
    // Avoid exposing internal error details directly unless intended
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' })
  }
}
