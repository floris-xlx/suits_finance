import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';


const UserDeleteRoleSuccessInlineNotification = () => {
    return (
        <span className="flex flex-row items-center bg-secondary">
            <CheckIcon className="h-12 w-12  sm:w-8 sm:h-8 mr-2 text-brand-primary" />
            <div className="flex flex-col gap-y-1">

                <span className="pl-3 text-primary sm:text-[14px] text-[14px] font-semibold">
                    User role successfully deleted.
                </span>
                <span className="pl-3 text-secondary sm:text-[12px] text-[12px]">
                    The user object will still persist, but the role has been removed.
                </span>
            </div>
        </span>
    );
};


const UserDeleteRoleSuccessNotification = () => toast((t) => (
    < UserDeleteRoleSuccessInlineNotification />
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

export default UserDeleteRoleSuccessNotification;
