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
  });
  const authenticate = () => {
    setData({ ...data, isAuthenticated: true });
  };
  const logout = () => {
    setData({ ...data, isAuthenticated: false });
  };
  // let navigate = useNavigate();
  // async function redirectToLogin() {
  //   navigate('/login');
  // }

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
                />
              }
            />
            <Route
              path='/login'
              element={
                <Login
                  isAuthenticated={data.isAuthenticated}
                  authenticate={authenticate}
                />
              }
            />
            <Route
              path='/register'
              element={
                <Register
                  isAuthenticated={data.isAuthenticated}
                  authenticate={authenticate}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
