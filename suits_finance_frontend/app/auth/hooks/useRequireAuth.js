import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import { GetProfilePicById } from '@/app/client/supabase/SupabaseUserData';
import stripNameFromEmail from '@/app/client/hooks/formatting/StripNameFromEmail';

// supabase
import { UpdateOrganizationById } from '@/app/client/supabase/SupabaseUserData';

// zustand
import { useUserStore, useLoadingStore } from '@/app/stores/stores';

// import apis
import { AuthUser } from '@/app/client/api/v2/AuthUser';
import { UserOrganization } from '@/app/client/api/v2/UserOrganization';


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

        const provider_type = user.app_metadata.provider;

        if (provider_type === 'google') {
          const username = user.user_metadata.full_name;
          const profilePic = user.user_metadata.avatar_url;


          // legacy
          SetKeyLocalStorage('username', username);
          SetKeyLocalStorage('profilePic', profilePic);

          // zustand
          setUsername(username);
          setProfilePicture(profilePic);
          setProviderType('google');
          setAuthLoading(false);
        } else if (provider_type === 'discord') {
          const username = user.user_metadata.custom_claims.global_name;
          const profilePic = user.user_metadata.avatar_url;

          // legacy
          SetKeyLocalStorage('username', username);
          SetKeyLocalStorage('profilePic', profilePic);

          // zustand
          setUsername(username);
          setProfilePicture(profilePic);
          setProviderType('discord');
          setAuthLoading(false);
        } else {
          const username = user.user_metadata.full_name || stripNameFromEmail(user.email);

          // legacy
          SetKeyLocalStorage('username', username);

          // zustand
          setUsername(username);

          // this is for getting pfp when the oauth2 provider doesnt provide it
          const profilePic = await GetProfilePicById(user.id);
  

          // get organization
          const organization = await UserOrganization(user.id);

          setOrganization(organization.organization);

          // FIXME: only for TBR, this is only for whop users
          // if organization is null, call the auth api
          if (organization.organization === null || organization.organization === "") {
            const authResponse = await AuthUser(user.email, "trades_by_rob");
            console.log('Auth response:', authResponse);
            if (authResponse.authenticated) {

              setOrganization("trades_by_rob");
              await UpdateOrganizationById("trades_by_rob", user.id);
            }
          }



          // legacy
          SetKeyLocalStorage('profilePic', profilePic);

          // zustand
          setProfilePicture(profilePic);
          setProviderType('email');

          setAuthLoading(false);
        }

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
