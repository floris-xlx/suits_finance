import React from 'react';

import CapitalizeFirstLetter from '@/app/client/hooks/formatting/CapitalizeLetter';

const TradeStatusChip = ({ tradeStatus }) => {
    const StatusColors = {
        pending: "bg-blue-primary text-blue border border-blue-500/30",
        unapproved: "bg-input-primary text-gray-500 border border-primary",
        loss: "bg-red-accent text-red border border-red-500/30",
        tp1: "bg-green-accent text-green border border-green-500/30",
        tp2: "bg-green-accent text-green border border-green-500/30",
        tp3: "bg-green-accent text-green border border-green-500/30",
        invalid: "bg-red-accent text-red border border-red-500/30",
        entry: "bg-blue-primary text-blue border border-blue-500/30",
        duplicate: "bg-red-accent text-red border border-red-500/30",
        approved: "bg-green-accent text-green border border-green-500/30",
        paid: "bg-green-accent text-green border border-green-500/30",
        rejected: "bg-red-accent text-red border border-red-500/30",
    };

    // if the tradeStatus is not int he list make the text ???
    const Text = StatusColors[tradeStatus] ? CapitalizeFirstLetter(tradeStatus) : "???";
    const chipColor = StatusColors[tradeStatus] ? StatusColors[tradeStatus] : "bg-input-primary text-gray-400";

    return (
        <>
            <div className={`flex gap-4 rounded-md py-[3px] px-[7px] w-fit ${chipColor} `}>
                <div className=" text-[12px] font-normal flex flex-row  gap-1 select-none mx-auto pl-[1px]">
                    {Text}
                </div>
            </div>
        </>
    );
};

export default TradeStatusChip;

