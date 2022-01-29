import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  destroyAccessToken,
  destroyRefreshToken,
} from '../utils/cookiesHandler';
import { redirectTo } from '../utils/redirectTo';

interface IState {
  isAuthenticated: boolean;
  logout: Function;
  username: string;
}

const Profile: React.FC<IState> = ({ logout, username }) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    destroyAccessToken();
    destroyRefreshToken();
    redirectTo(navigate, '/login');
  };
  return (
    <div>
      <h2>Profile</h2>
      <h3>{username}</h3>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
