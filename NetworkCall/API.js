import get from 'lodash/get';

import axios from '../framework/src/utils/ajax';
import StorageService from '../framework/src/services/storageService';

const API_URL = process.env.NEXT_PUBLIC_SECURE_EC2_URL;

const useAPI = () => {
  async function getHospitals({ limit, offset }) {
    try {
      const response = await axios({
        url: `${API_URL}/hospital/list?limit=${limit}&offset=${offset}`,
        method: 'GET'
      });
      if (response) {
        const hospitals = get(response, 'data', []);
        return { hospitals };
      }
    } catch (error) {
      return { validZipcode: false, locationId: false };
    }
    return { validZipcode: false, locationId: false };
  }

  async function uploadPhotoId(file, type, onChangeProgress) {
    const url = `${API_URL}/customers/photoid/${type}`;

    const formData = new FormData();
    formData.append(type === 'photo-id', file);

    formData.append('isBase64Image', false);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        const uploadProgress = (progressEvent.loaded * 100) / progressEvent.total;
        if (onChangeProgress) {
          onChangeProgress(uploadProgress);
        }
      }
    };

    await axios({
      url,
      method: 'POST',
      ...config,
      data: formData
    });
  }

  async function checkPostCodeStatus({ postcode: paramPostcode, latitude: paramLatitude, longitude: paramLongitude }) {
    try {
      const response = await axios({
        url: `${API_URL}/address/${paramPostcode}?lat=${paramLatitude}&lng=${paramLongitude}`,
        method: 'GET'
      });
      if (response) {
        const validZipcode = get(response, 'data.is_available', false);
        const locationId = get(response, 'data.location_id', false);
        return { validZipcode, locationId };
      }
    } catch (error) {
      return { validZipcode: false, locationId: false };
    }
    return { validZipcode: false, locationId: false };
  }

  async function requestEmailOTP(email) {
    StorageService.setEmail(email);
    await axios({
      url: `${API_URL}/customers/email_otp`,
      method: 'POST',
      data: {
        email
      },
      params: {
        excludeLocationToken: true
      }
    });
  }

  return {
    getHospitals
  };
};

export default useAPI;
