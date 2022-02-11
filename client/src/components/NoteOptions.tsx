import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { redirectTo } from '../utils/redirectTo';

const NoteOptions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();
  const params = useParams();
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const url = `/note/${params.id}/edit`;
    redirectTo(navigate, url);
  };

  const confirmDelete = () => {
    const noteId = params.id;
    console.log(noteId);
  };
  return (
    <Box>
      <Flex justifyContent={'end'}>
        <Button onClick={handleEdit} colorScheme={'blue'} mr={2}>
          EDIT
        </Button>
        <Button onClick={onOpen} colorScheme={'red'}>
          Delete
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Note Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this note?
            <br /> This action will be permanent.
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} colorScheme={'red'}>
              DELETE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NoteOptions;
