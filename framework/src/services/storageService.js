import cookie from 'js-cookie';

const COOKIE_VARIABLES = {
  token: 'token'
};

const key = {
  TOKEN: 'token',
  CUSTOM_PAYLOAD: 'custom-payload',
  USER_DATA: 'userData',
  EMAIL: 'EMAIL'
};

class StorageService {
  constructor() {
    if (process.browser) {
      this.storage = window.localStorage;
      this.sessionStorage = window.sessionStorage;
    } else {
      this.storage = null;
    }
  }

  clearUserSpecificData() {
    this.clearEmail();
    cookie.remove(COOKIE_VARIABLES.token);
    this.storage.removeItem(key.TOKEN);
    this.storage.removeItem(key.USER_DATA);
  }

  removeToken() {
    this.storage.removeItem(key.TOKEN);
  }

  getItem(property) {
    if (this.storage) {
      return this.storage.getItem(property);
    }
    return null;
  }

  getItemSession(property) {
    if (this.storage) {
      return this.sessionStorage.getItem(property);
    }
    return null;
  }

  getToken() {
    return this.getItem(key.TOKEN) || false;
  }

  deleteToken() {
    this.storage.removeItem(key.TOKEN);
  }

  isLoggedIn() {
    if (cookie.get(COOKIE_VARIABLES.token)) {
      return true;
    }
    return false;
  }

  getUserData() {
    try {
      return JSON.parse(this.getItem(key.USER_DATA));
    } catch (err) {
      return {};
    }
  }

  setUserData(data) {
    if (data) {
      this.storage.setItem(key.USER_DATA, JSON.stringify(data));
    }
  }

  getEmail() {
    return this.getItem(key.EMAIL);
  }

  setEmail(email) {
    this.storage.setItem(key.EMAIL, email);
  }

  clearEmail() {
    this.storage.removeItem(key.EMAIL);
  }

  setToken(token) {
    if (token) {
      this.storage.setItem(key.TOKEN, token);
    }
  }

  setCustomPayload(payload) {
    this.storage.setItem(key.CUSTOM_PAYLOAD, payload);
  }

  getCustomPaylaod() {
    return this.getItem(key.CUSTOM_PAYLOAD);
  }

  clearStorage() {
    this.storage.clear();
  }
}

export default new StorageService();
