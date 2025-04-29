import { LikeButton as LyketLikeButton } from '@lyket/react';
import { LyketErrorBoundary } from '../lib/lyket';

export function LikeButton({ id, namespace = 'blog-post' }) {
  return (
    <LyketErrorBoundary>
      <LyketLikeButton
        id={id}
        namespace={namespace}
        component={LikeButton.templates.Simple}
      />
    </LyketErrorBoundary>
  );
}

// Add any custom templates here
LikeButton.templates = {
  Simple: ({ isLoading, isActive, handlePress, totalLikes }) => (
    <button
      onClick={handlePress}
      disabled={isLoading}
      className={`flex items-center gap-1 text-zinc-500 hover:text-green-500 transition-colors ${
        isActive ? 'text-green-500' : ''
      }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor" 
        strokeWidth="2" 
        className="transition-all"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
      <span>{totalLikes > 0 ? totalLikes : ''}</span>
    </button>
  )
};
