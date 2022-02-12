import { Box, Container } from '@chakra-ui/react';
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
    <Container maxW={'container.lg'}>
      {notes.map((note, index) => (
        <NotePreview key={index} note={note} />
      ))}
    </Container>
  );
};

export default NoteList;
