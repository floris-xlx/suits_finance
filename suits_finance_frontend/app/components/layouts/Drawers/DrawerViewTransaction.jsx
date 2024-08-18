import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ValueCopyChipInlineLabel } from '@/app/components/ui/Chips/ValueCopyChip';

const DrawerViewTransactionLayout = ({ transaction }) => {
    console.log(transaction);
    return (
        <div className="flex flex-col w-full gap-y-2 ">
            <ValueCopyChipInlineLabel label="Title" value={transaction?.title || "--"} isText={true} notificationType="Title" />

            <ValueCopyChipInlineLabel label={`Amount ${transaction?.currency || ""}`} value={transaction?.amount || "--"} copy={true} notificationType="Amount" />
            <ValueCopyChipInlineLabel label="Recipient" value={transaction?.recipient || "--"} copy={true} isText={true} notificationType="Recipient" />
            <ValueCopyChipInlineLabel label="Sender" value={transaction?.sender || "--"} copy={true} isText={true} notificationType="Sender" />
            <ValueCopyChipInlineLabel label="Transaction Status" value={transaction?.status || "--"} isText={true} notificationType="Transaction Status" />
            <ValueCopyChipInlineLabel
                label="Created At"
                value={transaction?.created_at ? new Date(transaction.created_at).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }) : "--"}
                isText={true}
                notificationType="Created At"
            />

            <ValueCopyChipInlineLabel label="Hash" value={transaction?.hash || "--"} isText={true} notificationType="Transaction Hash" />
        </div>
    );

}

export default DrawerViewTransactionLayout;