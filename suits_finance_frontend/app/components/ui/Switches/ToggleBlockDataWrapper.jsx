import React, { useState, useEffect } from 'react';
import { Switch, cn } from '@nextui-org/react';

// graphql
import { GET_VALUE_DYNAMIC } from "@/app/client/graphql/query";
import { UPDATE_BOOL_DYNAMIC } from "@/app/client/graphql/mutation";
import { useMutation, useQuery } from '@apollo/client';
import client from "@/app/client/graphql/ApolloClient.jsx";

// loading
import SkeletonLoader from "@/app/components/ui/Loading/SkeletonLoader";

// caching
import {
  SetKeyLocalStorage_UNSAFE
} from '@/app/client/caching/LocalStorageRouter';

// notifications
import {
  SuccessSyncValueNotification
} from "@/app/components/ui/Notifications/Notifications.jsx";

const ToggleBlockDataWrapper = ({
  label,
  subText,
  supabaseKey,
  algorithmId = null,
  organization = null
}) => {
  // set the initial state of the switch
  const [isSelectedValue, setSelectedValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);

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

  const internalCacheKey = `${supabaseKey}_${algorithmId}`;



  const { data } = useQuery(GET_VALUE_DYNAMIC(supabaseKey), {
    variables: {
      algorithm_id: algorithmId,
      organization: organization // Replace with actual organization if needed
    },
    client: client
  });

  const queryResult = data?.algorithmsCollection?.edges[0]?.node?.[supabaseKey];

  // set local value
  useEffect(() => {
    if (queryResult !== undefined && queryResult !== null) {
      setSelectedValue(queryResult);
      setLoading(false);
    }
  }, [queryResult]);

  const currentUnixTime = Math.floor(Date.now() / 1000);
  const CACHEKEY = "cachedMountTimeDataWrapper"

  useEffect(() => {
    // set current unix time to local storage
    SetKeyLocalStorage_UNSAFE(CACHEKEY, currentUnixTime);
  }, []);

  const [updateBoolDynamic] = useMutation(UPDATE_BOOL_DYNAMIC(supabaseKey), {
    client: client
  });

  const handleToggle = async () => {
    setSelectedValue((prevState) => {
      setLoading(true);
      const newState = !prevState;

      SetKeyLocalStorage_UNSAFE(internalCacheKey, newState);

      updateBoolDynamic({
        variables: {
          algorithm_id: algorithmId,
          organization: organization,
          dynamicValue: newState
        }

      }).then(() => {
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

  return (
    // loading ? (
    //   <SkeletonLoader width={"full"} height={'full'} />
    // ) : (
    <Switch
      isSelected={isSelectedValue}
      onClick={() => {

        handleToggle();
      }} // Ensure onClick is a function
      classNames={{
        base: cn(
          'inline-flex flex-row-reverse w-full bg-primary hover:bg-accent items-center transition',
          'justify-between cursor-pointer rounded-md gap-2 p-4 border-2 border-transparent',
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
        <p className="text-medium font-[15px]">{label}</p>
        <p className="text-tiny text-secondary">{subText}</p>
      </div>
    </Switch>
    // )
  );
};

export default ToggleBlockDataWrapper;
