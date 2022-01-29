import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IState {
  isAuthenticated: boolean;
  logout: Function;
  username: string;
}

const Profile: React.FC<IState> = ({ isAuthenticated, logout, username }) => {
  let navigate = useNavigate();
  async function redirectToLogin() {
    navigate('/');
  }
  const handleLogout = () => {
    logout();
    redirectToLogin();
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
