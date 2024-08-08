import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { GetProfilePicById, UpsertUser } from '@/app/client/supabase/SupabaseUserData';
import stripNameFromEmail from '@/app/client/hooks/formatting/StripNameFromEmail';
import { useUserStore, useLoadingStore } from '@/app/stores/stores';

export function useRequireAuth() {
  const { setId, setUsername, setProfilePicture, setProviderType } = useUserStore();
  const { setAuthLoading } = useLoadingStore();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: session } = await supabaseClient.auth.getSession();
        // if no session, set auth loading to false and return
        if (!session.session) { setAuthLoading(false); return; }

        const user = session.session.user;
        const userId = user.id;
        const profilePic = await GetProfilePicById(user.id);
        const username = user.user_metadata.full_name || stripNameFromEmail(user.email);
        
        // populate user if not already in db
        await UpsertUser(user.id, user.user_metadata.full_name, user.email, username);

        setUsername(username);        
        setProfilePicture(profilePic);
        setUserId(userId);
        setId(userId);
      } catch (error) {
        console.error('Error checking auth', error);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [
    supabaseClient,
    setAuthLoading,
    setId,
    setProfilePicture,
    setProviderType,
    setUsername
  ]);

  return { loading, userId };
}
