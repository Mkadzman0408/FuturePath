import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Read env variables manually since this is a pure node script
const envPath = path.resolve('.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const parts = line.split('=')
    if (parts.length >= 2) {
      const key = parts[0].trim()
      const val = parts.slice(1).join('=').trim()
      process.env[key] = val
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Testing connection to Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key prefix:', supabaseKey ? supabaseKey.substring(0, 15) + '...' : 'missing')

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not defined in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Try to query schema or metadata
    const { data, error } = await supabase.from('profiles').select('id').limit(1)
    
    if (error) {
      console.log('\n❌ Supabase Connection Check failed!')
      console.log('Error details:', error.message)
      console.log('Status code:', error.status || 'N/A')
      console.log('\nTip: Make sure you have completed the SQL schema installation in your Supabase SQL Editor, and that the credentials in .env.local are correct.')
      process.exit(1)
    }

    console.log('\n✅ Successfully connected to Supabase!')
    console.log('Successfully queried "profiles" table. The credentials and connection are 100% active!')
  } catch (err) {
    console.error('\n❌ An unexpected error occurred during connection:', err.message)
    process.exit(1)
  }
}

testConnection()
