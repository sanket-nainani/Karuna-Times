import { useContext } from 'react';
import { toast } from 'react-toastify';

import * as socketCalls from '../framework/src/helpers/SocketHelper';

import appContext from '../Context/appContext';

const useSocket = () => {
  const { dispatch } = useContext(appContext);
  async function checkout(obj) {
    try {
      const data = await socketCalls.checkOut(obj);
      return { data };
    } catch (error) {
      const { error: message, code } = error;
      toast.error(message);
      return { error };
    }
  }

  return {
    checkout
  };
};

export default useSocket;
