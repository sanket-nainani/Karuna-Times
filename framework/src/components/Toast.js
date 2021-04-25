import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const Toast = () => {
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  return loaded ? <ToastContainer hideProgressBar closeButton={false} newestOnTop autoClose={5000} /> : null;
};

export default Toast;
