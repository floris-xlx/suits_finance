import React, { useState, useEffect } from 'react';
import convertCurrencyToSymbol from '@/app/client/hooks/formatting/CurrencySymbol';
import { useLoadingStore } from '@/app/stores/stores';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';

const BalanceCard = ({
    balance = 0,
    label = 'Current Balance',
    currency = 'EUR',
}) => {
    console.log('BalanceCard -> balance', balance);

    const { loading, setBalanceLoading } = useLoadingStore();
    const [isBalanceNegative, setIsBalanceNegative] = useState(false);

    const formattedBalance = balance.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const balanceElement = loading.balanceLoading ? <div className="h-[36px] w-[152px]"><SkeletonLoader /></div> : `${convertCurrencyToSymbol(currency)} ${formattedBalance}`;

    useEffect(() => {
        if (balance < 0 && !loading.balanceLoading) {
            setIsBalanceNegative(true);

        } else {
            setIsBalanceNegative(false);
        }
    }, [balance, loading.balanceLoading]);


    return (
        <div>
            {/* dev view */}
            {process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' && (
                <>
                    <button className="m-8 bg-green-400 rounded-md p-2 text-primary" onClick={() => setBalanceLoading(!loading.balanceLoading)}>Toggle Balance Loading</button>
                </>
            )}


            <div className="flex flex-col items-center justify-center">

                {isBalanceNegative && (
                    <div className="max-w-[220px] flex flex-row items-center mb-2 bg-red-accent border border-red-500/30 rounded-md p-2">
                        <span className="text-center text-red text-xs select-none"> Your balance is negative, please resolve this by depositing into your account. </span>
                    </div>
                )}


                <div className={`text-3xl font-semibold ${isBalanceNegative ? 'text-red' : 'text-primary'} select-none mb-1`}>
                    {balanceElement}
                </div>
                <div className="text-sm text-secondary select-none">
                    {label}
                </div>
            </div>
        </div>
    );
}

export default BalanceCard;