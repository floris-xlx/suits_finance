import React, { useState, useEffect, Fragment } from 'react';
import InputFieldDataWrapperUser from '../../dataWrappers/inputFieldWrapperUser';
import PositionSizeApi from '@/app/client/api/PositionSize';
import { ValueCopyChipInlineLabel } from '@/app/components/ui/Chips/ValueCopyChip';

import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';


import PropTypes from 'prop-types';

const PositionSizeCalculator = ({
    stoplossPips = 0,
    symbol = 'eurusd'
}) => {
    const [accountSize, setAccountSize] = useState(0);
    const [riskPerTrade, setRiskPerTrade] = useState(0);
    const [lotSize, setLotSize] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (accountSize !== 0 && riskPerTrade !== 0) {
            setLoading(true);
            PositionSizeApi(accountSize, riskPerTrade, stoplossPips, symbol).then((data) => {

                setLotSize(data.td365_lots);
                setLoading(false);
            });
        }
    }, [accountSize, riskPerTrade]);

    return (
        <Fragment>
            <div className="flex flex-row gap-x-8 pb-4">
                <InputFieldDataWrapperUser
                    label={'Account Balance'}
                    supabaseKey={'account_size'}
                    type={'number'}
                    setReadOnlyValue={setAccountSize}
                />
                <InputFieldDataWrapperUser
                    label={'Risk Percentage'}
                    supabaseKey={'risk_per_trade'}
                    type={'number'}
                    setReadOnlyValue={setRiskPerTrade}
                />
            </div>

            <ValueCopyChipInlineLabel
                value={symbol}
                copy={true}
                label={'Symbol'}
                showRr={false}
                Rr={0}
                isText={true}
                notificationType='Symbol'
            />
            <ValueCopyChipInlineLabel
                value={stoplossPips}
                copy={true}
                label={'Stoploss pips'}
                showRr={false}
                Rr={0}
                isText={false}
                notificationType='Stoploss Pips'
            />


            {loading ? (
                <div className="flex w-full h-[24px] mt-2">
                    <SkeletonLoader width={'full'} height={'full'} />
                </div>
            ) : (
                <ValueCopyChipInlineLabel
                    value={lotSize}
                    copy={true}
                    label={'TD365 Lot size'}
                    showRr={false}
                    Rr={0}
                    isText={false}
                    notificationType='TD365 Lot size'
                    width={150}
                />
            )}
        </Fragment>
    )
}

export default PositionSizeCalculator;

PositionSizeCalculator.propTypes = {
    stoplossPips: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired
}