import React, { useState, useEffect, Fragment } from 'react';

import InputField from '@/app/components/ui/InputFields/InputFieldRead';

const AddTransactionLayout = () => {
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('EUR');
    const [title, setTitle] = useState('');
    const [recipient, setRecipient] = useState('');
    const [sender,  setSender] = useState('');



    return (
        <div className="flex flex-col gap-y-4 w-full">
            <InputField label="Amount" type="number" value={amount} setValue={setAmount} />
            <InputField label="Currency" type="text" value={currency} setValue={setCurrency} />
            <InputField label="Title" type="text" value={title} setValue={setTitle} />
            <InputField label="Recipient" type="text" value={recipient} setValue={setRecipient} />
            <InputField label="Sender" type="text" value={sender} setValue={setSender} />

        </div>
    )
}

export default AddTransactionLayout