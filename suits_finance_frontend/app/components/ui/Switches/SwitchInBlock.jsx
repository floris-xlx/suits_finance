import React, { useState, useEffect, Fragment } from 'react';
import { Switch, cn } from '@nextui-org/react';

import {
  SetKeyLocalStorage,
  GetKeyLocalStorage,
  RemoveKeyLocalStorage,
  SetObjectLocalStorage
} from '@/app/client/caching/LocalStorageRouter';
import {
  UpdateUserPreferences,
  UpdateOrgPreferences,
  UpdateTradePreferences,
  GetTradePreferences,
  UpdateAlgoPreferences
} from '@/app/client/supabase/SupabaseOrgData';

import {
  SuccessSyncValueNotification
} from "@/app/components/ui/Notifications/Notifications.jsx";
import SkeletonLoader from "@/app/components/ui/Loading/SkeletonLoader";



const SwitchInBlock = ({
  label,
  subText,
  cacheKey,
  supabaseKey,
  organizationData = false, // org data being false means it's a user preference by default
  tradeHash = null, // tradeHash being null means it's not a trade preference by default
  algorithmId = false, // algorithmId being null means it's not an algorithm preference by default,
  algorithmData = false, // algorithmData being false means it's not an algorithm preference by default
  userData = false
}) => {
  // set the initial state of the switch
  const [isSelectedValue, setSelectedValue] = useState(null);

  // update the user preferences if isSelectedValue changes
  useEffect(() => {
    // get the userId and organization from localStorage
    const userId = GetKeyLocalStorage('userId');
    const organization = GetKeyLocalStorage('organization');


    // update the user preferences if isSelectedValue changes
    const updateSupabase = async () => {
      if (isSelectedValue !== null) {

        if (userData) {
          await UpdateUserPreferences(userId, supabaseKey, isSelectedValue);
        }


        // this may only run if the algorithmId is not null
        if (algorithmData) {
          await UpdateAlgoPreferences(algorithmId, supabaseKey, isSelectedValue);
        }

        // this may only run if the tradeHash is null
        if (tradeHash && !algorithmData) {
          await UpdateTradePreferences(tradeHash, supabaseKey, isSelectedValue);
          RemoveKeyLocalStorage(cacheKey);

          // this may only run if the tradeHash is null and the organizationData is true
        } else {
          if (organizationData && !algorithmData) {
            await UpdateOrgPreferences(
              organization,
              supabaseKey,
              isSelectedValue
            );


            // this may only run if the tradeHash is null and the organizationData is false (so it's a user preference)
          } else {
            await UpdateUserPreferences(userId, supabaseKey, isSelectedValue);
          }
        }
      }
    };
    // call the updateSupabase function
    updateSupabase();

  }, [isSelectedValue, supabaseKey, organizationData]);


  // this is for pre-filling the switch state if the user has already set it before
  useEffect(() => {
    if (tradeHash === null) {
      const getLocalStorageValue = GetKeyLocalStorage(cacheKey);
      // if the value is not null, set the selected value to the value
      // works for both user & org data
      if (getLocalStorageValue) {
        setSelectedValue(getLocalStorageValue === 'true' ? true : false);
      }
    }
  }, [cacheKey, tradeHash]);

  // only for trades data
  // this is for pre-filling the switch state if its a tradeHash related switch
  useEffect(() => {
    const fetchTradePreferences = async () => {
      if (tradeHash) {
        try {
          const preferences = await GetTradePreferences(tradeHash, supabaseKey);
          if (preferences && preferences[supabaseKey] !== undefined) {
            setSelectedValue(preferences[supabaseKey]);
          }

        } catch (error) {
          console.error('Error fetching trade preferences:', error);
        }
      }
    };

    fetchTradePreferences();
  }, [supabaseKey, tradeHash]);

  // handle switch state if show timeframe or not button press
  const handleToggle = async () => {
    setSelectedValue((prevState) => {
      const newState = !prevState;

      // if the tradeHash is null, set the key to the new state
      if (tradeHash === null) {

        SetKeyLocalStorage(cacheKey, newState);

      } else {
        // if the tradeHash is not null, set the object to the new state
        SetObjectLocalStorage(cacheKey, newState, tradeHash);
      }
      return newState;
    });
  };

  useEffect(() => {
    if (isSelectedValue === null) {
      const timer = setTimeout(() => {
        setSelectedValue(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSelectedValue]);

  const [timeOut, setTimeOut] = useState(false);
  return (

    (
      // handle switch state if show timeframe or not button press
      <Fragment>

        {isSelectedValue === null ? (
          <div className="min-w-[380px] min-h-[80px] mr-[10px] w-full flex h-full">
            <SkeletonLoader width={"full"} height={'full'} />
          </div>
        ) : (
          <Switch
            isSelected={isSelectedValue}
            onClick={() => handleToggle()} // Ensure onClick is a function
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
        )}

      </Fragment>

    )

  );
};

export default SwitchInBlock;
