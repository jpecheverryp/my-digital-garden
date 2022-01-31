import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  destroyAccessToken,
  destroyRefreshToken,
  getRefreshToken,
} from '../utils/cookiesHandler';
import { redirectTo } from '../utils/redirectTo';

interface IState {
  logout: Function;
  username: string;
}

const Profile: React.FC<IState> = ({ logout, username }) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    axios({
      method: 'DELETE',
      url: '/api/auth/logout',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        token: getRefreshToken(),
      },
    })
      .then((success) => {
        logout();
        destroyAccessToken();
        destroyRefreshToken();
        redirectTo(navigate, '/login');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2 className='light-text'>Profile</h2>
      <h3 className='light-text'>{username}</h3>
      <button className='btn' onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
