"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { clearAll } from "@/app/client/caching/LocalStorageRouter";

const handleSignOut = async () => {
    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signOut()

    // clear local storage
    clearAll();

    if (error) {
      console.error('Error signing out:', error)
    } else {
      const waitForWindow = () => {
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.location.href = '/login';
          }, 500);
        } else {
          setTimeout(waitForWindow, 100);
        }
      };

      waitForWindow();
    }
}

export default handleSignOut;