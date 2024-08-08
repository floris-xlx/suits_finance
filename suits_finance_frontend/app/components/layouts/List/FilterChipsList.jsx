import React, { useState, useEffect, Fragment } from 'react';
import FilteredByChip from '@/app/components/ui/Chips/FilteredByChip';

import { useTradeFiltersStore } from '@/app/stores/trade-filters-store';

const FilterChipsList = () => {
    const { tradeFilters } = useTradeFiltersStore();

    return (
        <div className="flex flex-row gap-x-1">
            < FilteredByChip filter={tradeFilters.isValueTradeStatus} setFilter={tradeFilters.isFilterTradeStatus} />
        </div>
    )
}

export default FilterChipsList;