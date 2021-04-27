import useSWR from 'swr';
import { useContext } from 'react';
import get from 'lodash/get';
import axios from '../framework/src/utils/ajax';
import appContext from '../Context/appContext';

const fetcher = url => axios({ baseURL: process.env.NEXT_PUBLIC_SECURE_EC2_URL, url, method: 'GET' }).then(res => res.data);

export const getHospitals = () => {
  const {
    state: {
      user: { isLoggedIn }
    }
  } = useContext(appContext);
  const { data, error, mutate } = useSWR(isLoggedIn ? `/customers/upload_eligible` : null, fetcher);

  const idProof = get(data, 'data', {});

  return {
    data: idProof,
    isLoading: !error && !data,
    mutate
  };
};
