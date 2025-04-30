import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  try {
    const authorDetails = await getFileBySlug('authors', ['default'])
    return { props: { authorDetails, error: null } }
  } catch (error) {
    console.error('Error loading author data:', error)
    return {
      props: {
        authorDetails: null,
        error: 'Failed to load author data',
      },
    }
  }
}

export default function About({ authorDetails, error }) {
  // Show a fallback if data loading failed
  if (error || !authorDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">About Me</h1>
        <p className="mb-4">
          I'm a software engineer passionate about building web applications and exploring new
          technologies.
        </p>
        <p>Please check back later for my complete profile.</p>
      </div>
    )
  }

  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
