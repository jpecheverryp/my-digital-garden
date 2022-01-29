import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setRefreshToken } from '../utils/cookiesHandler';
import axios from 'axios';

interface IState {
  isAuthenticated: boolean;
}

const Login: React.FC<IState> = ({ isAuthenticated }) => {
  let navigate = useNavigate();
  async function redirectToHome() {
    navigate('/');
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authData = await axios({
      method: 'POST',
      url: '/api/auth',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { email: 'j@email.com', password: 'password' },
    });
    console.log(authData);
    setAccessToken(authData.data.accessToken);
    setRefreshToken(authData.data.refreshToken);

    redirectToHome();
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <button type='submit'>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
