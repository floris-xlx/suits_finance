import React, { useEffect } from 'react';
import { RulerIcon } from '@/app/components/ui/Icon';
import toast, { Toaster, useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 1;

const PickSizeNotification = () => {
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
      <RulerIcon className="sm:h-8 sm:w-8 w-12 h-12 text-brand-primary" />
      <span className="pl-3 text-primary text-[18px] sm:text-[14px]">
        You need to pick a size before adding the item to your cart!
      </span>
    </span>
  );
};

const SizeNotification = () => toast((t) => (
  < PickSizeNotification />
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
  duration: 2000
}
);

export default SizeNotification;
