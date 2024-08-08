// app/page.js
'use client';

import React, { useState, useEffect, Fragment } from 'react';
import styles from './styles.module.css';
import ThemeButton from '@/app/components/ui/Theme/ThemeButton';
import LoggedInUserCard from '@/app/components/ui/Cards/LoggedInUserCard';

import { useRequireAuth } from '@/app/auth/hooks/useRequireAuth';
import LoaderScreen from '@/app/components/ui/Loading/LoaderScreen';
import Header from '@/app/components/ui/Headers/Header';
import { HomeIcon } from '@heroicons/react/24/outline';

import NewUserOnboarding from '@/app/components/layouts/Onboarding/NewUserOnboarding';

// zustand
import {
  useUserStore,
  useLoadingStore,
  useUserViewStore,
  useLayoutStore,
  useDataStore,
  useOnboardingStore,
  useFeatureFlagStore
} from '@/app/stores/stores';


export default function JournalPage() {
  // auth
  const { userId } = useRequireAuth();
  const { data, setPendingTradesZustand, clearPendingTrades } = useDataStore();
  const { featureFlag } = useFeatureFlagStore();
  const { view, setIsInJournal } = useUserViewStore();



  const [isPaletteSearchOpen, setIsPaletteSearchOpen] = useState(false);


  // zustand
  const { user, setUsername, setOrganization, setProfilePicture } = useUserStore();
  const { loading, setPendingTradesLoading } = useLoadingStore();
  const { layout, setLayoutToPendingTrades } = useLayoutStore();

  console.log(user);

  // local states
  const [pendingTradesUpdate, setPendingTradesUpdate] = useState(false);


  // make sure to also get the state if the user is onboarderd
  // if the user is not onboarded, show the onboarding screen
  if (loading.authLoading) {
    return <LoaderScreen />;
  }


  return (
    <div className={styles.containerLogin}>

      <div className="bg-primary  mt-0 lg:mt-[80px] h-[100%] min-h-[93.75vh]">

        {/* layout for journal */}

        <div className="flex flex-col items-center gap-3 max-w-[1400px] w-full lg:hidden pb-0 ">
          <div className="w-[96%]">

            <LoggedInUserCard
              username={user.username}
              profilePicture={user.profile_picture}
              desktopView={false}
              setPendingTradesUpdate={setPendingTradesUpdate}
              setIsPaletteSearchOpen={setIsPaletteSearchOpen}
            />

          </div>

        </div>

    

      </div>

      <div className="hidden lg:block">
        <Header setIsPaletteSearchOpen={setIsPaletteSearchOpen} logoHref={'/journal'} />



      </div>

      <div className="fixed bottom-0 left-0 p-4 ml-[1px]  ">
        <div className="flex flex-col gap-y-3 items-center">
          <ThemeButton />
        </div>
      </div>
    </div>
  );
}
