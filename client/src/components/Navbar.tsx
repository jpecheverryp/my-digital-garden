import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Flex, Box } from '@chakra-ui/react';

interface IState {
  isAuthenticated: boolean;
}
const Navbar: React.FC<IState> = ({ isAuthenticated }) => {
  return (
    <Flex
      bg={'green.300'}
      p={4}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      {/* Brand */}
      <Link as={RouterLink} to={'/'}>
        My Digital Garden
      </Link>
      {/* Check if authenticated and display different links */}
      {isAuthenticated ? (
        <Link as={RouterLink} to={'/profile'}>
          Profile
        </Link>
      ) : (
        <Box>
          <Link as={RouterLink} to={'/login'} pr={3}>
            Log In
          </Link>
          <Link as={RouterLink} to={'/register'}>
            Sign Up
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;
