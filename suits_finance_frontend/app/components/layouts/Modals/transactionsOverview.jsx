import React, { useState, useEffect, Fragment } from 'react';
import TransactionTile from '../../ui/Tables/TransactionTile';

const TransactionsOverviewLayout = ({
    transactions = [],
}) => {

    return (
        <div className="flex flex-col gap-y-4 w-full">
    
            {transactions.map((transaction, index) => (
                <div key={index} className="flex flex-col gap-y-2 w-full">
                    <TransactionTile transaction={transaction} />
                </div>
            ))}
        </div>
    )
}


export default TransactionsOverviewLayout