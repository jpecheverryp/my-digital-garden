import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { redirectTo } from '../utils/redirectTo';

const NoteOptions = () => {
  let navigate = useNavigate();
  const params = useParams();
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const url = `/note/${params.id}/edit`;
    redirectTo(navigate, url);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('hey');
  };
  return (
    <Flex>
      <Button onClick={handleEdit} colorScheme={'blue'} mr={2}>
        EDIT
      </Button>
      <Button onClick={handleDelete} colorScheme={'red'}>
        Delete
      </Button>
    </Flex>
  );
};

export default NoteOptions;
