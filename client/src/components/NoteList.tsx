import { Box } from '@chakra-ui/react';
import React from 'react';
import NotePreview from './NotePreview';

interface IProps {
  notes: {
    id: number;
    note_name: string;
    created_at: Date;
  }[];
}
const NoteList: React.FC<IProps> = ({ notes }) => {
  return (
    <Box>
      {notes.map((note, index) => (
        <NotePreview key={index} note={note} />
      ))}
    </Box>
  );
};

export default NoteList;
