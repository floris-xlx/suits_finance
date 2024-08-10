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
import BaseLayout from '@/app/components/layouts/Base/BaseLayout';

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


export default function SettingsPage() {
  // auth
  const { userId } = useRequireAuth();
  const { featureFlag } = useFeatureFlagStore();
  const { view, setIsInJournal } = useUserViewStore();



  const [isPaletteSearchOpen, setIsPaletteSearchOpen] = useState(false);


  // zustand
  const { user } = useUserStore();
  const { loading } = useLoadingStore();

  // local states
  const [pendingTradesUpdate, setPendingTradesUpdate] = useState(false);

  // make sure to also get the state if the user is onboarderd
  // if the user is not onboarded, show the onboarding screen
  if (loading.authLoading) {
    return <LoaderScreen />;
  }


  return (
    <BaseLayout>

    </BaseLayout>
  );
}
