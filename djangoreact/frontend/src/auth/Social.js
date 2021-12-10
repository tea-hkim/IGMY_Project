import React, { useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

const Social = () => {
  useEffect(async () => {
    const code = new URL(window.location.href).searchParams.get('code');
    const KAKAKO_LOGIN = `${process.env.REACT_APP_HOST_IP_ADDRESS}api/login/kakao/`;

    console.log(typeof code);

    try {
      const response = await axios.post(KAKAKO_LOGIN, code.toString());
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <Loader />;
};

export default Social;
