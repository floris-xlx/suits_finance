// app/page.js
'use client';

import React, { useState, useEffect, Fragment } from 'react';
import styles from './styles.module.css';
import ThemeButton from '@/app/components/ui/Theme/ThemeButton';
import LoggedInUserCard from '@/app/components/ui/Cards/LoggedInUserCard';

import { useRequireAuth } from '@/app/auth/hooks/useRequireAuth';
import LoaderScreen from '@/app/components/ui/Loading/LoaderScreen';
import Header from '@/app/components/ui/Headers/Header';
import { HomeIcon, ArrowUpIcon, DeviceTabletIcon, BoltIcon } from '@heroicons/react/24/outline';

import NewUserOnboarding from '@/app/components/layouts/Onboarding/NewUserOnboarding';
import BalanceCard from '@/app/components/ui/Cards/BalanceCard';
import CreditCard from '@/app/components/ui/Cards/CreditCard';
import {
  PaintBrushIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BellAlertIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

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

import { Button } from "@nextui-org/react";

export default function DashboardPage() {
  // auth
  const { userId } = useRequireAuth();
  const { user } = useUserStore();
  const { loading } = useLoadingStore();


  const [isPaletteSearchOpen, setIsPaletteSearchOpen] = useState(false);
  const [pendingTradesUpdate, setPendingTradesUpdate] = useState(false);


  // make sure to also get the state if the user is onboarderd
  // if the user is not onboarded, show the onboarding screen
  if (loading.authLoading) {
    return <LoaderScreen />;
  }

  const balance = 6815.34;
  const currency = 'EUR';

  return (
    <div className={styles.containerLogin}>

      <div className="bg-primary  mt-0 lg:mt-[80px] h-[99%] min-h-[90.75vh]">
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

        {/* This is where the body layout goes */}
        <div className="flex flex-col gap-y-2">
          < BalanceCard
            balance={balance}
            currency={currency}
          />
          < CreditCard />


          <div className="flex flex-row gap-x-8 w-fit mx-auto">
            <div className="flex flex-col gap-y-1 items-center">
              <button className="bg-accent rounded-md p-2 hover:transition hover:bg-brand-primary">
                < PlusIcon className="h-8 w-8 text-primary" />
              </button>

              <p className="text-primary text-xs select-none mt-[5px]">Top up</p>
            </div>

            <div className="flex flex-col gap-y-1 items-center">
              <button className="bg-accent rounded-md p-2 hover:transition hover:bg-brand-primary">
                < ArrowUpIcon className="h-8 w-8 text-primary" />
              </button>

              <p className="text-primary text-xs select-none mt-[5px]">Transfer</p>
            </div>

            <div className="flex flex-col gap-y-1 items-center">
              <button className="bg-accent rounded-md p-2 hover:transition hover:bg-brand-primary">
                < DeviceTabletIcon className="h-8 w-8 text-primary" />
              </button>

              <p className="text-primary text-xs select-none mt-[5px]">Details</p>
            </div>

            <div className="flex flex-col gap-y-1 items-center">
              <button className="bg-accent rounded-md p-2 hover:transition hover:bg-brand-primary">
                < BoltIcon className="h-8 w-8 text-primary" />
              </button>

              <p className="text-primary text-xs select-none mt-[5px]">Limits</p>
            </div>
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
