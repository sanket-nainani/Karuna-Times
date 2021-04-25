import get from 'lodash/get';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios, { getErrorMessage, getSuccessMessage } from '../utils/ajax';
import storageService from './storageService';
import { DEFAULT_PINCODE, COOKIE_VARIABLES } from '../constants/AppConst';

class InterceptorsService {
  constructor() {
    axios.interceptors.request.use(
      config => {
        const localConfig = config;
        if (!localConfig.external) {
          if (!localConfig.headers) {
            localConfig.headers = {};
          }
          // Pass Auth Token if present
          const token = cookie.get(COOKIE_VARIABLES.token);
          if (token) {
            localConfig.headers.Authorization = `Bearer ${token}`;
          }

          // Set default content-type
          if (!localConfig.headers['content-type']) {
            localConfig.headers['content-type'] = 'application/json';
          }
        }
        return localConfig;
      },
      error => Promise.reject(error)
    );

    axios.interceptors.response.use(
      response => {
        if (process.browser) {
          /**
           * Common error message handeling for all API
           * This block handle displaying error if there is any error message inside APi response with success HTTP code
           */
          const errorMsg = getErrorMessage(get(response, 'data', {}));
          if (errorMsg) {
            toast.error(errorMsg, { toastId: `${errorMsg.replace(/\s+/g, '')}` });
          }

          /**
           * Common success message handeling for all API
           */
          const successMsg = getSuccessMessage(get(response, 'data', {}));
          const method = get(response, 'config.method');
          const hideSuccess = get(response, 'config.hideSuccess');
          if (successMsg && method !== 'get' && !hideSuccess) {
            toast.success(successMsg);
          }
        }
        return response;
      },
      error => {
        const response = get(error, 'response', {});
        if (process.browser && response && response.config && !response.config.external && response.status === 401) {
          storageService.clearUserSpecificData();
          // eslint-disable-next-line no-restricted-globals
          location.href = `/login?redirect=${location.pathname}`;
        } else if (process.browser && error && response.config && !response.config.hideError) {
          /**
           * Common error message handeling for all API
           * This block handle displaying error if found any error HTTP code
           */
          const errorMsg = getErrorMessage(response, true);
          if (errorMsg) {
            toast.error(errorMsg, { toastId: `${errorMsg.replace(/\s+/g, '')}` });
          } else {
            toast.error('Something went wrong!', { toastId: 'Somethingwentwrong' });
          }
        }
        return Promise.reject(response);
      }
    );
  }
}

export default new InterceptorsService();
