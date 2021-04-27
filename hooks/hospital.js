import useSWR from 'swr';
import get from 'lodash/get';
import axios from '../framework/src/utils/ajax';

const fetcher = url => axios({ baseURL: process.env.NEXT_PUBLIC_SECURE_EC2_URL, url, method: 'GET' }).then(res => res.data);

export const useHospitals = ({ limit, offset, hospitalInitial }) => {
  const { data, error, isValidating } = useSWR(`/hospital/list?limit=${limit}&offset=${offset}`, fetcher, {
    initialData: { hospitalInitial, dontModify: true },
    revalidateOnMount: true
  });

  const hospitals = get(data, 'data', {});

  return {
    data: hospitals,
    isLoading: !error && !data,
    isValidating
  };
};
