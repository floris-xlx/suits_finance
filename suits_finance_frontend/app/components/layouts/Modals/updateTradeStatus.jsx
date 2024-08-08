import React, { Fragment } from 'react';
import TabVerticalDataWrapper from '@/app/components/ui/Tabs/TabVerticalDataWrapper';
import SwitchInBlock from '@/app/components/ui/Switches/SwitchInBlock';


const UpdateTradeStatusLayout = ({
    setFilterKey = null,
    trade_hash = null
}) => {
    console.log('trade_hash', trade_hash)

    return (
        <Fragment>
            <TabVerticalDataWrapper
                label={'Pick a new trade status'}
                options={['Unapproved', 'Pending', 'Entry', 'TP1', 'TP2', 'TP3', 'Invalid', 'Loss']}
                supabaseKey={'trade_status'}
                tradeHash={trade_hash}
            />
            <SwitchInBlock
                label="Toggle trade status updating"
                subText="Enabled by default, this only affects the current trade hash"
                cacheKey="cachedTradeStatusUpdating"
                supabaseKey={'trade_status_updating'}
                tradeHash={trade_hash}
            />
        </Fragment>
    )
}

export default UpdateTradeStatusLayout;