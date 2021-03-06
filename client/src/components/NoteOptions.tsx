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
import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccessToken } from '../utils/cookiesHandler';
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
    const url = `/api/notes/${params.id}`;
    axios
      .delete(url, {
        headers: {
          'x-auth-token': 'Bearer ' + getAccessToken(),
        },
      })
      .then((data) => {
        redirectTo(navigate, '/');
      })
      .catch((err) => console.log(err.request));
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
