import React from 'react';
import { ChartBarSquareIcon  } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';


const ChartGeneratedSuccessInlineNotification = () => {
    return (
        <span className="flex flex-row items-center bg-secondary">
            <ChartBarSquareIcon className="size-8 text-brand-primary" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[14px] text-[13px]">
                        Generated chart successfully
                
                </span>
            </div>
        </span>
    );
};


const ChartGeneratedSuccessNotification = () => toast((t) => (
    < ChartGeneratedSuccessInlineNotification />
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

export default ChartGeneratedSuccessNotification;
