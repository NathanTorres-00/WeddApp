import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);