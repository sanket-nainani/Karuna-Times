import axios from 'axios';
import get from 'lodash/get';

const axiosInstance = axios.create();

export default axiosInstance;

export async function ajax(options) {
  try {
    const responseJson = await axiosInstance(options);
    return responseJson;
  } catch (error) {
    return Promise.reject(error);
  }
}

export function getSuccessMessage(res) {
  const message = get(res, 'message');
  if (message && typeof message === 'string') {
    return message;
  }
  return null;
}

export function getErrorMessage(res, httpErrorFound) {
  if (httpErrorFound) {
    const message = get(res, 'data.message');
    if (message && typeof message === 'string') {
      return message;
    }
  }
  const error = get(res, 'data.error');
  if (error && typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object') {
    const message = get(error, 'message');
    if (message && typeof message === 'string') {
      return message;
    }
    if (message && typeof message === 'object') {
      const message2 = get(message, 'message');
      if (message2) {
        return message2;
      }
    }
  }
  return null;
}
