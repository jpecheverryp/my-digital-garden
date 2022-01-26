import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface IState {
  isAuthenticated: boolean;
}
const Home: React.FC<IState> = ({ isAuthenticated }) => {
  let navigate = useNavigate();
  async function redirectToLogin() {
    navigate('/login');
  }
  useEffect(() => {
    if (!isAuthenticated) {
      redirectToLogin();
    }
  });
  return <h1>Home</h1>;
};

export default Home;
