import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast, { Toaster, useToasterStore } from "react-hot-toast";
const TOAST_LIMIT = 1;

const AddUserFailedInlineNotification = () => {

    const { toasts } = useToasterStore();

    // Enforce Limit
    React.useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
    }, [toasts]);

    return (
        <span className="flex flex-row items-center bg-secondary">
            <XMarkIcon className="h-14 w-14   mr-2 text-red" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[17px] text-[16px] font-semibold">
                    Failed to add user
                </span>
                <span className="pl-3 text-secondary sm:text-[16px] text-[14px]">
                    The user could not be added to the database, please try again.
                </span>
            </div>
        </span>
    );
};

const AddUserFailedNotification = () => toast((t) => (
    < AddUserFailedInlineNotification />
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

export default AddUserFailedNotification;
