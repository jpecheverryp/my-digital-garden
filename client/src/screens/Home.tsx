import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NoteList from '../components/NoteList';

const Home: React.FC = () => {
  const [notes, setNotes] = useState([{ id: '', title: '', createdAt: '' }]);
  useEffect(() => {
    axios.get('/api/notes', {}).then((data) => {
      setNotes(data.data);
    });
  }, []);

  return (
    <Box>
      <NoteList notes={notes} />
    </Box>
  );
};

export default Home;
