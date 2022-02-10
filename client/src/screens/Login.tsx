import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setRefreshToken } from '../utils/cookiesHandler';
import { redirectTo } from '../utils/redirectTo';

interface IProps {
  setUser: Function;
}

const Login: React.FC<IProps> = ({ setUser }) => {
  // Navigate function to change route after succesful registration
  let navigate = useNavigate();

  //Form data to submit
  const [formData, setFormData] = useState({
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
        url: '/api/auth',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      });
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user.username);
      redirectTo(navigate, '/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex h={'80vh'} justifyContent={'center'} alignItems={'center'}>
      <Flex direction={'column'} background={'gray.200'} p={12} rounded={6}>
        <Heading mb={6}>Log In</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor='email'>Email:</FormLabel>
            <Input
              onChange={handleChange}
              autoComplete='email'
              placeholder='johndoe@example.com'
              variant={'filled'}
              mb={4}
              type='email'
              name='email'
              id='email'
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='password'>Password:</FormLabel>
            <Input
              onChange={handleChange}
              autoComplete='current-password'
              type='password'
              name='password'
              id='password'
              placeholder='********'
              variant={'filled'}
              mb={6}
            />
          </FormControl>

          <Button colorScheme={'orange'} type='submit' width={'full'}>
            Log In
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
