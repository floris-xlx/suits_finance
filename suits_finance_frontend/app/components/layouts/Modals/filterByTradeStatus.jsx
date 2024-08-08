import React from 'react';
import TabVertical from '@/app/components/ui/Tabs/TabVertical';

import PropTypes from 'prop-types';


const FilterByTradeStatus = ({
    setFilterKey = null,
    isMember = true
}) => {
    const fullOptions = ['All', 'Unapproved', 'Pending', 'Entry', 'TP1', 'TP2', 'TP3', 'Invalid', 'Loss'];
    const memberOptions = ['All', 'Pending', 'Entry', 'TP1', 'TP2', 'TP3'];

    return (
        <TabVertical
            label={'Pick a trade status to filter by'}
            options={isMember ? memberOptions : fullOptions}
            cacheValueKey={'cachedPendingTradesFilterStatus'}
            setCacheValue={setFilterKey}
        />
    )
}

export default FilterByTradeStatus;

FilterByTradeStatus.propTypes = {
    setFilterKey: PropTypes.func,
    isMember: PropTypes.bool
}
