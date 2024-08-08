'use client';

import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import Popup from '@/app/components/ui/Notifications/Popup.jsx';
import Xylex from '@/app/components/ui/Logos/Xylex.jsx';
import ThemeButton from '@/app/components/ui/Theme/ThemeButton.jsx';
import SignInButton from '@/app/components/ui/Buttons/SignIn.jsx';

import InputField from '@/app/components/ui/InputFields/InputField';

import VerticalTabFullWidth from '@/app/components/ui/Tabs/OrganizationTab';
import PairnameAutoComplete from '@/app/components/ui/AutoComplete/PairnameAutoComplete';
import datetimeToUnix from '@/app/client/hooks/datetime/DatetimeToUnix';

// import apis
import CreateTradeHash from '@/app/client/api/TradeApi';
import { AddTrade } from '@/app/client/supabase/SupabaseUserData.js';
import SendSignal from '@/app/client/api/SendSignal.js';
import LoaderScreen from '@/app/components/ui/Loading/LoaderScreen';
import { GetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import { useRequireAuth } from '@/app/auth/hooks/useRequireAuth';

// zustand
import { useLoadingStore, useUserStore  } from '@/app/stores/stores';

import {
  SignalGeneratedSuccessNotification 
} from '@/app/components/ui/Notifications/Notifications.jsx';

export default function SignalGeneration() {
  // zustand
  const { loading } = useLoadingStore();
  const { user } = useUserStore();



  const { userId } = useRequireAuth();
  const [notification, setNotification] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [symbol, setSymbol] = useState('');
  const [entryLevel, setEntryLevel] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  const [takeProfit2, setTakeProfit2] = useState(0);
  const [takeProfit3, setTakeProfit3] = useState(0);
  const [dateTime, setDateTime] = useState(null);
  const [unixTime, setUnixTime] = useState(0);
  const [organization, setOrganization] = useState(GetKeyLocalStorage('cachedOrganization' || null));
  const [tradeHash, setTradeHash] = useState(null);
  const [timeframe, setTimeframe] = useState('15min');
  const [algorithmId, setAlgorithmId] = useState(null);

  const [HashLoading, setHashLoading] = useState(false);
  const [HashSuccess, setHashSuccess] = useState(false);
  const [HashError, setHashError] = useState(false);
  const [TradeLoading, setTradeLoading] = useState(false);
  const [TradeSuccess, setTradeSuccess] = useState(false);
  const [TradeError, setTradeError] = useState(false);

  const [buttonText, setButtonText] = useState('Generate Signal');



  useEffect(() => {
    if (HashLoading) {
      setButtonText(LoadingHashText);
    } else if (HashSuccess) {
      setButtonText(SuccessHashText);
    } else if (HashError) {
      setButtonText(ErrorHashText);
    } else if (TradeLoading) {
      setButtonText(SendingTradeText);
    } else if (TradeSuccess) {
      setButtonText(SuccessTradeText);
    }
  }, [HashLoading, HashSuccess, HashError, TradeLoading, TradeSuccess]);

  const LoadingHashText = 'Requesting trade hash...';
  const SuccessHashText = 'Trade hash received!';
  const ErrorHashText = 'Error receiving trade hash';
  const SendingTradeText = 'Sending trade to database...';
  const SuccessTradeText = 'Trade sent successfully!';

  useEffect(() => {
    if (dateTime) {
      setUnixTime(datetimeToUnix(dateTime));
    }
  }, [dateTime]);

  const handleNewTrade = async () => {
    setLoading(true);
    setHashLoading(true);

    try {
      const tradeHash = await CreateTradeHash(
        organization,
        symbol,
        unixTime,
        entryLevel
      );

      if (tradeHash) {
        setTradeHash(tradeHash);
        setHashSuccess(true);
        let localOrganization = user.organization;

        try {
          const newTrade = await AddTrade(
            tradeHash,
            symbol,
            entryLevel,
            stopLoss,
            takeProfit,
            takeProfit2,
            takeProfit3,
            unixTime,
            localOrganization,
            timeframe
          );
          setTradeSuccess(true);

          const signal = await SendSignal(tradeHash, localOrganization);

          console.log('Signal sent: ', signal);
          console.log('Trade added: ', newTrade);

          SignalGeneratedSuccessNotification({
            algorithm_id: algorithmId,
            trade_hash: tradeHash
          });

        } catch (error) {
          setTradeError(true);
          console.error('Error adding trade: ', error);
        }
      } else {
        setHashError(true);
        console.error('Trade hash is null or undefined.');
      }
    } catch (error) {
      setHashError(true);
      console.error('Error creating trade hash: ', error);
    } finally {
      setLoading(false);
      setHashLoading(false);
    }
  };
  if (loading.authLoading) {
    return <LoaderScreen />;
  }

  return (
    <>
      <div className={styles.containerLogin}>
        <div className="flex min-h-full">
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="fixed top-0 left-0 p-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm z-10">
              <Popup messageType={notification} />
            </div>

            <div className="mx-auto w-full max-w-sm lg:w-96 SlideInAnimation">
              <div>
                <Xylex />

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
                  Generate signal
                </h2>
              </div>

              <div className="mt-8">
                <div></div>

                <div className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <div className="mt-1">
                        <PairnameAutoComplete
                          setPairname={setSymbol}
                          preloadedPairname={''}
                          label={'Pairname'}
                        />
                        <InputField
                          label={'Entry level'}
                          setValue={setEntryLevel}
                          padding={0}
                          marginTop={4}
                          width={'full'}
                        />
                        <InputField
                          label={'Stoploss level'}
                          setValue={setStopLoss}
                          padding={0}
                          marginTop={4}
                          width={'full'}
                        />
                        <InputField
                          label={'Take profit level'}
                          setValue={setTakeProfit}
                          padding={0}
                          marginTop={4}
                          width={'full'}
                        />
                        <InputField
                          label={'Take profit level 2'}
                          setValue={setTakeProfit2}
                          padding={0}
                          marginTop={4}
                          width={'full'}
                        />
                        <InputField
                          label={'Take profit level 3'}
                          setValue={setTakeProfit3}
                          padding={0}
                          marginTop={4}
                          width={'full'}
                        />

                        <InputField
                          label={'Date time'}
                          placeholder={'Tue 28 May 05:00'}
                          type={'text'}
                          setValue={setDateTime}
                          padding={0}
                          marginTop={4}
                          width={'full'}
                        />
                        <InputField
                          label={'Unixtime'}
                          disabled={true}
                          value={unixTime}
                          onChange={setUnixTime}
                          padding={0}
                          marginTop={4}
                          width={'full'}
                        />

                        <VerticalTabFullWidth
                          label={'Organization'}
                          setValue={setOrganization}
                          organizationNames={[
                            'Xylex',
                            'Diamant Capital',
                          ]}
                        />
                        <VerticalTabFullWidth
                          label={'Algorithm ID'}
                          setValue={setAlgorithmId}
                          organizationNames={[
                            'genesis',
                            'nexus',
                            'diamant_genesis'
                          ]}
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <SignInButton
                        handleSignIn={handleNewTrade}
                        isLoading={isLoading}
                        SignInText={buttonText}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 p-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm">
            <ThemeButton />
          </div>

          <div className="relative hidden w-0 flex-1 lg:block border-l border-primary shadow-inner bg-secondary ">
            <div className="absolute top-0 right-0 p-8 SlideInAnimation ">
              <Xylex size={'large'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}