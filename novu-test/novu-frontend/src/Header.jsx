import React from 'react';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';

export const NovuHeader = () => {
  return (
    <NovuProvider
      subscriberId={import.meta.env.VITE_NOVU_SUBSCRIBER_ID}
      applicationIdentifier={import.meta.env.VITE_NOVU_APP_ID}>
      <PopoverNotificationCenter colorScheme={'light'}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};  
export default NovuHeader;
