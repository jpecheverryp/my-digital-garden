import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setRefreshToken, setAccessToken } from '../utils/cookiesHandler';
import { redirectTo } from '../utils/redirectTo';

interface IProps {
  setUser: Function;
}

const Register: React.FC<IProps> = ({ setUser }) => {
  // Navigate function to change route after succesful registration
  let navigate = useNavigate();

  //Form data to submit
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  // Change Form state when typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/users',
        data: formData,
      });
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user.username);
      redirectTo(navigate, '/profile');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            onChange={handleChange}
            autoComplete='username'
            type='text'
            name='username'
            id='username'
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            onChange={handleChange}
            autoComplete='email'
            type='email'
            name='email'
            id='email'
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            onChange={handleChange}
            autoComplete='current-password'
            type='password'
            name='password'
            id='password'
            required
          />
        </div>

        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
