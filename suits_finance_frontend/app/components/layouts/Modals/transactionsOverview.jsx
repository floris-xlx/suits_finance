import React, { useState, useEffect, Fragment } from 'react';

const TransactionsOverviewLayout = ({
    transactions = [],

}) => {

    return (
        <div className="flex flex-col gap-y-4 w-full">
    
            {transactions.map((transaction, index) => (
                <div key={index} className="flex flex-col gap-y-2 w-full">
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-col gap-y-1">
                            <span className="text-sm text-primary">{transaction.date}</span>
                            <span className="text-sm text-secondary">{transaction.title}</span>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-sm text-primary">{transaction.amount}</span>
                            <span className="text-sm text-secondary">{transaction.currency}</span>
                        </div>
                    </div>
                    <hr className="w-full border border-neutral-300/20" />
                </div>
            ))}
        </div>
    )
}


export default TransactionsOverviewLayout