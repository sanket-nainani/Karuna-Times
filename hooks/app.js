import useSWR from 'swr';
import { useContext } from 'react';
import get from 'lodash/get';
import axios from '../framework/src/utils/ajax';
import appContext from '../Context/appContext';

const fetcher = url => axios({ baseURL: process.env.NEXT_PUBLIC_SECURE_EC2_URL, url, method: 'GET' }).then(res => res.data);

export const useZipCodeStatus = () => {
  const {
    state: {
      user: {
        deliveryDetails: { postcode, latitude, longitude }
      }
    }
  } = useContext(appContext);
  const { data, mutate } = useSWR(`/address/${postcode}?lat=${latitude}&lng=${longitude}`, fetcher);
  const validZipcode = get(data, 'is_available', false);
  const locationId = get(data, 'location_id', false);

  return {
    data: { validZipcode, locationId },
    mutate
  };
};
