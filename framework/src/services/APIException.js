import { getErrorMessage } from '../utils/ajax';

class APIException extends Error {
  constructor(data) {
    let error = getErrorMessage(data);
    if (!error) {
      error = 'Something Went wrong!';
    }
    const { status, data: { success, code } = {} } = data;
    super(error);
    this.status = status;
    this.customCode = code;
    this.success = success;
    this.message = error;
    this.customMessage = { status, error };
  }
}

export default APIException;
