import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';


const WrongCredentialsInlineNotification = () => {
  return (
    <span className="flex flex-row items-center bg-secondary">
      <XMarkIcon className="h-12 w-12  sm:w-8 sm:h-8 mr-2 text-brand-primary" />
      <span className="pl-3 text-primary text-[18px] sm:text-[14px]">
        Your credentials are incorrect. Please try again.
      </span>
    </span>
  );
};

const wrongCredentialsNotification = () => toast((t) => (
  < WrongCredentialsInlineNotification />
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

export default wrongCredentialsNotification;
