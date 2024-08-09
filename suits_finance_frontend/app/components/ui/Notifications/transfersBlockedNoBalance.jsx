import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast, { Toaster, useToasterStore } from "react-hot-toast";
const TOAST_LIMIT = 1;

const TransfersBlockedNoBalanceInlineNotification = () => {


    return (
        <span className="flex flex-row items-center bg-secondary">
            <XMarkIcon className="h-14 w-14   mr-2 text-red" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[17px] text-[16px] font-semibold">
                    Transfers Blocked
                </span>
                <span className="pl-3 text-secondary sm:text-[16px] text-[14px]">
                    Your balance is negative, please resolve this by depositing into your account.
                </span>
            </div>
        </span>
    );
};

const TransfersBlockedNoBalanceNotification = () => toast((t) => (
    < TransfersBlockedNoBalanceInlineNotification />
), {

    style: {
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-border-primary)',
        borderColor: 'var(--color-border-primary)',
        borderStyle: 'solid',
        borderWidth: '1px',
        userSelect: 'none',
        width: 'full',
        maxWidth: '430px',
    },
    duration: 3500
}
);

export default TransfersBlockedNoBalanceNotification;
