import React, { useEffect } from 'react';
import { ExclamationCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import toast, { Toaster, useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 1;


const ErrorServerInlineNotification = () => {
    const { toasts } = useToasterStore();

    // Enforce Limit
    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= TOAST_LIMIT)
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);


    const statusUrl = "https://status.xylex.ai";

    return (
        <span className="flex flex-row bg-secondary relative h-[90px]">
            <ExclamationCircleIcon className="size-8 text-red" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary font-semibold sm:text-[14px] text-[13px]">
                    An error occured while reaching the Xylex server.
                </span>

                <span className="pl-3 text-secondary font-semibold sm:text-[12px] text-[11px]">
                    Please check the status page for more information.  
                </span>

            </div>

            <a 
                target="_blank"
                rel="noreferrer"
                href={statusUrl}
                className="absolute bottom-0 right-[-9px] pl-3 ml-5 text-white font-semibold sm:text-[14px] text-[13px] rounded-md bg-brand-primary p-2 flex flex-row gap-x-1 cursor-pointer items-center hover:transition hover:bg-brand-secondary w-fit ">
                Status  <ArrowTopRightOnSquareIcon className="size-6 text-white" />
            </a>
        </span>
    );
};


const ErrorServerNotification = () => toast((t) => (
    < ErrorServerInlineNotification />
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
    duration: 5500
}
);

export default ErrorServerNotification;
