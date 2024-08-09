import React, { useState, useEffect, Fragment } from 'react';
import TransactionTile from '../../ui/Tables/TransactionTile';


const TransactionsTableMobile = ({ 
    transactions = [],
    handleViewTransactions,     
}) => {

    return (
        <div className="flex flex-col gap-y-4 w-full">
            <div className="flex justify-between items-center">
                <span className="text-lg text-primary select-none">Transactions</span>
                <button onClick={handleViewTransactions} className="text-brand-primary select-none">View All</button>
            </div>
            {transactions.map((transaction, index) => (
                <div key={index} className="flex flex-col gap-y-2 w-full">
                    <TransactionTile transaction={transaction} />
                </div>
            ))}
        </div>
    )
}

export default TransactionsTableMobile