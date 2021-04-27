import isEmpty from 'lodash/isEmpty';
import cookie from 'js-cookie';
import StorageService from '../framework/src/services/storageService';

import { DEFAULT_ADDRESS, DEFAULT_LOCATION, COOKIE_VARIABLES } from '../framework/src/constants/AppConst';

export function createInitialStore() {
  const hospital = [];
  return { hospital };
}

export const actions = {};

const commonUserAction = (state, action) => {
  return { ...state, user: { ...state.user, ...action.payload } };
};

actions.login = commonUserAction;
