import React, { useState, useEffect } from 'react';
import { ValueCopyChipInlineLabel } from '@/app/components/ui/Chips/ValueCopyChip';


const CardDetailsLayout = ({
    card
}) => {
    return (
        <div className="flex flex-col gap-y-2 w-full ">
            <ValueCopyChipInlineLabel label="Cardholder Name" value={card?.fullName || "--"} isText={true} notificationType="Cardholder Name" width={'full'} />
            <ValueCopyChipInlineLabel 
                label="Card Number" 
                value={card?.cardNumber ? card.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ') : "--"} 
                isText={true} 
                notificationType="Card Number" 
                width={'full'} 
            />
            <ValueCopyChipInlineLabel label="Expiry Date" value={card?.expiryDate || "--"} isText={true} notificationType="Expiry Date" width={'full'} />
            <ValueCopyChipInlineLabel label="Balance" value={card?.balance ? card.balance : "--"} isText={true} notificationType="Balance" width={'full'} />
            <ValueCopyChipInlineLabel label="Currency" value={card?.currency || "--"} isText={true} notificationType="Currency" width={'full'} />
        </div>
    )
}


export default CardDetailsLayout    