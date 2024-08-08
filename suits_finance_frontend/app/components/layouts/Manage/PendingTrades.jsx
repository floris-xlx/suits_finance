'use client';

import React, { Fragment, useState, useEffect } from 'react';

// UI components
import PendingTradeCard from '@/app/components/ui/Cards/PendingTradeCard';
import CenterFull from '@/app/components/ui/Containers/CenterFull';
import NoFilteredTrades from '@/app/components/ui/EmptyStates/NoFilteredTrades';
import LoadingPendingTrades from '@/app/components/ui/EmptyStates/LoadingPendingTrades';

// Zustand stores
import { useUserViewStore, useTradeFiltersStore, useDataStore, useOrganizationStore } from '@/app/stores/stores'

import { GetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { filterTradesByStatus, filterTradesByAlgorithm, filterTradesByDate } from '@/app/client/hooks/filters/filters';

import PropTypes from 'prop-types';

const PendingTradesLayout = ({
    pendingTrades,
    currentDrilldownTradeHash,
    triggerNotification,
    setCurrentDrilldownTradeHash
}) => {

    // Zustand stores
    const { view } = useUserViewStore();
    const { tradeFilters } = useTradeFiltersStore();
    const { data } = useDataStore();
    const { organization } = useOrganizationStore();

    const [isLoading, setLoading] = useState(true);
    const [algorithmId, setAlgorithmId] = useState(null);
    const [dateRange, setDateRange] = useState(null);

    const [trades, setTrades] = useState(
        organization.isMember
            ? data.pendingTrades.filter(trade => trade.trade_status !== 'invalid' && trade.trade_status !== 'loss' && trade.trade_status !== 'unapproved')
            : data.pendingTrades
    );

    const [visibleTradesCount, setVisibleTradesCount] = useState(view.maxTradeCardsOnViewPort);

    const [hasNextPage, setHasNextPage] = useState(true);
    const [error, setError] = useState(null);

    // when the user leaves dropdown view it doesnt adhere to the maxTradeCardsOnViewPort
    const isUserInDrilldownView = view.isEditingModePendingTrades;

    const loadMore = () => {
        setVisibleTradesCount(prevCount => {
            const newCount = prevCount + view.maxTradeCardsOnViewPort;
            if (newCount >= trades.length) {
                setHasNextPage(false);
            }
            return newCount;
        });
    };

    useEffect(() => {
        if (!isUserInDrilldownView) { setVisibleTradesCount(view.maxTradeCardsOnViewPort); }
    }, [isUserInDrilldownView, view.maxTradeCardsOnViewPort]);


    const [sentryRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: !!error,
        rootMargin: '0px 0px 400px 0px',
    });


    // Fetch algorithm ID and date range from local storage
    useEffect(() => {
        setAlgorithmId(GetKeyLocalStorage('cachedAlgorithmId'));
        setDateRange(GetKeyLocalStorage('cachedPendingTradesFilterDateRange'));
    }, []);


    // Filter trades based on various filters
    useEffect(() => {

        let filteredTrades = organization.isMember
            ? pendingTrades.filter(trade => trade.trade_status !== 'invalid' && trade.trade_status !== 'loss' && trade.trade_status !== 'unapproved')
            : pendingTrades;

        if (tradeFilters.isFilterTradeStatus) {
            filteredTrades = filterTradesByStatus({
                trades: filteredTrades,
                tradeStatus: tradeFilters.isValueTradeStatus
            });
        }

        if (tradeFilters.isFilterAlgorithmId) {
            filteredTrades = filterTradesByAlgorithm({
                trades: filteredTrades,
                algorithmId: tradeFilters.isValueAlgorithmId
            });
        }

        if (tradeFilters.isFilterDate) {
            filteredTrades = filterTradesByDate({
                trades: filteredTrades,
                dateRange: tradeFilters.isValueDate
            });
        }

        setLoading(false);
        setTrades(filteredTrades);
    }, [pendingTrades, algorithmId, dateRange]);

    // Render trades based on current state
    const renderTrades = () => {
        if (isLoading) {
            return (
                <CenterFull>
                    <LoadingPendingTrades />
                </CenterFull>
            );
        }

        if (trades.length === 0) {
            return (
                <CenterFull>
                    <NoFilteredTrades />
                </CenterFull>
            );
        }

        const isUserInDropDownView = view.isInDropdownPendingTrades;

        // This handles the drilldown trade view
        if (currentDrilldownTradeHash) {
            return trades.filter(trade => trade.trade_hash === currentDrilldownTradeHash)
                .map(trade => (
                    <PendingTradeCard
                        key={trade.trade_hash}
                        index={trade.trade_hash}
                        trade={trade}
                        triggerNotification={triggerNotification}
                        setCurrentDrilldownTradeHash={setCurrentDrilldownTradeHash}
                    />
                ));
        }

        const order = ['pending', 'unapproved', 'tp1', 'tp2', 'tp3', 'loss', 'invalid', 'entry'];

        let sortedTrades = trades.sort((a, b) => {
            const statusComparison = order.indexOf(a.trade_status) - order.indexOf(b.trade_status);
            if (statusComparison !== 0) { return statusComparison; }

            return a.pips_away - b.pips_away;
        });

        if (isUserInDropDownView) {
            sortedTrades = sortedTrades.slice(0, 3);
        }

        return sortedTrades.slice(0, visibleTradesCount).map(trade => (
            <PendingTradeCard
                key={trade.trade_hash}
                index={trade.trade_hash}
                trade={trade}
                triggerNotification={triggerNotification}
                setCurrentDrilldownTradeHash={setCurrentDrilldownTradeHash}
            />
        ));

    };

    return (
        <div className={`${view.isEditingModePendingTrades ? 'flex flex-wrap ' : 'grid xl:grid-cols-3 mmd-grid-cols-2 lg:grid-cols-2 sm:grid-cols-1'} xxl:w-full justify-center bg-primary max-w-[1400px] mx-auto gap-[30px] gap-x-[50px] `}>
            {renderTrades()}
            {(isLoading || hasNextPage) && (
                <div ref={sentryRef}>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default PendingTradesLayout;

PendingTradesLayout.propTypes = {
    pendingTrades: PropTypes.array.isRequired,
    currentDrilldownTradeHash: PropTypes.string,
    triggerNotification: PropTypes.func.isRequired,
    setCurrentDrilldownTradeHash: PropTypes.func.isRequired
};