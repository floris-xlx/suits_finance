import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);

export async function GetBucketImages() {
  const { data, error } = await supabase.storage.getBucket("user_charts");

  if (error) throw error;

  return data;
}

export async function UploadChart(imageFile) {
  const randomValue = [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  const fileNameWithRandomValue = `${randomValue}-${imageFile.name}`;

  const { data, error } = await supabase.storage
    .from("user_charts")
    .upload(`public/${fileNameWithRandomValue}`, imageFile, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  return data;
}
