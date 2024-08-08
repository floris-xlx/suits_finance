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
        if (!session.session) {
          setAuthLoading(false);
          return;
        }

        const user = session.session.user;
        const username = user.user_metadata.full_name || stripNameFromEmail(user.email);

        await UpsertUser(user.id, user.user_metadata.full_name, user.email, username);
        setUsername(username);

        const profilePic = await GetProfilePicById(user.id);
        setProfilePicture(profilePic);
        setProviderType('email');

        const userId = user.id;
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
