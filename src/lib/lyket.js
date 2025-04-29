import { Provider } from '@lyket/react';

export function LyketProvider({ children }) {
  return (
    <Provider 
      apiKey={process.env.NEXT_PUBLIC_LYKET_API_KEY} 
      theme={{
        colors: {
          background: 'transparent',
          primary: '#71717a',
          secondary: '#22c55e',
          text: '#27272a',
          icon: '#71717a',
          highlight: '#22c55e',
        }
      }}
    >
      {children}
    </Provider>
  );
}

export function LyketErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    console.error('Lyket error:', error);
    return null; // Render nothing if Lyket fails
  }
}
