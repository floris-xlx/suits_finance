import React from 'react';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';


const CopiedToClipboardInlineNotification = ({
    valueName
}) => {
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
