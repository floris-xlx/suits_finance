import React from 'react';
import { ArchiveBoxIcon  } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';


const TradeArchivedSuccessInlineNotification = () => {
    return (
        <span className="flex flex-row items-center bg-secondary">
            <ArchiveBoxIcon className="size-8 text-brand-primary" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[14px] text-[13px]">
                        Trade was archived successfully!
                
                </span>
            </div>
        </span>
    );
};


const TradeArchivedSuccessNotification = () => toast((t) => (
    < TradeArchivedSuccessInlineNotification />
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

export default TradeArchivedSuccessNotification;
