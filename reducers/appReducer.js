import * as modal from './modal';
import * as user from './user';

export const ACTION_TYPES = {
  TOGGLE_SIDEBAR: 'toggleSidebar',
  REQUEST_OTP: 'requestOTP',
  LOGIN: 'login',
  PUSH_NOTIFICATION: 'pushNotification',
  POP_NOTIFICATION: 'popNotification'
};

export const initialState = {
  sideBar: { isSideBarOpen: false, shouldRenderSideBar: false },
  user: user.createInitialStore(),
  modal: modal.createInitialStore()
};

let actions = {};

actions.toggleSidebar = state => {
  return { ...state, sideBar: { isSideBarOpen: !state.sideBar.isSideBarOpen, shouldRenderSideBar: true } };
};

actions = { ...actions, ...user.actions, ...modal.actions };

export const reducer = (state, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }
  return state;
};
