import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ValueCopyChipInlineLabel } from '@/app/components/ui/Chips/ValueCopyChip';

const DrawerViewTransactionLayout = ({ transaction }) => {
    return (
        <div className="flex flex-col w-full gap-y-2 ">
            <ValueCopyChipInlineLabel label="Symbol" value={transaction?.pairname || "--"} isText={true} notificationType="Symbol" />

            <ValueCopyChipInlineLabel label="Entry Level" value={transaction?.entry_level || "--"} copy={true} notificationType="Entry Level" />
            <ValueCopyChipInlineLabel label="Stoploss Level" value={transaction?.stoploss_level || "--"} copy={true} notificationType="Stoploss Level" />
            <ValueCopyChipInlineLabel label="TP1 Level" value={transaction?.tp1_level || "--"} copy={true} notificationType="TP1 Level" />
            <ValueCopyChipInlineLabel label="TP2 Level" value={transaction?.tp2_level || "--"} copy={true} notificationType="TP2 Level" />
            <ValueCopyChipInlineLabel label="TP3 Level" value={transaction?.tp3_level || 0} copy={true} notificationType="TP3 Level" />

            <ValueCopyChipInlineLabel label="Timeframe" value={transaction?.timeframe || "--"} isText={true} notificationType="Timeframe" />
            <ValueCopyChipInlineLabel label="Direction" value={transaction?.direction || "--"} isText={true} notificationType="Direction" />
            <ValueCopyChipInlineLabel label="Result Week" value={transaction?.result_week || "--"} copy={true} notificationType="Result Week" />

            <ValueCopyChipInlineLabel label="Pips Away" value={transaction?.pips_away || "--"} copy={true} notificationType="Pips Away" />
            <ValueCopyChipInlineLabel label="Current Price" value={transaction?.current_price || "--"} copy={true} notificationType="Current Price" />
            <ValueCopyChipInlineLabel label="Trade Status" value={transaction?.trade_status || "--"} isText={true} notificationType="Trade Status" />
            <ValueCopyChipInlineLabel
                label="Created At"
                value={trade?.created_at ? new Date(transaction.created_at).toLocaleString('en-GB', {
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