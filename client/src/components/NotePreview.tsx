import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { redirectTo } from '../utils/redirectTo';
import NoteView from './NoteView';

interface IProps {
  note: {
    id: number;
    note_name: string;
    created_at: Date;
  };
}

const NotePreview: React.FC<IProps> = ({ note }) => {
  let navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    redirectTo(navigate, '/note/' + note.id);
  };
  return (
    <Button
      id={'note-' + note.id}
      onClick={handleClick}
      d={'block'}
      w={'100%'}
      mb={3}
      bg={'gray.300'}
      borderRadius={'10px'}
      textAlign={'left'}
    >
      {note.note_name} - Created At: {note.created_at.getDate()}/
      {note.created_at.getMonth() + 1}/{note.created_at.getFullYear() - 2000}
    </Button>
  );
};

export default NotePreview;
