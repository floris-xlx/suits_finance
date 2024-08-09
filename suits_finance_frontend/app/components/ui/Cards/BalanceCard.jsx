import React, { useState, useEffect } from 'react';
import convertCurrencyToSymbol from '@/app/client/hooks/formatting/CurrencySymbol';

const BalanceCard = ({
    balance,
    label = 'Current Balance',
    currency = 'EUR'
}) => {
    const formattedBalance = balance.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <div className="text-3xl font-semibold text-primary select-none">
                    {convertCurrencyToSymbol(currency)} {formattedBalance}
                </div>
                <div className="text-sm text-secondary select-none">
                    {label}
                </div>
            </div>
        </div>
    );
}

export default BalanceCard;