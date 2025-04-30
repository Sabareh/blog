import { createClient } from '@supabase/supabase-js'

// Ensure environment variables are available and have values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Add logging for debugging
if (!supabaseUrl) {
  console.error('NEXT_PUBLIC_SUPABASE_URL is missing or undefined')
}

if (!supabaseAnonKey) {
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or undefined')
}

// Create client with fallback values for safe initialization
const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export default supabase
