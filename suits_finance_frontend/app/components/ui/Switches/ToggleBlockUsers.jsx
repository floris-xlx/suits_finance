import React, { useState, useEffect } from 'react';
import { Switch, cn } from '@nextui-org/react';

// graphql
import { GET_BOOL_VALUE_USERS } from "@/app/client/graphql/query";
import { UPDATE_BOOL_USERS } from "@/app/client/graphql/mutation";
import { useMutation, useQuery } from '@apollo/client';
import client from "@/app/client/graphql/ApolloClient.jsx";

// loading
import SkeletonLoader from "@/app/components/ui/Loading/SkeletonLoader";

// caching
import {
  SetKeyLocalStorage_UNSAFE,
} from '@/app/client/caching/LocalStorageRouter';

// notifications
import {
  SuccessSyncValueNotification
} from "@/app/components/ui/Notifications/Notifications.jsx";

import {
  useUserPreferencesStore
} from '@/app/stores/stores';

const ToggleBlockUsers = ({
  label,
  subText,
  supabaseKey,
  userId,
  cacheKey = null,
  toggleHeight = null
}) => {
  // set the initial state of the switch
  const [isSelectedValue, setSelectedValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);

  const { preferences, setShowCurrentPriceOnPendingTrade, setShowPipsAwayOnPendingTrade, setShowRrOnPendingTrade, setShowTimeframeOnPendingTrade, setShowTimeOnPendingTrade, setShowPipsOnPendingTrade } = useUserPreferencesStore();

  useEffect(() => {
    const preferenceMap = {
      'show_tf_on_pending_trade': setShowTimeframeOnPendingTrade,
      'show_rr_on_pending_trade': setShowRrOnPendingTrade,
      'show_time_on_pending_trade': setShowTimeOnPendingTrade,
      'show_pips_away_on_pending_trade': setShowPipsAwayOnPendingTrade,
      'show_current_price_on_pending_trade': setShowCurrentPriceOnPendingTrade,
      'show_pips_on_pending_trade': setShowPipsOnPendingTrade
    };

    const updatePreference = preferenceMap[supabaseKey];
    if (updatePreference && isSelectedValue !== null && isSelectedValue !== undefined && preferences[supabaseKey] !== isSelectedValue && initialLoading == false) {
      updatePreference(isSelectedValue);
    }
  }, [isSelectedValue]);


  // loading time can load up to 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTime(loadingTime + 1);
    }, 1000);

    if (loadingTime >= 5) {
      setLoading(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [loadingTime]);

  const internalCacheKey = `${supabaseKey}_${userId}`;


  // handle the data fetch from gql
  const { data } = useQuery(GET_BOOL_VALUE_USERS(supabaseKey), {
    variables: {
      user_id: userId
    },
    client: client
  });

  const queryResult = data?.usersCollection?.edges[0]?.node?.[supabaseKey];

  // set local value
  useEffect(() => {
    if (queryResult !== undefined && queryResult !== null) {
      setSelectedValue(queryResult);
      setInitialLoading(false);
      setLoading(false);
    }
  }, [queryResult]);

  const currentUnixTime = Math.floor(Date.now() / 1000);
  const CACHEKEY = "cachedMountTimeDataWrapper"

  useEffect(() => {
    // set current unix time to local storage
    SetKeyLocalStorage_UNSAFE(CACHEKEY, currentUnixTime);
  }, []);

  const [updateBoolDynamic] = useMutation(UPDATE_BOOL_USERS(supabaseKey), {
    variables: {
      user_id: userId,
      dynamicValue: isSelectedValue
    },
    client: client
  });

  const handleToggle = async () => {
    setSelectedValue((prevState) => {
      setLoading(true);
      const newState = !prevState;

      SetKeyLocalStorage_UNSAFE(internalCacheKey, newState);

      updateBoolDynamic({
        variables: {
          user_id: userId,
          dynamicValue: newState
        }

      }).then(() => {
        console.log('success');
        setLoading(false);

        setTimeout(() => { }, 100);
      });

      return newState;
    });
  };

  const waitForLoadingAndNotify = async () => {
    while (!loading) {
      await new Promise(resolve => setTimeout(resolve, 100)); // wait for 100ms
    }
    SuccessSyncValueNotification({ valueType: supabaseKey });
  };

  useEffect(() => {
    waitForLoadingAndNotify();
  }, [loading]);


  // if initialLoading turns false then call toggleHeight
  useEffect(() => {
    if (typeof toggleHeight === 'function' && !initialLoading) {
      toggleHeight();
    }
  }, [initialLoading]);


  return (
    initialLoading ? (
      <SkeletonLoader width={"full"} height={'full'} />
    ) : (
      <div
        className="mt-1 sm:mt-2  transition-height overflow-hidden"

      >

        <Switch
          isSelected={isSelectedValue}
          onClick={() => {

            handleToggle();
          }} // Ensure onClick is a function
          classNames={{
            base: cn(
              'inline-flex flex-row-reverse w-full bg-primary hover:bg-accent items-center transition',
              'justify-between cursor-pointer rounded-md gap-2 p-2 sm:p-4 border-2 border-transparent',
              'group-data-[pressed=true]:bg-brand-primary' // base color when pressed
            ),
            wrapper: cn(
              'p-0 h-4 overflow-visible bg-input-primary',
              'group-data-[selected=true]:bg-brand-primary' // wrapper color when pressed
            ),
            thumb: cn(
              'w-6 h-6 border-2 shadow-lg rounded-[9999px]',
              //selected
              'group-data-[selected=true]:ml-6',
              // pressed
              'group-data-[pressed=true]:w-7 ',
              'group-data-[selected]:group-data-[pressed]:ml-4 '
            ),
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-small sm:text-medium font-[12px] sm:font-[15px]">{label}</p>
            <p className="text-tiny text-secondary">{subText}</p>
          </div>
        </Switch>
      </div>
    )
  );
};

export default ToggleBlockUsers;
