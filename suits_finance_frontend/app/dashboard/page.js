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
import BalanceCard from '@/app/components/ui/Cards/BalanceCard';
import CreditCard from '@/app/components/ui/Cards/CreditCard';
import {
  PlusIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

// zustand
import {
  useUserStore,
  useLoadingStore,
} from '@/app/stores/stores';

import { Button } from "@nextui-org/react";
import ButtonIconWithLabel from '@/app/components/ui/Buttons/ButtonIconWithLabel';
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import { refreshPage } from '@/app/client/hooks/refreshPage';
import { DrawerHero, useDrawer } from "@/app/components/ui/Drawers/DrawerViewTrade";
import CardDetailsLayout from '@/app/components/layouts/Modals/cardDetails';
import { TransfersBlockedNoBalanceNotification } from '@/app/components/ui/Notifications/Notifications.jsx';
import TransactionsTableMobile from '@/app/components/ui/Tables/TransactionsTableMobile';
import TransactionsOverviewLayout  from '@/app/components/layouts/Modals/transactionsOverview';
import TopUpBalanceLayout  from '@/app/components/layouts/Modals/topUpBalance';
import CardLimitsLayout from '@/app/components/layouts/Modals/cardLimits';


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
    balance: -6815.34,
    currency: 'EUR',
  }

  const DEMO_TRANSACTION = {
    date: '2024-09-08',
    title: 'Balance Top Up',
    amount: 500,
    currency: 'EUR',
    recipient: 'John Doe',
    sender: 'John Doe',
    status: 'completed',
    card: DEMO_CARD,
  }

  const [currentCard, setCurrentCard] = useState(DEMO_CARD);



  // drawer stuff
  const { modalRef: modalRef_viewDetailsCard, handleOpenModal: handleOpenModal_DetailsCard } = useModal();
  const { modalRef: modalRef_viewTransactions, handleOpenModal: handleOpenModal_ViewTransactions } = useModal();
  const { modalRef: modalRef_topUpBalance, handleOpenModal: handleOpenModal_TopUpBalance } = useModal();
  const { modalRef: modalRef_cardLimits, handleOpenModal: handleOpenModal_CardLimits } = useModal();

  // auth stuff
  if (loading.authLoading) {
    return <LoaderScreen />;
  }


  // open card details
  const handleOpenCardDetails = () => {
    handleOpenModal_DetailsCard();
  }



  const isBalanceNegative = currentCard.balance < 0;

  // transfer money
  const handleTransfer = () => {

    if (isBalanceNegative) {
      TransfersBlockedNoBalanceNotification();
    }
  }

  // transaction view 
  const handleViewTransactions = () => {
    console.log('view transactions');

    handleOpenModal_ViewTransactions();
  }

  // top up balance
  const handleTopUpBalance = () => {
    handleOpenModal_TopUpBalance();
  }


  const [topUpAmount, setTopUpAmount] = useState(0);

  // card limits
  const handleCardLimits = () => {
    handleOpenModal_CardLimits();
  }


  return (
    <div className={styles.containerLogin}>
      <Modal
        title={'Card Details'}
        buttonText={'Close'}
        ref={modalRef_viewDetailsCard}

      >
        <CardDetailsLayout card={currentCard} />
      </Modal>
      <Modal
        title={'Transactions'}
        buttonText={'Close'}
        ref={modalRef_viewTransactions}

      >
        <TransactionsOverviewLayout transactions={[DEMO_TRANSACTION]} />
      </Modal>

      <Modal
        title={'Top Up Balance'}
        buttonText={'Continue'}
        ref={modalRef_topUpBalance}

      >
        <TopUpBalanceLayout setPaymentAmount={setTopUpAmount} balance={topUpAmount} />
      </Modal>


      <Modal
        title={'Card Limits'}
        buttonText={'Close'}

        ref={modalRef_cardLimits}
      >
        <CardLimitsLayout />
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
            <ButtonIconWithLabel label="Top up" onClick={handleTopUpBalance} > < PlusIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
            <ButtonIconWithLabel label="Transfer" onClick={handleTransfer} > < ArrowUpIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
            <ButtonIconWithLabel label="Details" onClick={handleOpenCardDetails} > < CreditCardIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
            <ButtonIconWithLabel label="Limits" onClick={handleCardLimits} > < GaugeIcon className="h-8 w-8 text-primary" /> </ButtonIconWithLabel>
          </div>
        </div>

        <div className="flex flex-row mx-auto max-w-[400px] mt-[45px]">
          < TransactionsTableMobile transactions={[DEMO_TRANSACTION]} handleViewTransactions={handleViewTransactions} />
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
