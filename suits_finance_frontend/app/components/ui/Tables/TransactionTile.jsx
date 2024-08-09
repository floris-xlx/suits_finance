import React from 'react';
import convertCurrencyToSymbol from '@/app/client/hooks/formatting/CurrencySymbol';

const TransactionTile = ({ transaction }) => {
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <div className="flex flex-row justify-between items-center w-full">
                <SenderInfo sender={transaction.sender} title={transaction.title} date={transaction.date} />
                <TransactionAmount currency={transaction.currency} amount={transaction.amount} />
            </div>
        </div>
    );
};

const SenderInfo = ({ sender, title, date }) => {
    const firstLetters = sender.split(' ').map(word => word[0]).join('');
    return (
        <div className="flex flex-row">
            <div className="rounded-md bg-accent flex items-center justify-center w-12 h-12">
                <span className="text-primary font-medium select-none">{firstLetters}</span>
            </div>
            <div className="flex flex-col gap-y-1 ml-4">
                <span className="text-[16px] text-primary select-none">{title}</span>
                <span className="text-sm text-secondary select-none">
                    {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ')}
                </span>
            </div>
        </div>
    );
};

const TransactionAmount = ({ currency, amount }) => {
    return (
        <div className="flex flex-col gap-y-1">
            <span className="text-[16px] text-primary select-none">
                {convertCurrencyToSymbol(currency)} {amount}
            </span>
        </div>
    );
};

export default TransactionTile;