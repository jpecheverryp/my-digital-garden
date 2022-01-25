import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
      <Link to={'/'}>My Digital Garden</Link>
      <Link to={'/Profile'}>Profile</Link>
    </nav>
  );
};

export default Navbar;
