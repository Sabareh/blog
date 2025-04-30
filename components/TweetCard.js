import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export default function TweetCard({ tweet }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-md dark:border-gray-800">
      <div className="flex items-center space-x-3 p-4">
        {tweet.avatar && (
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={tweet.avatar}
              alt={tweet.author}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {tweet.author}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">@{tweet.username}</p>
        </div>
        <div className="twitter-icon">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-blue-400">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-4 text-gray-800 dark:text-gray-200">{tweet.content}</p>
        {tweet.image && (
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={tweet.image}
              alt="Tweet media"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-200 hover:scale-105"
            />
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{format(new Date(tweet.date), 'MMM d, yyyy')}</span>
          <Link
            href={`https://twitter.com/${tweet.username}/status/${tweet.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            View on Twitter
          </Link>
        </div>
      </div>
    </div>
  )
}
