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
import { GaugeIcon } from '@/app/components/ui/Icon';

import NewUserOnboarding from '@/app/components/layouts/Onboarding/NewUserOnboarding';
import BalanceCard from '@/app/components/ui/Cards/BalanceCard';
import CreditCard from '@/app/components/ui/Cards/CreditCard';
import {
  PlusIcon,
  CreditCardIcon,
  SpeedometerIcon,
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
import ButtonIconWithLabel from '@/app/components/ui/Buttons/ButtonIconWithLabel';


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
        <div className="flex flex-col gap-y-2 mt-8">
          < BalanceCard
            balance={balance}
            currency={currency}

          />
          < CreditCard
            fullName={user.username}
          />


          <div className="flex flex-row gap-x-8 w-fit mx-auto">
            <ButtonIconWithLabel label="Top up" > < PlusIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
            <ButtonIconWithLabel label="Transfer" > < ArrowUpIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
            <ButtonIconWithLabel label="Details" > < CreditCardIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
            <ButtonIconWithLabel label="Limits" > < GaugeIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
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
