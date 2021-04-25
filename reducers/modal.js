export function createInitialStore() {
  const notifications = [];
  const notificationsOverlap = [];
  const pushedURL = '';
  const stackURL = 0;
  return { notifications, notificationsOverlap, pushedURL, stackURL };
}

export const actions = {};

actions.pushNotification = (state, action) => {
  return { ...state, modal: { ...state.modal, notifications: [...state.modal.notifications, action.payload] } };
};

actions.popNotification = state => {
  const array = state.modal.notifications;
  array.splice(0, 1);
  return { ...state, modal: { ...state.modal, notifications: array } };
};

actions.popSpecifictNotification = (state, action) => {
  if (action.overlap) {
    return {
      ...state,
      modal: {
        ...state.modal,
        notificationsOverlap: state.modal.notificationsOverlap.filter(item => item.type !== action.payload.type)
      }
    };
  }
  return {
    ...state,
    modal: {
      ...state.modal,
      notifications: state.modal.notifications.filter(item => item.type !== action.payload.type)
    }
  };
};

actions.pushNotificationTop = (state, action) => {
  return { ...state, modal: { ...state.modal, notifications: [action.payload, ...state.modal.notifications] } };
};

actions.popNotificationOverlap = state => {
  const array = state.modal.notificationsOverlap;
  array.splice(0, 1);
  return { ...state, modal: { ...state.modal, notificationsOverlap: array } };
};

actions.pushNotificationOverlap = (state, action) => {
  return { ...state, modal: { ...state.modal, notificationsOverlap: [action.payload, ...state.modal.notificationsOverlap] } };
};

actions.pushOnTopIfNotPresent = (state, action) => {
  if (state.modal.notifications.map(item => item.type).includes(action.payload.type)) {
    return { ...state, modal: { ...state.modal, notifications: [action.payload, ...state.modal.notifications] } };
  }
  return state;
};

actions.pushURL = (state, action) => {
  return { ...state, modal: { ...state.modal, pushedURL: action.payload.url, stackURL: 1 } };
};

actions.increaseURLstack = state => {
  return { ...state, modal: { ...state.modal, stackURL: state.modal.stackURL + 1 } };
};

actions.popStack = state => {
  return { ...state, modal: { ...state.modal, stackURL: 0 } };
};
