import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import { GetProfilePicById, UpsertUser } from '@/app/client/supabase/SupabaseUserData';
import stripNameFromEmail from '@/app/client/hooks/formatting/StripNameFromEmail';


// zustand
import { useUserStore, useLoadingStore } from '@/app/stores/stores';


export function useRequireAuth() {
  // zustand user
  const {
    setId,
    setUsername,
    setProfilePicture,
    setProviderType,
    setOrganization
  } = useUserStore();
  const {
    setAuthLoading
  } = useLoadingStore();

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {

        const { data: session } = await supabaseClient.auth.getSession();

        if (session.session === null) {

          setAuthLoading(false);
          return;
        }

        const user = session.session.user;
        const username = user.user_metadata.full_name || stripNameFromEmail(user.email);

        await UpsertUser(user.id,  user.user_metadata.full_name, user.email, username);
        
        
        // zustand
        setUsername(username);

        // this is for getting pfp when the oauth2 provider doesnt provide it
        const profilePic = await GetProfilePicById(user.id);
        // zustand
        setProfilePicture(profilePic);
        setProviderType('email');

        setAuthLoading(false);


        const userId = user.id;


        setUserId(userId);
        setAuthLoading(false);


        // legacy
        SetKeyLocalStorage('userId', userId);
        // zustand
        setId(userId);

        setAuthLoading(false);
      } catch (error) {
        console.error('Error checking auth', error);
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    loading,
    userId,
  };
}
