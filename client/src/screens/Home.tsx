import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../utils/cookiesHandler';
import { redirectTo } from '../utils/redirectTo';
interface IState {
  isAuthenticated: boolean;
}
const Home: React.FC<IState> = ({ isAuthenticated }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      redirectTo(navigate, '/login');
      return;
    }
    // const token = 'Bearer ' + getAccessToken();
    // axios({
    //   method: 'GET',
    //   url: '/data',
    //   headers: {
    //     'x-auth-token': token,
    //   },
    // })
    //   .then((data) => console.log(data.data))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <h1>Home</h1>
      {/* <p>{fakeData}</p> */}
    </section>
  );
};

export default Home;
