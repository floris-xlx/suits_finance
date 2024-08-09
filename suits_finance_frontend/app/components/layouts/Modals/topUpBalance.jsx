import React, { useState, useEffect, Fragment } from 'react';
import InputFieldRead from '../../ui/InputFields/InputFieldRead';

const TopUpBalanceLayout = ({
    setPaymentAmount = () => {},
    balance = 0,
}) => {

    return (
        <div className="flex flex-col gap-y-4 w-full">
    
            <InputFieldRead value={balance} setValue={setPaymentAmount} label={"Top up amount"} type={'number'} />
        </div>
    )
}


export default TopUpBalanceLayout