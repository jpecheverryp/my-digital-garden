import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Register from './screens/Register';

function App() {
  const [data, setData] = useState({
    isAuthenticated: false,
    username: '',
  });

  const logout = () => {
    setData({ ...data, isAuthenticated: false });
  };

  const setUser = (user: string) => {
    setData({ ...data, username: user });
  };

  return (
    <Router>
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
              element={
                <Profile
                  isAuthenticated={data.isAuthenticated}
                  logout={logout}
                  username={data.username}
                />
              }
            />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
