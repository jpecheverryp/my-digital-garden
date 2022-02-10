import { Box } from '@chakra-ui/react';
import React from 'react';
import NoteList from '../components/NoteList';

interface IState {
  isAuthenticated: boolean;
}
const Home: React.FC<IState> = () => {
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
    <Box>
      <NoteList notes={notes} />
    </Box>
  );
};

export default Home;
