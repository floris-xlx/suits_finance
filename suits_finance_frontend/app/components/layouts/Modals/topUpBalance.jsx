import React, { useState, useEffect, Fragment } from 'react';
import InputField from '../../ui/InputFields/InputField';

const TopUpBalanceLayout = ({
    setPaymentAmount = () => {},
    balance = 0,
}) => {
    const handleSetPaymentAmount = (amount) => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount >= 0) {
            setPaymentAmount(numericAmount);
        }
    };

    return (
        <div className="flex flex-col gap-y-4 w-full">
            <InputField value={balance} setValue={handleSetPaymentAmount} label={"Top up amount"} type={'number'} width={'full'}/>
        </div>
    )
}

export default TopUpBalanceLayout