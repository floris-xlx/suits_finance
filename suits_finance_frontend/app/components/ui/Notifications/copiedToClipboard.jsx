import React, { useEffect } from 'react';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import toast, { Toaster, useToasterStore } from "react-hot-toast";


const TOAST_LIMIT = 3;

const CopiedToClipboardInlineNotification = ({
    valueName
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
            <ClipboardDocumentCheckIcon className="size-8 text-brand-primary" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[17px] text-[16px]">
                    {valueName ? <strong>'{valueName}'</strong> : 'Copied to clipboard'} was successfully copied to clipboard
                </span>
            </div>
        </span>
    );
};

const CopiedToClipboardNotification = ({ valueName }) => toast((t) => (
    < CopiedToClipboardInlineNotification valueName={valueName} />
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

export default CopiedToClipboardNotification;
