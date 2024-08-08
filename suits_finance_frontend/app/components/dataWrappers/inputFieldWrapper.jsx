import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_VALUE_DYNAMIC } from "@/app/client/graphql/mutation";
import { GET_VALUE_DYNAMIC } from "@/app/client/graphql/query";
import client from "@/app/client/graphql/ApolloClient.jsx";
import { useLoadingStore } from "@/app/stores/stores";
import { SuccessSyncValueNotification } from "@/app/components/ui/Notifications/Notifications.jsx";
import SkeletonLoader from "@/app/components/ui/Loading/SkeletonLoader";
import { SetKeyLocalStorage, GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";

import PropTypes from 'prop-types';

const InputFieldDataWrapper = ({
    label,
    algorithm_id,
    organization,
    supabaseKey,
    disabled = false,
    type = 'number'
}) => {
    // local loading state
    const [loading, setLoading] = useState(true);
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

    const [value, setLocalValue] = useState(null);

    const { data } = useQuery(GET_VALUE_DYNAMIC(supabaseKey), {
        variables: {
            algorithm_id: algorithm_id,
            organization: organization
        },
        client: client
    });

    const queryResult = data?.algorithmsCollection?.edges[0]?.node?.[supabaseKey];

    // set local value
    useEffect(() => {
        if (queryResult !== undefined && queryResult !== null) {
            setLocalValue(queryResult);
            setLoading(false);
        }
    }, [queryResult]);

    const currentUnixTime = Math.floor(Date.now() / 1000);
    const CACHEKEY = "cachedMountTimeDataWrapper"

    useEffect(() => {
        // set current unix time to local storage
        SetKeyLocalStorage(CACHEKEY, currentUnixTime);
    }, []);


    // // zustand
    const { setSyncing, setItemsLeft } = useLoadingStore();

    const [updateValueDynamic] = useMutation(UPDATE_VALUE_DYNAMIC(supabaseKey), {
        client: client
    });


    // local states
    const [lastValue, setLastValue] = useState(value);
    const [lastKeyStrokeTime, setLastKeyStrokeTime] = useState(0);

    // cache the keystroke to cachedKeyStroke_[supabaseKey]
    useEffect(() => {
        SetKeyLocalStorage(`cachedKeyStroke_${supabaseKey}`, lastKeyStrokeTime);
    }, [value]);


    useEffect(() => {
        if (value !== lastValue && value !== undefined) {
            setLastValue(value);

            // save last key stroke time
            setLastKeyStrokeTime(Math.floor(Date.now() / 1000));

            setSyncing(true);
            setItemsLeft(1);

            updateValueDynamic({
                variables: {
                    algorithm_id: algorithm_id,
                    organization: organization,
                    dynamicValue: `${value}` // replace with actual channel id
                }
            });

            // set loading to false
            setSyncing(false);
            setItemsLeft(0);
        }


        const mountTime = GetKeyLocalStorage(CACHEKEY);
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime - mountTime >= 3) {
            SuccessSyncValueNotification({ valueType: supabaseKey });
        }
    }, [value]);


    const handleOnChange = (e) => {
        setLocalValue(e.target.value);
    }

    return (
        <div className="">
            <div>
                <div className="mt-[18px]">
                    <label
                        className="block text-sm font-medium text-accent select-none"
                    >
                        {label}
                    </label>

                    {loading ? (
                        <div className="flex h-[40px] min-w-[220px] w-full mt-1">
                            <SkeletonLoader width={"full"} height={'full'} />
                        </div>
                    ) : (
                        <input
                            id="account-size"
                            name="account-size"
                            type={type}
                            required
                            onChange={handleOnChange}
                            step={1}
                            disabled={disabled}
                            value={value}
                            className={`block w-full appearance-none px-3 py-2 shadow-sm ${type === 'text' ? 'focus:ring-2' : 'focus:ring-1'} sm:text-sm focus:ring-purple-600 font-medium bg-input-primary rounded-md !border border-primary h-[40px] text-secondary select-none mt-1`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default InputFieldDataWrapper;

InputFieldDataWrapper.propTypes = {
    label: PropTypes.string.isRequired,
    algorithm_id: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
    supabaseKey: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string
};