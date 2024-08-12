import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { GetProfilePicById, UpsertUser, getUserObjectById } from '@/app/client/supabase/SupabaseUserData';
import stripNameFromEmail from '@/app/client/hooks/formatting/StripNameFromEmail';
import { useUserStore, useLoadingStore } from '@/app/stores/stores';

export function useRequireAuth() {
  const { user, setId, setUsername, setProfilePicture, setProviderType, setEmail, setRole, setFullName, setState, setAddressLine1, setAddressLine2, setCity, setCountry, setCurrency } = useUserStore();
  const { setAuthLoading } = useLoadingStore();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabaseClient = createClientComponentClient();

  const [userObject, setUserObject] = useState([]);



  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: session } = await supabaseClient.auth.getSession();
        // if no session, set auth loading to false and return
        if (!session.session) { setAuthLoading(false); return; }

        const user = session.session.user;
        const userId = user.id;
        // populate user if not already in db
        const username = user.user_metadata.full_name || stripNameFromEmail(user.email);

        await UpsertUser(userId, user.user_metadata.full_name, user.email, username);

        const [profilePic, userObject] = await Promise.all([
          GetProfilePicById(user.id),
          getUserObjectById(user.id)
        ]);

        setRole(userObject.role);
        setEmail(userObject.email);
        setFullName(userObject.full_name);
        setState(userObject.state);
        setAddressLine1(userObject.address_line_1);
        setAddressLine2(userObject.address_line_2);
        setCity(userObject.city);
        setCountry(userObject.country);
        setCurrency(userObject.currency);
          


        setUserObject(userObject);
        

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
