// app/settings/page.js
'use client';

import React, { useState, useEffect, Fragment } from 'react';

import { useRequireAuth } from '@/app/auth/hooks/useRequireAuth';
import LoaderScreen from '@/app/components/ui/Loading/LoaderScreen';

// layouts
import BaseLayout from '@/app/components/layouts/Base/BaseLayout';
import SettingsUserLayout from '@/app/components/layouts/Forms/SettingsUser'; 

// zustand
import {
  useUserStore,
  useLoadingStore,
} from '@/app/stores/stores';


export default function SettingsPage() {
  // auth
  const { userId } = useRequireAuth();

  // zustand
  const { user } = useUserStore();
  const { loading } = useLoadingStore();

  // if (loading.authLoading) {
  //   return <LoaderScreen />;
  // }


  return (
<p className="text-primary text-xl">Settings Page</p>

    // <BaseLayout>
    // <p className="text-primary text-xl">Settings Page</p>
    //   <SettingsUserLayout user={user} />
    // </BaseLayout>
  );
}
