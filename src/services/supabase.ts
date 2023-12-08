import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kdrqpaamnwfvnkoeyogf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcnFwYWFtbndmdm5rb2V5b2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MjI5OTQsImV4cCI6MjAxNjk5ODk5NH0.lQQKMNyuEbeV9lqwiqridqlbIxoNRU872E46olx_A34";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
