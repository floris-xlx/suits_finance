// app/page.js
'use client';

import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import ThemeButton from '@/app/components/ui/Theme/ThemeButton';
import LoggedInUserCard from '@/app/components/ui/Cards/LoggedInUserCard';
import { getUsername, getProfilePic, getOrganization } from '@/app/client/userdata/userData';
import { useRequireAuth } from '@/app/auth/hooks/useRequireAuth';
import LoaderScreen from '@/app/components/ui/Loading/LoaderScreen';
import useNotification from '@/app/client/hooks/useNotification';
import Header from '@/app/components/ui/Headers/Header';
import ButtonIcon from '@/app/components/ui/Buttons/ButtonIcon';
import { HomeIcon } from '@heroicons/react/24/outline';
import { IsTradeHashExoticToOrganization, IsTradeHashValid, GetPendingTradesByOrganization } from '@/app/client/supabase/SupabaseTradeData';
import { IsUserOrgAdmin, IsUserOrganizationAdmin } from '@/app/client/supabase/SupabaseUserData';
import { TradeHashExoticToOrgNotification, LoadingErrorNotification } from '@/app/components/ui/Notifications/Notifications.jsx';

// zustand
import {
  useUserStore, useLoadingStore, useUserViewStore,
  useLayoutStore, useDataStore, useTradeFiltersStore, useOrganizationStore,
} from '@/app/stores/stores';

// global layouts
import PendingTradesLayout from '@/app/components/layouts/Manage/PendingTrades';
import AlgorithmConfigLayout from '@/app/components/layouts/Manage/AlgorithmConfig';
import PaletteSearch from '@/app/components/ui/Palette/PaletteSearch';
import { refreshPage } from '../client/hooks/refreshPage';

// opengraph
import { HeadManage } from '@/app/components/layouts/OpenGraph/Manage';

export default function ManagerPage() {
  // auth
  const { userId } = useRequireAuth();
  const { setPendingTradesZustand } = useDataStore();
  const { clearAllFilters } = useTradeFiltersStore();
  const { setIsAdmin, setIsMember } = useOrganizationStore();
  const [isPaletteSearchOpen, setIsPaletteSearchOpen] = useState(false);


  // zustand
  const { view, setDrilldownTradeHashPendingTrades, setEditingModePendingTrades, setIsInJournal } = useUserViewStore();
  const { user, setUsername, setOrganization, setProfilePicture } = useUserStore();
  const { loading, setPendingTradesLoading } = useLoadingStore();
  const { layout, setLayoutToPendingTrades } = useLayoutStore();

  // local states
  const [pendingTrades, setPendingTrades] = useState([]);
  const { triggerNotification } = useNotification();
  const [currentDrilldownTradeHash, setCurrentDrilldownTradeHash] = useState(null);

  // effect to run on mount to set the journal view to false
  useEffect(() => {
    setIsInJournal(false);
  }, [setIsInJournal]);


  // loading time spent state
  const [timeSpent, setTimeSpent] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (loading.authLoading || loading.pendingTradesLoading) {
        setTimeSpent(timeSpent => timeSpent + 100);
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [loading.authLoading, loading.pendingTradesLoading]);


  // responsible for if the loader gets stuck somehow to redirect to the login page
  if (timeSpent > 5000 && (loading.authLoading || loading.pendingTradesLoading)) {
    LoadingErrorNotification();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }

    // go to ./
    window.location.href = '/';
  }

  // fetch org admin status
  useEffect(() => {
    const fetchOrgAdminStatus = async () => {
      const isAdmin = await IsUserOrgAdmin(user.id);

      if (isAdmin) {
        setIsAdmin(true);
      } else {
        setIsMember(true);
      }

      const isOrgAdmin = await IsUserOrganizationAdmin(user.id);
      if (isOrgAdmin) {
        setIsAdmin(true);
      }
    };

    fetchOrgAdminStatus();
  }, [user.organization, user.id]);


  // handle the trade hash query parameter in the URL bar  
  const removeTradeHashQuery = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('trade_hash');
    window.history.replaceState({}, '', url);
  }

  useEffect(() => {
    const checkTradeHash = async () => {
      // parse the hash from the url
      const urlParams = new URLSearchParams(window.location.search);
      const tradeHash = urlParams.get('trade_hash');

      // if there is no trade hash, return
      if (!tradeHash) {
        clearTradeHashState();
        return;
      } else {
        clearAllFilters();
      }
      // check if the trade hash is valid
      const isValidHash = await IsTradeHashValid(tradeHash);

      // if the trade hash is not valid, return
      if (!isValidHash) {
        clearTradeHashState();
        return;
      }

      // check if the trade hash is exotic
      const isExotic = await IsTradeHashExoticToOrganization(tradeHash, user.organization);

      // if it is exotic, notify the user
      // and clear the trade hash state
      // and clear the pending trades
      if (isExotic) {
        TradeHashExoticToOrgNotification({ tradeHash });
        await new Promise(resolve => setTimeout(resolve, 2000));

        clearTradeHashState();
        await fetchPendingTrades();
        refreshPage();
      } else {
        setCurrentDrilldownTradeHash(tradeHash);
        setDrilldownTradeHashPendingTrades(tradeHash);
        setEditingModePendingTrades(true);
      }
    };

    const clearTradeHashState = () => {
      removeTradeHashQuery();
      setCurrentDrilldownTradeHash(null);
      setDrilldownTradeHashPendingTrades(null);
      setEditingModePendingTrades(false);
    };

    checkTradeHash();

  }, []);


  // handle the layout router
  useEffect(() => {
    // if both are false, set to pending trades as default
    if (!layout.isLayoutToAlgorithmSettings && !layout.isLayoutToPendingTrades) {
      setLayoutToPendingTrades();
    }
  }, []);


  const fetchPendingTrades = async () => {
    setPendingTradesLoading(true);
    const response = await GetPendingTradesByOrganization(user.organization);
    setPendingTrades(response);
    setPendingTradesZustand(response);
    setPendingTradesLoading(false);
  };


  // fetch the user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = getUsername();
        const profilePicture = getProfilePic();
        const organization = await getOrganization();

        setUsername(username);
        setProfilePicture(profilePicture);

        if (organization) {
          setOrganization(organization);
          setPendingTradesLoading(true);
          const response = await GetPendingTradesByOrganization(organization);
          setPendingTrades(response);
          setPendingTradesZustand(response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setPendingTradesLoading(false);
      }
    };

    // if we have a userId, fetch the data
    if (userId) {
      fetchData();
    }
  }, [userId]);


  if (loading.authLoading || loading.pendingTradesLoading) {
    return <LoaderScreen />
  }

  // handle go back to pending trades layout
  const handleGoBackToPendingTrades = () => {
    setLayoutToPendingTrades();
  };


  return (
    <>
      < HeadManage />

      <div className={styles.containerLogin}>
        < PaletteSearch isOpen={isPaletteSearchOpen} setIsOpen={setIsPaletteSearchOpen} />

        <div className={`flex min-h-full bg-primary flex-col ${view.isEditingModePendingTrades ? '!overflow-x-hidden' : 'pt-[130px] px-[25px] '}`}>

          {/* layout for pending trades */}
          {layout.isLayoutToPendingTrades && (
            <PendingTradesLayout
              pendingTrades={pendingTrades}
              currentDrilldownTradeHash={currentDrilldownTradeHash}
              triggerNotification={triggerNotification}
              setCurrentDrilldownTradeHash={setCurrentDrilldownTradeHash}
            />
          )}

          {/* layout for algorithm settings */}
          {layout.isLayoutToAlgorithmSettings && (
            <AlgorithmConfigLayout />
          )}

          {/* layout for algorithm settings */}
          <div className={`fixed top-0 left-0  flex flex-row justify-between w-full ${view.isEditingModePendingTrades ? '' : 'border-b border-primary bg-primary'}`}>

            {/* this is the main header */}
            <div className="flex flex-col items-center gap-3 max-w-[1400px] w-full lg:hidden pb-0  bg-primary border-b border-primary ">

              <div className="w-[96%]">

                <LoggedInUserCard
                  username={user.username}
                  profilePicture={user.profile_picture}
                  desktopView={false}
                  setIsPaletteSearchOpen={setIsPaletteSearchOpen}
                />

              </div>
            </div>

            <div className="hidden lg:block">
              <Header setIsPaletteSearchOpen={setIsPaletteSearchOpen}
                logoHref={'/manage'}
              />

            </div>
          </div>
          <div className="fixed bottom-0 left-0 p-4 ml-[1px]  ">
            <div className="flex flex-col gap-y-3 items-center">
              <ButtonIcon
                onPress={handleGoBackToPendingTrades}
                hide={layout.isLayoutToPendingTrades}
                border={true}
                transparent={false}
              >
                <HomeIcon className="w-6 h-6 text-accent" />
              </ButtonIcon>
              <ThemeButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
