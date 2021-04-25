import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import DynamicModal from '../Modal';

import appContext from '../../../../Context/appContext';

import { getRouterPath } from '../../helpers';
import notificationTypes from '../../constants/modalNotificationConst';

const SimplePopUp = dynamic(() => import('./SimplePopUp'));

const hideModalPages = [
  'privacypolicy',
];

const ModalNotification = ({ notifications, overlap }) => {
  const { dispatch } = useContext(appContext);
  const router = useRouter();

  function dismissNotification() {
    if (overlap) {
      dispatch({ type: 'popNotificationOverlap' });
    } else {
      dispatch({ type: 'popNotification' });
    }
  } 
  
  const { pathname } = router;

  const hideModalNotification = hideModalPages.includes(getRouterPath(pathname));
  if (hideModalNotification) {
    return null;
  }

  if (process.browser && notifications.length) {
    const { type, data } = notifications[0];
    switch (type) {
      case notificationTypes.simplePopup:
        return (
          <DynamicModal>
            <SimplePopUp data={data} dismiss={dismissNotification} />
          </DynamicModal>
        );
      default:
        return null;
    }
  }
  return null;
};

export default ModalNotification;
