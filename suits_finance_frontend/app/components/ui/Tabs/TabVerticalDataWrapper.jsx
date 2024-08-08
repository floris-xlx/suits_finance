import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";

// caching
import { SetKeyLocalStorage, GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";

// notifications
import {
  SuccessSyncValueNotification
} from "@/app/components/ui/Notifications/Notifications.jsx";
// caching
import {
  SetKeyLocalStorage_UNSAFE
} from '@/app/client/caching/LocalStorageRouter';
import { useMutation, useQuery } from '@apollo/client';
import client from "@/app/client/graphql/ApolloClient.jsx";
import { UPDATE_VALUE_DYNAMIC_TRADES } from '@/app/client/graphql/mutation';
import { GET_VALUE_DYNAMIC_TRADES } from '@/app/client/graphql/query';


const TabVerticalDataWrapper = ({
  label,
  options = ["Option 1", "Option 2", "Option 3"],
  supabaseKey = 'trade_status',
  tradeHash = null
}) => {

  // set the initial state of the switch
  const [isSelectedValue, setSelectedValue] = useState('');
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

  const internalCacheKey = `${supabaseKey}_${tradeHash}`;
  const currentUnixTime = Math.floor(Date.now() / 1000);
  const CACHEKEY = "cachedMountTimeDataWrapper"

  useEffect(() => {
    // set current unix time to local storage
    SetKeyLocalStorage_UNSAFE(CACHEKEY, currentUnixTime);
  }, []);


  const { data } = useQuery(GET_VALUE_DYNAMIC_TRADES(supabaseKey), {
    variables: {
      trade_hash: tradeHash,
    },
    client: client
  });

  const queryResult = data?.tradesCollection?.edges[0]?.node?.[supabaseKey];

  // set local value
  useEffect(() => {
    if (queryResult !== undefined && queryResult !== null) {
      setSelectedValue(queryResult);
      setLoading(false);
    }
  }, [queryResult]);


  const [updateValueDynamic] = useMutation(UPDATE_VALUE_DYNAMIC_TRADES(supabaseKey), {
    client: client
  });


  const handleToggle = async (selectedKey) => {
    if (selectedKey === "unapproved") {
      return;
    
    }


    setSelectedValue((prevState) => {
      setLoading(true);
      const newState = selectedKey;

      SetKeyLocalStorage_UNSAFE(internalCacheKey, newState);

      updateValueDynamic({
        variables: {
          trade_hash: tradeHash,
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
    <div className="flex w-full flex-col mt-4">
      <label className="block text-sm font-medium text-accent mb-1">
        {label}
      </label>
      <Tabs
        isVertical={true}
        radius="sm"
        aria-label="Options"
        fullWidth
        size="lg"
        className="border border-primary rounded-md shadow-sm"
        selectedKey={isSelectedValue}
        onSelectionChange={(selectedKey) => {handleToggle(selectedKey);}}
      >
        {options.map((name) => (
          <Tab
            key={name.toLowerCase().replace(/ /g, "_")}
            title={name}
            className="focus:outline-none"
          >
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default TabVerticalDataWrapper;