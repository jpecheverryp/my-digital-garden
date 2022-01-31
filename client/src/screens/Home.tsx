import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getAccessToken } from '../utils/cookiesHandler';
import { redirectTo } from '../utils/redirectTo';
interface IState {
  isAuthenticated: boolean;
}
const Home: React.FC<IState> = ({ isAuthenticated }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      redirectTo(navigate, '/login');
      return;
    }
  }, []);
  const notes = [
    {
      note_name: 'Design Patterns',
      created_at: new Date(),
    },
    {
      note_name: 'Singleton Pattern',
      created_at: new Date(),
    },
    {
      note_name: 'Facade Pattern',
      created_at: new Date(),
    },
  ];

  return (
    <section>
      <h1 className='light-text'>Home</h1>
      <NoteList notes={notes} />
    </section>
  );
};

export default Home;
