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
  return (
    <Router>
      <div className='App'>
        <Navbar isAuthenticated={data.isAuthenticated} />
        <main className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
