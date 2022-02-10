import { Box, Container } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NotesMap from '../components/NotesMap';

import { redirectTo } from '../utils/redirectTo';

interface IState {
  isAuthenticated: boolean;
}
const Home: React.FC<IState> = ({ isAuthenticated }) => {
  let navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     redirectTo(navigate, '/login');
  //     return;
  //   }
  // }, [isAuthenticated]);
  const notes = [
    {
      id: 1,
      note_name: 'Design Patterns',
      created_at: new Date(),
    },
    {
      id: 2,
      note_name: 'Singleton Pattern',
      created_at: new Date(),
    },
    {
      id: 3,
      note_name: 'Facade Pattern',
      created_at: new Date(),
    },
    {
      id: 4,
      note_name: 'Design Patterns',
      created_at: new Date(),
    },
    {
      id: 5,
      note_name: 'Singleton Pattern',
      created_at: new Date(),
    },
    {
      id: 6,
      note_name: 'Facade Pattern',
      created_at: new Date(),
    },
  ];

  return (
    <Container pt={4}>
      <NoteList notes={notes} />
    </Container>
  );
};

export default Home;
