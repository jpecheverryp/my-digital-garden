import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IState {
  isAuthenticated: boolean;
  logout: Function;
}

const Profile: React.FC<IState> = ({ isAuthenticated, logout }) => {
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
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
