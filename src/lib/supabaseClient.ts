import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://aoppqstlbzfgjoppyyjz.supabase.co";
const DEFAULT_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvcHBxc3RsYnpmZ2pvcHB5eWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTM4NjcsImV4cCI6MjEwMDQ4OTg2N30.AtOcriufgb1-GydY7ycaP52rx-WZDixrEWEsQWzthYU";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("YOUR_SUPABASE")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
