import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link, Flex, Box, Button } from '@chakra-ui/react';
import { addNewNote } from '../utils/addNewNote';
import { getAccessToken } from '../utils/cookiesHandler';
interface IState {
  isAuthenticated: boolean;
}
const Navbar: React.FC<IState> = ({ isAuthenticated }) => {
  let navigate = useNavigate();
  return (
    <Flex
      bg={'gray.400'}
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
        <Box>
          <Button
            p={2}
            mr={2}
            colorScheme={'blue'}
            onClick={() => addNewNote(getAccessToken(), navigate)}
          >
            Add Note
          </Button>
          <Link as={RouterLink} to={'/profile'}>
            Profile
          </Link>
        </Box>
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
