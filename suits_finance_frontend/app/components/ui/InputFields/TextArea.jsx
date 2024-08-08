import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { GET_VALUE_DYNAMIC_TRADES } from "@/app/client/graphql/query";
import { UPDATE_VALUE_DYNAMIC_TRADES } from '@/app/client/graphql/mutation';
import { SetKeyLocalStorage, GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";
import { SuccessSyncValueNotification } from "@/app/components/ui/Notifications/Notifications.jsx";
import SkeletonLoader from "@/app/components/ui/Loading/SkeletonLoader";
import client from "@/app/client/graphql/ApolloClient.jsx";
import { useLoadingStore } from "@/app/stores/stores";
import { useMutation, useQuery } from '@apollo/client';

const TextArea = ({
    label,
    disabled = true,
    supabaseKey = 'note',
    tradeHash = null,
    hide_when_empty = true
}) => {
    const [value, setLocalValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingTime, setLoadingTime] = useState(0);
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingTime(prevLoadingTime => prevLoadingTime + 1);
        }, 1000);

        if (loadingTime >= 5) {
            setLoading(false);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [loadingTime]);

    const { data } = useQuery(GET_VALUE_DYNAMIC_TRADES(supabaseKey), {
        variables: {
            trade_hash: tradeHash
        },
        client: client
    });

    const queryResult = data?.tradesCollection?.edges[0]?.node?.[supabaseKey];

    useEffect(() => {
        if (queryResult !== undefined && queryResult !== null) {
            setLocalValue(queryResult);
            setLoading(false);
        }
    }, [queryResult]);

    const currentUnixTime = Math.floor(Date.now() / 1000);
    const CACHEKEY = "cachedMountTimeTradeNoteArea";

    useEffect(() => {
        SetKeyLocalStorage(CACHEKEY, currentUnixTime);
    }, []);

    const { setSyncing, setItemsLeft } = useLoadingStore();

    const [updateValueDynamic] = useMutation(UPDATE_VALUE_DYNAMIC_TRADES(supabaseKey), {
        variables: {
            trade_hash: tradeHash,
            [supabaseKey]: value
        },
        client: client
    });

    const [lastValue, setLastValue] = useState(value);
    const [lastKeyStrokeTime, setLastKeyStrokeTime] = useState(0);

    useEffect(() => {
        SetKeyLocalStorage(`cachedKeyStroke_${supabaseKey}`, lastKeyStrokeTime);
    }, [lastKeyStrokeTime]);

    useEffect(() => {
        if (value !== lastValue && value !== undefined) {
            const debounceSave = setTimeout(() => {
                setLastValue(value);
                setLastKeyStrokeTime(Math.floor(Date.now() / 1000));
                setSyncing(true);
                setItemsLeft(1);

                updateValueDynamic({
                    variables: {
                        trade_hash: tradeHash,
                        dynamicValue: `${value}`
                    }
                }).then(() => {
                    setSyncing(false);
                    setItemsLeft(0);
                });

                const mountTime = GetKeyLocalStorage(CACHEKEY);
                const currentTime = Math.floor(Date.now() / 1000);

                if (currentTime - mountTime >= 3) {
                    SuccessSyncValueNotification({ valueType: supabaseKey });
                }
            }, 500);

            return () => clearTimeout(debounceSave);
        }
    }, [value]);

    const handleOnChange = (e) => {
        setLocalValue(e.target.value);
    };

    return (
        <div>
            {(!hide_when_empty || loading || (value != null && value.length > 0) || !disabled) && (
                <>
                    <label className="block text-sm font-medium text-accent">
                        {label}
                    </label>

                    {loading ? (
                        <div className="flex h-[80px] min-w-[290px] w-full mt-1">
                            <SkeletonLoader width={"full"} height={'full'} />
                        </div>
                    ) : (
                        <textarea
                            className="bg-input-primary rounded-md mt-2 resize-none focus:outline-none focus:ring-2 active:ring-purple-600 focus:ring-purple-600 0 w-full text-sm font-normal h-[80px] border border-primary text-accent p-2"
                            value={value}
                            onChange={handleOnChange}
                            spellCheck="false"
                            disabled={disabled}
                        ></textarea>
                    )}
                </>
            )}
        </div>
    );
};

export default TextArea;

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    supabaseKey: PropTypes.string,
    tradeHash: PropTypes.string,
    hide_when_empty: PropTypes.bool
};
