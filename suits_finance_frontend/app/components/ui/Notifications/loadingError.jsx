import React, { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 1;
import { Spinner } from '@nextui-org/react';


const LoadingErrorInlineNotification = () => {
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
            <Spinner size="sm" color="warning"/>
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[17px] text-[16px]">
                    {`This is taking longer than expected `} <br />

                    <span className="bg-accent p-2 text-[14px] rounded-md flex items-center mx-auto mt-2">
                        {`Retrying...`}
                    </span>
                </span>
            </div>
        </span>
    );
};


const LoadingErrorNotification = () => toast((t) => (
    < LoadingErrorInlineNotification  />
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

export default LoadingErrorNotification;
