import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { tweetsData } from '@/data/tweetsData'
import TweetCard from '@/components/TweetCard'

export default function Tweets() {
  return (
    <>
      <PageSEO
        title={`Tweets - ${siteMetadata.author}`}
        description="Collection of notable tweets"
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Tweets
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A collection of tweets that I've shared or found interesting
          </p>
        </div>
        <div className="container py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tweetsData.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
