import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import toast, { Toaster, useToasterStore } from "react-hot-toast";

// ui
import { SnowStarIcon } from '@/app/components/ui/Icon.jsx';

const TOAST_LIMIT = 1;

const UserFrozenFailInlineNotification = ({
    username = ''
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
            <SnowStarIcon className="h-12 w-12  sm:w-8 sm:h-8 mr-2 text-red-primary" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[14px] text-[14px] font-semibold">
                    Failed to freeze {username}. Please contact support.
                </span>

            </div>
        </span>
    );
};


const UserFrozenFailNotification = ({ username }) => toast((t) => (
    < UserFrozenFailInlineNotification username={username} />
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

export default UserFrozenFailNotification;
