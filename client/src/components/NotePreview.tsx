import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../utils/dateFormat';
import { redirectTo } from '../utils/redirectTo';

interface IProps {
  note: {
    id: string;
    title: string;
    createdAt: string;
  };
}

const NotePreview: React.FC<IProps> = ({ note }) => {
  let navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    redirectTo(navigate, '/note/' + note.id);
  };
  const date = dateFormat(note.createdAt);
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
      {note.title} - Created At: {date}
    </Button>
  );
};

export default NotePreview;
