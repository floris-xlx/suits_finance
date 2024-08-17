import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);

interface AddAuditLogEntryParams {
  request: string;
  route: string;
  status: string;
  user_id: string;
  message?: string;
  author_user_id?: string;
}



export default async function AddAuditLogEntry({
  request,
  route,
  status,
  user_id,
  message = '',
  author_user_id = '',
}: AddAuditLogEntryParams): 
Promise<any> {
  const current_unixtime = Math.floor(Date.now() / 1000);

  const { data, error } = await supabase
    .from('audit_log')
    .insert([
      {
        request,
        route,
        status,
        user_id,
        message,
        unix_time: current_unixtime,
        author_user_id,
      }
    ]);

  if (error) throw error;

  return data;
}