import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_VALUE_USERS } from "@/app/client/graphql/mutation";
import { GET_VALUE_USERS } from "@/app/client/graphql/query";
import client from "@/app/client/graphql/ApolloClient.jsx";
import { SuccessSyncValueNotification } from "@/app/components/ui/Notifications/Notifications.jsx";
import SkeletonLoader from "@/app/components/ui/Loading/SkeletonLoader";
import { SetKeyLocalStorage, GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";
import { AddAuditLogEntry } from "@/app/client/supabase/auditLog.ts";

import PropTypes from 'prop-types';

import { useUserStore, useLoadingStore } from "@/app/stores/stores";

const InputFieldDataWrapperUser = ({
    label,
    supabaseKey,
    disabled = false,
    type = 'number',
    setReadOnlyValue = null,
    userId = null,
    show = true,
    auditLogRequest = null,
    auditLog = false,
    
}) => {
    // zustand
    const { user } = useUserStore();

    // local loading state
    const [loading, setLoading] = useState(true);
    const [loadingTime, setLoadingTime] = useState(0);

    const handleAuditLog = (status, value) => {
        if (auditLog && value !== null && value !== undefined && value !== '') {
            AddAuditLogEntry({
                request: auditLogRequest,
                route: '/settings',
                status: status,
                user_id: user.id,
                message: `User metadata updated field: ${supabaseKey} to ${value}`
            });
        }
    }


    // loading time can load up to 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingTime(loadingTime + 1);
        }, 1000);

        if (loadingTime >= 3) {
            setLoading(false);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [loadingTime]);

    const [value, setLocalValue] = useState(null);

    const { data } = useQuery(GET_VALUE_USERS(supabaseKey), {
        variables: {
            user_id: userId
        },
        client: client
    });


    const queryResult = data?.usersCollection?.edges[0]?.node?.[supabaseKey];

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

    const [updateValueDynamic] = useMutation(UPDATE_VALUE_USERS(supabaseKey), {
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
            const debounceSave = setTimeout(() => {
                setLastValue(value);
                setLastKeyStrokeTime(Math.floor(Date.now() / 1000));
                setSyncing(true);
                setItemsLeft(1);

                updateValueDynamic({
                    variables: {
                        user_id: userId ,
                        dynamicValue: `${value}` // replace with actual channel id
                    }
                }).then(() => {
                    setSyncing(false);
                    setItemsLeft(0);

                    
                });

                const mountTime = GetKeyLocalStorage(CACHEKEY);
                const currentTime = Math.floor(Date.now() / 1000);

                if (currentTime - mountTime >= 3) {
                    SuccessSyncValueNotification({ valueType: supabaseKey });
                    handleAuditLog('success', value);
                    if (value !== null) {
                        setReadOnlyValue(value);
                    }
                }
            }, 500);

            return () => clearTimeout(debounceSave);
        }
    }, [value]);

    const handleOnChange = (e) => {
        setLocalValue(e.target.value);
    };

    if (!show) {
        return null;
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

export default InputFieldDataWrapperUser;

InputFieldDataWrapperUser.propTypes = {
    label: PropTypes.string.isRequired,
    supabaseKey: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    setReadOnlyValue: PropTypes.func,
    userId: PropTypes.string,
    show: PropTypes.bool,
    auditLogRequest: PropTypes.object,
    auditLog: PropTypes.bool
};