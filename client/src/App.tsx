import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        {/* TODO ADD NAVBAR COMPONENT */}
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/Profile'}>Profile</Link>
        </nav>
        <main className='content'>
          <Routes>
            <Route path='/' element={<div>Home</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
