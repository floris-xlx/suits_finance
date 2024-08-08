// app/page.js
'use client';

import React, { useEffect, Fragment, useState } from 'react';
import styles from './styles.module.css';
import ThemeButton from '@/app/components/ui/Theme/ThemeButton';
import LoggedInUserCard from '@/app/components/ui/Cards/LoggedInUserCard';

import LoaderScreen from '@/app/components/ui/Loading/LoaderScreen';
import Header from '@/app/components/ui/Headers/Header';
// import NewUserOnboarding from '@/app/components/layouts/Onboarding/NewUserOnboarding';
import JournalNotEnabled from '@/app/components/ui/EmptyStates/JournalNotEnabled';
import BugReport from '@/app/components/ui/Popover/BugReport';

// layouts
import StrategyCardsGrid from '@/app/components/layouts/Grids/StrategyCards';
import StrategyDrilldown from '@/app/components/layouts/journal/StrategyDrilldown';

// opengraph
import { HeadJournal } from '@/app/components/layouts/OpenGraph/Journal';

// zustand
import { useUserStore, useLoadingStore, useUserViewStore, useFeatureFlagStore } from '@/app/stores/stores';

// data
import { GetStrategyById } from '@/app/client/supabase/SupabaseUserData';

export default function JournalPage() {
  const { featureFlag } = useFeatureFlagStore();
  const { view, setIsInJournal, setIsInJournalStrategiesOverview, setIsInStrategyDrilldown } = useUserViewStore();
  const { user } = useUserStore();
  const { loading } = useLoadingStore();


  const [strategyInQuery, setStrategyInQuery] = useState(null);
  const [strategy, setStrategy] = useState({ name: 'Strategy Name' });

  // useEffect to fetch the strategy by id
  useEffect(() => {
    if (!strategyInQuery) return;

    GetStrategyById(strategyInQuery).then((strategy) => {
      console.log(strategy);

      if (strategy) {
        setStrategy(strategy[0]);
      }
    });
  }, [strategyInQuery]);



  // get the query params strategy=id
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const strategyId = urlParams.get('strategy');


    if (strategyId) {
      setStrategyInQuery(strategyId);
      setIsInJournalStrategiesOverview(false);
      setIsInStrategyDrilldown(true);
    }
  }, []);



  // run a useEffect that sets the journal view to true on mount
  useEffect(() => {
    setIsInJournal(true);
  }, [setIsInJournal]);


  // if journal is not enabled for the user or if the user is an admin
  if (!featureFlag.isJournalFlag && !loading.authLoading) {
    return <JournalNotEnabled />;
  }

  // auth loading state
  if (loading.authLoading) {
    return <Fragment> <LoaderScreen /> </Fragment>;
  }

  return (
    <>
      {/* OpenGraph */}
      <HeadJournal />

      <div className={styles.containerLogin}>
        <div className="bg-primary  mt-0 lg:mt-[80px]   min-h-[100vh] sm:min-h-[100vh] lg:min-h-[93.75vh] ">

          {/* layout for journal */}

          <div className="flex flex-col items-center gap-3 max-w-[1400px] w-full lg:hidden pb-0 ">
            <div className="w-[96%]">

              <LoggedInUserCard
                username={user.username}
                profilePicture={user.profile_picture}
                desktopView={false}
              />

            </div>
          </div>

          <div>
            {/* 
            NEW USER ONBOARDING            
            <NewUserOnboarding /> 
          */}
            {view.isInStrategyDrilldown ? (
              <div className="sm:px-[40px] pt-6">
                <div className="flex flex-col items-center gap-3 max-w-[1250px] w-full pb-0 px-0  mx-auto ">
                  <StrategyDrilldown strategy={strategy} />
                </div>
              </div>
            ) : (
              <StrategyCardsGrid />
            )}

          </div>

        </div>

        <div className="hidden lg:block">
          <Header logoHref={'/journal'} />
        </div>

        <div className="fixed bottom-0 left-0 p-4 ml-[1px]  ">
          <div className="flex flex-col gap-y-3 items-center z-50">
            <ThemeButton />
            <BugReport />
            
          </div>
        </div>
      </div>
    </>
  );
}
