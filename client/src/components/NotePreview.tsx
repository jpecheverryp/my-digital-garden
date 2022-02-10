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
    <Flex mb={3}>
      <Button
        id={'note-' + note.id}
        onClick={handleClick}
        d={'block'}
        w={'100%'}
        bg={'green.300'}
        borderRadius={'10px 0 0 10px'} // TopLeft, TopRight, BotRight, BotLeft
      >
        {note.note_name} - Created At: {note.created_at.getDate()}/
        {note.created_at.getMonth() + 1}/{note.created_at.getFullYear() - 2000}
      </Button>

      <Button bg={'red.300'} borderRadius={'0 10px 10px 0'}>
        D
      </Button>
    </Flex>
  );
};

export default NotePreview;
