import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
  const [errorData, setErrorData] = useState({
    errorMessage: '',
    isError: false,
    field: '',
  });
  // Change Form state when typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorData.isError) {
      setErrorData({ errorMessage: '', isError: false, field: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, status } = await axios({
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
    } catch (error: any) {
      if (error.request.status === 404) {
        setErrorData({
          ...errorData,
          errorMessage: 'User Not Found',
          isError: true,
          field: 'email',
        });
        return;
      }
      if (error.request.status === 401) {
        setErrorData({
          ...errorData,
          errorMessage: 'Invalid Password',
          isError: true,
          field: 'password',
        });
      }
      console.log(error);
    }
  };
  return (
    <Flex h={'80vh'} justifyContent={'center'} alignItems={'center'}>
      <Flex direction={'column'} background={'gray.200'} p={12} rounded={6}>
        <Heading mb={6}>Log In</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl
            isRequired
            isInvalid={errorData.isError && errorData.field === 'email'}
          >
            <FormLabel htmlFor='email'>Email:</FormLabel>
            <Input
              onChange={handleChange}
              autoComplete='email'
              placeholder='johndoe@example.com'
              variant={'filled'}
              type='email'
              name='email'
              id='email'
            />
            {
              <FormErrorMessage mt={0}>
                {errorData.errorMessage}
              </FormErrorMessage>
            }
          </FormControl>
          <FormControl
            isRequired
            isInvalid={errorData.isError && errorData.field === 'password'}
          >
            <FormLabel mt={6} htmlFor='password'>
              Password:
            </FormLabel>
            <Input
              onChange={handleChange}
              autoComplete='current-password'
              type='password'
              name='password'
              id='password'
              placeholder='********'
              variant={'filled'}
            />
            {<FormErrorMessage>{errorData.errorMessage}</FormErrorMessage>}
          </FormControl>

          <Button mt={6} colorScheme={'orange'} type='submit' width={'full'}>
            Log In
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
