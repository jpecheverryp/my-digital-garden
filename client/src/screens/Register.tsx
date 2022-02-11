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
      // Send POST request
      const { data } = await axios({
        method: 'POST',
        url: '/api/users',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      });
      // Set tokens to cookies
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      //Set username in app state
      setUser(data.user.username);
      redirectTo(navigate, '/');
    } catch (error: any) {
      if (error.request.status === 400) {
        console.log(JSON.parse(error.request.response));
        if (
          JSON.parse(error.request.response).msg ===
          'Username already registered'
        ) {
          setErrorData({
            field: 'username',
            isError: true,
            errorMessage: JSON.parse(error.request.response).msg,
          });
          return;
        }
        if (
          JSON.parse(error.request.response).msg === 'Email already registered'
        ) {
          setErrorData({
            field: 'email',
            isError: true,
            errorMessage: JSON.parse(error.request.response).msg,
          });
          return;
        }
      }
      console.log(error);
    }
  };
  return (
    <Flex h={'80vh'} justifyContent={'center'} alignItems={'center'}>
      <Flex direction={'column'} background={'gray.200'} p={12} rounded={6}>
        <Heading mb={6}>Register</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl
            isRequired
            isInvalid={errorData.isError && errorData.field === 'username'}
          >
            <FormLabel htmlFor='username'>Username:</FormLabel>
            <Input
              onChange={handleChange}
              autoComplete='username'
              placeholder='John Doe'
              variant={'filled'}
              type='text'
              name='username'
              id='username'
            />
            {<FormErrorMessage>{errorData.errorMessage}</FormErrorMessage>}
          </FormControl>
          <FormControl
            isRequired
            isInvalid={errorData.isError && errorData.field === 'email'}
          >
            <FormLabel htmlFor='email' mt={6}>
              Email:
            </FormLabel>
            <Input
              onChange={handleChange}
              autoComplete='email'
              placeholder='johndoe@email.com'
              variant={'filled'}
              type='email'
              name='email'
              id='email'
            />
            {<FormErrorMessage>{errorData.errorMessage}</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired>
            <FormLabel mt={6} htmlFor='password'>
              Password:
            </FormLabel>
            <Input
              onChange={handleChange}
              autoComplete='current-password'
              placeholder='********'
              variant={'filled'}
              type='password'
              name='password'
              id='password'
            />
          </FormControl>

          <Button mt={6} colorScheme={'orange'} w={'100%'} type='submit'>
            Sign Up
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Register;
