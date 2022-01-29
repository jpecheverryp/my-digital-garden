import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    axios({
      method: 'GET',
      url: '/data',
      headers: {
        'x-auth-token':
          'BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyYzYzMmE1LTJiN2MtNGQ2Mi1hNTFmLTljZTczMmYyOGJmNyIsImlhdCI6MTY0MzQ5MDEyMSwiZXhwIjoxNjQzNDkyODIxfQ.65a3PKG7YhUYtKv1EoZN-yncO_T4t_uQ4N-Yz8pn4wQ',
      },
    })
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <h1>Home</h1>
      {/* <p>{fakeData}</p> */}
    </section>
  );
};

export default Home;
