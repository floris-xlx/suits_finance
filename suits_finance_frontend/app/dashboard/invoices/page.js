// app/page.js
'use client';

import React, { useState, useEffect, Fragment } from 'react';
import styles from '../styles.module.css';
import ThemeButton from '@/app/components/ui/Theme/ThemeButton';
import LoggedInUserCard from '@/app/components/ui/Cards/LoggedInUserCard';
import { fetchUserInvoices } from '@/app/client/supabase/SupabaseUserData';

import { useRequireAuth } from '@/app/auth/hooks/useRequireAuth';
import LoaderScreen from '@/app/components/ui/Loading/LoaderScreen';
import Header from '@/app/components/ui/Headers/Header';
import { useRouter } from 'next/navigation';
// zustand
import {
  useUserStore,
  useLoadingStore,
} from '@/app/stores/stores';

import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import { TransfersBlockedNoBalanceNotification } from '@/app/components/ui/Notifications/Notifications.jsx';
import Stacked from '@/app/components/ui/Invoices/stacked';


export default function InvoicesPage() {
  // auth
  const { userId } = useRequireAuth();
  const { user } = useUserStore();
  const { loading } = useLoadingStore();

  // INSERT_YOUR_CODE

  
  const [invoiceId, setInvoiceId] = useState(null);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { search } = location;
      const params = new URLSearchParams(search);
      const invoiceId = params.get('id');

      if (!invoiceId) {
        setLoadingInvoices(false);
        location.replace('/dashboard');
        return;
      }
      setLoadingInvoices
      setInvoiceId(invoiceId);
      const invoices = await fetchUserInvoices({ userId: user.id, invoiceId });
      setInvoice(invoices[0]);
      setLoadingInvoices(false);

      if (!invoices.length) {
        
        location.replace('/dashboard');
        setLoadingInvoices(false);
      }
    };

    fetchInvoices();
  }, [user.id]);


  const [isPaletteSearchOpen, setIsPaletteSearchOpen] = useState(false);
  const [pendingTradesUpdate, setPendingTradesUpdate] = useState(false);

  const [isMobile, setIsMobile] = useState(false);


  const [currentCard, setCurrentCard] = useState({
    fullName: 'John Doe',
    cardNumber: '4642348998677632',
    expiryDate: '12/24',
    balance: -6815.34,
    currency: 'EUR',
  });

  const DEMO_TRANSACTION = {
    id: '1',
    date: '2024-09-08',
    title: 'Balance Top Up',
    amount: 500,
    currency: 'EUR',
    recipient: 'John Doe',
    sender: 'Floris Ramakers',
    status: 'completed',
    card: currentCard,
  };


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



  if (loading.authLoading && loadingInvoices) {
    return <LoaderScreen />;
  }


  
  return (
    <div className={styles.containerLogin}>
      <div className="bg-primary  mt-0 lg:mt-[80px] h-[120vh] mb-[400px] min-h-[90.75vh]">
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
          <Stacked invoice={invoice}/>
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
