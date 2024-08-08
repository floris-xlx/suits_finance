// SupabaseUserData.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);


export async function IsUserAdmin(userId) {
  const { data, error } = await supabase
    .from("admin")
    .select("documentation_access")
    .eq("user_id", userId);

  if (error) {
    console.error("Error checking if user is admin", error);
    return false;
  }



  return data[0].documentation_access;
}