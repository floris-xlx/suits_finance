import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';


const SignalApprovedSuccessInlineNotification = ({
    algorithm_id,
    trade_hash
}) => {
    return (
        <span className="flex flex-row items-center bg-secondary">
            <CheckIcon className="size-8 text-brand-primary" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[17px] text-[16px]">
                    {`Signal approved for algorithm ${algorithm_id}`} <br />

                    <span className="bg-accent p-2 text-[14px] rounded-md flex items-center mx-auto mt-2">
                        {trade_hash}
                    </span>
                </span>
            </div>
        </span>
    );
};

const SignalApprovedSuccessNotification = ({ algorithm_id, trade_hash }) => toast((t) => (
    < SignalApprovedSuccessInlineNotification algorithm_id={algorithm_id} trade_hash={trade_hash} />
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

export default SignalApprovedSuccessNotification;
