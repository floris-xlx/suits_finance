// SupabaseUserData.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';

const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

interface User {
  username: string;
  user_id: string;
}

export async function GetUsers(): Promise<User[] | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data as User[];
}
