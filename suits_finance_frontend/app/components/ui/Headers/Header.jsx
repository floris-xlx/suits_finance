import React, { useState, useEffect } from 'react';

import LoggedInUserCard from '@/app/components/ui/Cards/LoggedInUserCard';
import XylexLogo from '@/app/components/ui/Logos/Xylex';
import SyncingCard from '@/app/components/ui/Loading/SyncingCard';

import { useUserStore, useFeatureFlagStore, useLoadingStore } from '@/app/stores/stores';
import { IsUserIdGlobalAdmin } from '@/app/client/supabase/SupabaseOrgData';
import { GetUserFeatureFlags } from '@/app/client/supabase/SupabaseUserData';

// header
import HeaderItem from './HeaderItem';

const Header = ({
  setIsPaletteSearchOpen,
  logoHref = '/'
}) => {
  const { featureFlag, setFeatureFlag, setJournalFlag, setNewFilteringFlag } = useFeatureFlagStore();
  const { user, setIsAdmin } = useUserStore();
  const { loading } = useLoadingStore();

  useEffect(() => {
    if (loading.authLoading) {
      return;
    }

    async function checkFeatureFlags() {
      const featureFlags = await GetUserFeatureFlags(user.id);

      if (!featureFlags) {
        return;
      }

      const journalFlag = featureFlags.feature_journal;
      setJournalFlag(journalFlag);
    }
    checkFeatureFlags();
  }, [user.id, setJournalFlag]);


  // call a useeffect to check if the user is an admin with the user id
  useEffect(() => {
    async function checkIfUserIsAdmin() {
      const isAdmin = await IsUserIdGlobalAdmin(user.id);

      setIsAdmin(isAdmin);
    }
    checkIfUserIsAdmin();
  }, [user.id, setIsAdmin]);

  return (
    <header
      id="page-header"
      className="z-20 flex flex-none items-center border-b border-primary bg-secondary backdrop-blur-sm lg:fixed lg:end-0 lg:start-0 lg:top-0 lg:h-20 "
    >
      < SyncingCard />

      <div className="w-[1415px] mx-auto px-[75px] ">
        <div className="flex justify-between py-5 lg:py-0">
          <div className="flex items-center gap-2 lg:gap-6 header-offset">
            <div
              // href="/dashboard/"
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2"
            >
              <XylexLogo size={'medium'} href={logoHref} />
            </div>
            {/* < HeaderItem targetHref={'/manage'} currentHref={logoHref} hide={!featureFlag.isJournalFlag} label={'Manage'} />
            < HeaderItem targetHref={'/journal'} currentHref={logoHref} hide={!featureFlag.isJournalFlag} label={'Journal'} />
            < HeaderItem targetHref={'/signal'} currentHref={logoHref} hide={!user.admin} label={'Signal'} /> */}
          </div>

          {/*
            FIXME:  mobile needs a way to access the top links too 
            also not all items on the top should be present in a journal view so maybe abstract 
            all buttons into a layout scoped to the view
            search, filter etc
          */}

          <div className="flex items-center">
            <div className="relative inline-block ">
              <LoggedInUserCard
                username={user.username}
                organization={user.organization}
                profilePicture={user.profile_picture}
                isAdmin={true}
                desktopView={true}
                setIsPaletteSearchOpen={setIsPaletteSearchOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;
