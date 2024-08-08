import { CopiedToClipboardNotification } from '@/app/components/ui/Notifications/Notifications.jsx';

export const copyToClipboard = (text, triggerNotification, notificationType = 'CopiedToClipboard') => {
  //const modifiedText = typeof text === 'number' ? text.toString().replace(/\./g, ',') : text;

  navigator.clipboard
    .writeText(text)
    .then(() => {
   
      CopiedToClipboardNotification({
        valueName: notificationType
      });

    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
};
