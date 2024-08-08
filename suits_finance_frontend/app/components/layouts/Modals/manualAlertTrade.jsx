import React, { Fragment } from 'react';
import TabHorizontal from '@/app/components/ui/Tabs/TabHorizontal';

const ManualAlertTrade = () => {
    return (
        <Fragment>
            <TabHorizontal
                options={['TP1', 'TP2', 'TP3', 'SLE']}
                cacheValueKey={'cachedManualAlertTradeTp'}
            />
        </Fragment>
    )
}

export default ManualAlertTrade;