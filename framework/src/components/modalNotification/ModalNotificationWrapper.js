import React, { useContext } from 'react';
import ModalNotification from './ModalNotification';

import appContext from '../../../../Context/appContext';

const ModalNotificationWrapper = () => {
  const { state: { modal: { notifications, notificationsOverlap } = {} } = {} } = useContext(appContext);
  return (
    <>
      {notificationsOverlap && notificationsOverlap.length ? (
        <ModalNotification notifications={notificationsOverlap} overlap />
      ) : null}
      <ModalNotification notifications={notifications} />
    </>
  );
};

export default ModalNotificationWrapper;
