import React, { useEffect } from 'react';
import { InvoiceIcon } from '@/app/components/ui/Icon.jsx';
import toast, { Toaster, useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 1;

const InvoiceCreatedSuccessInlineNotification = ({
    invoice_id = ''
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
            <InvoiceIcon className="h-12 w-12  sm:w-8 sm:h-8 mr-2 text-brand-primary" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[14px] text-[14px] font-semibold">
                    Invoice was successfully created.
                </span>

                <span className="pl-3 text-secondary sm:text-[12px] text-[12px]">
                    Invoice ID: {invoice_id}
                </span>
            </div>
        </span>
    );
};


const InvoiceCreatedSuccessNotification = ({ invoice_id }) => toast((t) => (
    < InvoiceCreatedSuccessInlineNotification invoice_id={invoice_id} />
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

export default InvoiceCreatedSuccessNotification;
