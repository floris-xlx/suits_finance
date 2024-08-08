'use client';

import React, { useEffect, useState } from 'react';
import {
  XCircleIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

import notifications from './notifications.js';

const iconComponents = {
  XCircleIcon: XCircleIcon,
  ClipboardDocumentCheckIcon: ClipboardDocumentCheckIcon,
};

const Popup = ({ notification, isVisible, shouldAnimate }) => {
  const NotificationSlideIn = 'notification-popup';
  const NotificationSlideOut = 'notification-popup-out';
  const [currentClass, setCurrentClass] = useState(NotificationSlideOut);

  useEffect(() => {
    if (shouldAnimate) {
      setCurrentClass(NotificationSlideIn);

      const timer = setTimeout(() => {
        setCurrentClass(NotificationSlideOut);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  if (!isVisible && currentClass === NotificationSlideOut) return null;

  const notificationDetails = notifications.find(
    (n) => n.type === notification
  );

  if (!notificationDetails) return null;

  const { title, message, icon } = notificationDetails;
  const IconComponent = iconComponents[icon];

  return (
    <div
      className={`${currentClass} transition rounded-lg shadow-lg p-4 bg-primary max-w-20 border-primary border min-w-[320px] z-[100] absolute`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {IconComponent && (
            <IconComponent className="size-6 text-brand-primary" />
          )}
        </div>
        <div className="ms-3">
          <h3 className="text-primary font-medium select-none">{title}</h3>
          <p className="mt-2 text-sm text-secondary font-normal select-none">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;

