import React, { Fragment, useEffect, useState, useRef, use } from 'react';
// zustand
import { useUserStore, useTradeFiltersStore, useOrganizationStore } from '@/app/stores/stores.js';
// supabase
import TabHorizontal from '@/app/components/ui/Tabs/TabHorizontal';
import { GetKeyLocalStorage, SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';

import FilterByTradeStatus from './filterByTradeStatus';
import FilterByDate from './filterByDate';
import AlgorithmSwitch from './algorithmSwitch';


const FilterRouterModal = () => {
    // zustand
    const { tradeFilters, setIsFilterTradeStatus, setIsFilterDate, setIsFilterAlgorithmId, setIsValueTradeStatus, setIsValueAlgorithmId, setIsValueDate } = useTradeFiltersStore();
    const { organization } = useOrganizationStore();
    
    const globalFilters = ['Status', 'Date', 'Algorithm'];
    const [currentGlobalFilter, setCurrentGlobalFilter] = useState(globalFilters[0]);
    const [height, setHeight] = useState('auto');
    const containerRef = useRef(null);

    const [currentFilterKey, setCurrentFilterKey] = useState(null);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

    useEffect(() => {
        if (containerRef.current) {
            let newHeight = containerRef.current.scrollHeight;
            if (currentGlobalFilter === 'date') {
                newHeight = 125;
                setIsFilterDate(true);
            } else if (currentGlobalFilter === 'algorithm') {
                newHeight = 150;
            }
            setHeight(newHeight + 'px');
        }
    }, [currentGlobalFilter]);

    useEffect(() => {
        if (currentGlobalFilter === 'algorithm') {
            setIsFilterAlgorithmId(true);
            setIsValueAlgorithmId(selectedAlgorithm);

        }
        if (currentGlobalFilter === 'date') {
            setIsFilterDate(true);
            setIsValueDate(GetKeyLocalStorage('cachedPendingTradesFilterDateRange'));
        }
        
        if (currentGlobalFilter === 'status') {
            setIsFilterTradeStatus(true);
            setIsValueTradeStatus(GetKeyLocalStorage('cachedPendingTradesFilterStatus'));
        }
    }, [currentGlobalFilter, selectedAlgorithm, currentFilterKey]);


    return (
        <Fragment>
            <TabHorizontal
                options={globalFilters}
                cacheValueKey={'cachedGlobalFilterRouter'}
                setCacheValue={setCurrentGlobalFilter}
            />

            <div
                className="mt-4 transition-height overflow-hidden"
                style={{ height }}
                ref={containerRef}
            >
                {currentGlobalFilter === 'status' && (
                    <div className="content">
                        <FilterByTradeStatus
                            setFilterKey={setCurrentFilterKey}
                            isMember={organization.isMember}
                        />
                    </div>
                )}
                {currentGlobalFilter === 'date' && (
                    <div className="content">
                        <FilterByDate 
                            label={'Pick a date range to filter by'}
                        />
                    </div>
                )}
                {currentGlobalFilter === 'algorithm' && (
                    <div className="content">
                        <AlgorithmSwitch 
                            label={'Pick an algorithm to filter by'}
                            setCacheValue={setSelectedAlgorithm}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default FilterRouterModal;
