// React Libraries
import { useEffect, useState } from 'react';
// Routing
import { Route, Routes } from 'react-router-dom';
// Libraries and utilities
import axios from 'axios';
import { getRefreshToken, setAccessToken } from './utils/cookiesHandler';

// Components
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Register from './screens/Register';
import NoteView from './screens/NoteView';
import { Box } from '@chakra-ui/react';

function App() {
  const [data, setData] = useState({
    isAuthenticated: false,
    username: '',
  });

  const setUser = (user: string) => {
    setData({ ...data, username: user, isAuthenticated: true });
  };
  const logout = () => {
    setData({ ...data, isAuthenticated: false });
  };
  const authenticate = async () => {
    if (getRefreshToken()) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: '/api/auth/token',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            token: getRefreshToken(),
          },
        });
        setAccessToken(data.accessToken);
        setUser(data.username);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <div className='App'>
      <Navbar isAuthenticated={data.isAuthenticated} />

      <Box className='content' pt={3} px={2}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/profile'
            element={<Profile logout={logout} username={data.username} />}
          />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
          <Route path='/note/:id' element={<NoteView />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
