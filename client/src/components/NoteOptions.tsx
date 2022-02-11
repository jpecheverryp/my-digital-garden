import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

const NoteOptions = () => {
  return (
    <Flex>
      <Button colorScheme={'blue'} mr={2}>
        EDIT
      </Button>
      <Button colorScheme={'red'}>Delete</Button>
    </Flex>
  );
};

export default NoteOptions;
