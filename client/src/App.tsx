// React Libraries
import { useEffect, useState } from 'react';
// Routing
import { Route, Routes, useNavigate } from 'react-router-dom';
// Styling
import './App.css';
// Libraries and utilities
import axios from 'axios';
import { getRefreshToken, setAccessToken } from './utils/cookiesHandler';
import { redirectTo } from './utils/redirectTo';
// Components
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Register from './screens/Register';
import NoteView from './components/NoteView';

function App() {
  // Needed to redirect
  let navigate = useNavigate();

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
        redirectTo(navigate, '/');
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

      <main className='content'>
        <Routes>
          <Route
            path='/'
            element={<Home isAuthenticated={data.isAuthenticated} />}
          />
          <Route
            path='/profile'
            element={<Profile logout={logout} username={data.username} />}
          />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
          <Route path='/note/:id' element={<NoteView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
