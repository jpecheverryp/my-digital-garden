import React from 'react';
import { Link } from 'react-router-dom';
interface IState {
  isAuthenticated: boolean;
}
const Navbar: React.FC<IState> = ({ isAuthenticated }) => {
  return (
    <nav className='navbar'>
      {/* Brand */}
      <Link to={'/'}>My Digital Garden</Link>
      {/* Check if authenticated and display different links */}
      {isAuthenticated ? (
        <Link to={'/profile'}>Profile</Link>
      ) : (
        <>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
