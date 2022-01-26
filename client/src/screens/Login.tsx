import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IState {
  isAuthenticated: boolean;
  authenticate: Function;
}

const Login: React.FC<IState> = ({ isAuthenticated, authenticate }) => {
  let navigate = useNavigate();
  async function redirectToHome() {
    navigate('/');
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticate();
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
