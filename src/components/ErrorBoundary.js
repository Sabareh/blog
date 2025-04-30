import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)

    // You could send this to an error reporting service
    // reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.FallbackComponent) {
        return <this.props.FallbackComponent error={this.state.error} />
      }
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>The application encountered an error. Please try refreshing the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}

// Fallback component for API errors
export function ErrorFallback({ error }) {
  const isLyketError = error?.message?.includes('lyket')

  return (
    <div className="error-container">
      {isLyketError ? (
        <div>
          <p>Unable to load engagement buttons. The content is still available.</p>
        </div>
      ) : (
        <div>
          <h2>Something went wrong</h2>
          <p>Please try refreshing the page.</p>
        </div>
      )}
    </div>
  )
}

export default ErrorBoundary
