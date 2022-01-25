import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
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
