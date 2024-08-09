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
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import { refreshPage } from '@/app/client/hooks/refreshPage';
import { DrawerHero, useDrawer } from "@/app/components/ui/Drawers/DrawerViewTrade";
import CardDetailsLayout from '@/app/components/layouts/Modals/cardDetails';

export default function DashboardPage() {
  // auth
  const { userId } = useRequireAuth();
  const { user } = useUserStore();
  const { loading } = useLoadingStore();


  const [isPaletteSearchOpen, setIsPaletteSearchOpen] = useState(false);
  const [pendingTradesUpdate, setPendingTradesUpdate] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);


  // FIXME: remove this
  const DEMO_CARD = {
    fullName: 'John Doe',
    cardNumber: '4642348998677632',
    expiryDate: '12/24',
    balance: 6815.34,
    currency: 'EUR',
  }

  const [currentCard, setCurrentCard] = useState(DEMO_CARD);



  // drawer stuff
  const { modalRef: modalRef_viewDetailsCard, handleOpenModal: handleOpenModal_DetailsCard } = useModal();

  if (loading.authLoading) {
    return <LoaderScreen />;
  }


  const handleOpenCardDetails = () => {
    handleOpenModal_DetailsCard();
  }



  return (
    <div className={styles.containerLogin}>
      <Modal 
        title={'Card Details'}
        buttonText={'Close'}
        ref={modalRef_viewDetailsCard}

      >
        <CardDetailsLayout card={currentCard}/>
      </Modal>



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
        <div className="flex flex-col gap-y-2 pt-8">
          < BalanceCard
            balance={currentCard.balance}
            currency={currentCard.currency}
          />
          < CreditCard
            fullName={currentCard.fullName}
          />

          <div className="flex flex-row gap-x-8 w-fit mx-auto">
            <ButtonIconWithLabel label="Top up" > < PlusIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
            <ButtonIconWithLabel label="Transfer" > < ArrowUpIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
            <ButtonIconWithLabel label="Details" onClick={handleOpenCardDetails} > < CreditCardIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
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
