import React, { useEffect } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import toast, { Toaster, useToasterStore } from "react-hot-toast";
const TOAST_LIMIT = 1;

const TradeHashIsExoticToOrgInlineNotification = ({
    tradeHash
}) => {

    const { toasts } = useToasterStore();

    // Enforce Limit
    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
    }, [toasts]);

    return (
        <span className="flex flex-row items-center bg-secondary">
            <LockClosedIcon className="size-8 text-brand-primary" />
            <div className="flex flex-col ">


                <span className="pl-3 text-primary sm:text-[14px] text-[11px] font-semibold">
                    Exotic trade not authorized!

                </span>
                <span className="pl-3 text-primary sm:text-[12px] text-[11px] mt-1">
                    This trade hash is not authorized under this organization.

                </span>
                <span className="ml-3 sm:text-[12px] text-[11px] rounded-md bg-primary text-secondary mx-auto flex items-center p-2 w-full mt-1">
                    {tradeHash}
                </span>

            </div>
        </span>
    );
};


const TradeHashExoticToOrgNotification = ({
    tradeHash
}) => toast((t) => (
    < TradeHashIsExoticToOrgInlineNotification tradeHash={tradeHash} />
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

export default TradeHashExoticToOrgNotification;
