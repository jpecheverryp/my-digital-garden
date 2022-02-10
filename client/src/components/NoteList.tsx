import { Box } from '@chakra-ui/react';
import React from 'react';
import NotePreview from './NotePreview';

interface IProps {
  notes: {
    id: string;
    title: string;
    createdAt: string;
  }[];
}
const NoteList: React.FC<IProps> = ({ notes }) => {
  return (
    <Box w={'80%'}>
      {notes.map((note, index) => (
        <NotePreview key={index} note={note} />
      ))}
    </Box>
  );
};

export default NoteList;
