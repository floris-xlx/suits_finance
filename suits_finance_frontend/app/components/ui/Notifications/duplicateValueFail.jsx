import React, {useEffect} from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import toast, { Toaster, useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 2;

const DuplicateValueFailInlineNotification = ({valueType}) => {
    // split any underscores and capitalize the first letter of each word
    valueType = valueType ? valueType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : null;

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
            <CrossCircledIcon className="h-12 w-12  sm:w-8 sm:h-8 mr-2 text-brand-primary" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[14px] text-[14px] font-semibold">
                    Failed to update {valueType}
                </span>
                <span className="pl-3 text-secondary sm:text-[12px] text-[12px]">
                    {valueType ? <><strong>'{valueType}'</strong> Is already taken by someone else.</> : 'Your changes have been successfully synced.'}
                </span>
            </div>
        </span>
    );
};

const DuplicateValueFailNotification = ({valueType}) => toast((t) => (
    < DuplicateValueFailInlineNotification valueType={valueType} />
), {

    style: {
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-border-primary)',
        borderColor: 'var(--color-border-primary)',
        borderStyle: 'solid',
        borderWidth: '1px',
        userSelect: 'none',
        width: 'full',
        maxWidth: '355px',
    },
    duration: 3500
}
);

export default DuplicateValueFailNotification;
