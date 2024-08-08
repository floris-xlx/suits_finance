import { AddAuditLogEntry } from '@/app/client/supabase/SupabaseOrgData';

export async function AddAuditLogEntryInBackground(
    username,
    userId,
    route,
    action
) {
    // Use a Web Worker to handle the background task
    if (window.Worker) {
        const worker = new Worker(
            URL.createObjectURL(
                new Blob(
                    [
                        `
      self.onmessage = async function(event) {
        const { username, userId, route, action } = event.data;
        const current_unixtime = Math.floor(Date.now() / 1000);

        const supabaseUrl = '${process.env.NEXT_PUBLIC_SUPABASE_URL}';
        const SUPABASE_ANON_KEY = '${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}';
        const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);

        try {
          const { data, error } = await supabase
            .from('audit_logs')
            .insert([{
              username: username,
              user_id: userId,
              action: action,
              unix_time: current_unixtime,
              route: route
            }]);

          if (error) throw error;
          postMessage({ success: true, data });
        } catch (error) {
          postMessage({ success: false, error: error.message });
        }
      };
    `,
                    ],
                    { type: 'application/javascript' }
                )
            )
        );

        worker.postMessage({ username, userId, route, action });

        worker.onmessage = function (event) {
            if (event.data.success) {
                console.log('Audit log entry added successfully:', event.data.data);
            } else {
                console.error('Error adding audit log entry:', event.data.error);
            }
        };
    } else {
        console.error('Web Workers are not supported in this browser.');
    }
}
