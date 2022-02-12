import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccessToken } from '../utils/cookiesHandler';
import { redirectTo } from '../utils/redirectTo';

const NoteEdit = () => {
  let navigate = useNavigate();
  const params = useParams();
  const getUrl = `/api/notes/${params.id}`;

  const [noteData, setNoteData] = useState({
    id: '',
    title: '',
    text: '',
    createdAt: '',
    isAuthor: false,
  });

  useEffect(() => {
    axios
      .get(getUrl, {
        headers: {
          'x-auth-token': 'Bearer ' + getAccessToken(),
        },
      })
      .then((response) => {
        const { data } = response;
        setNoteData({
          ...noteData,
          id: data.id,
          title: data.title,
          text: data.text,
          createdAt: data.createdAt,
          isAuthor: data.isAuthor,
        });
      })
      .catch((err) => {
        if (err.request.status === 404) {
          redirectTo(navigate, '/');
        }
        console.log(err);
      });
  }, [params.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNoteData({ ...noteData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleCancel = () => {
    redirectTo(navigate, `/note/${params.id}`);
  };
  const handleSave = () => {
    const submitData = {
      title: noteData.title,
      text: noteData.text,
    };
    const token = 'Bearer ' + getAccessToken();
    axios
      .put(getUrl, submitData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      })
      .then((data) => redirectTo(navigate, `/note/${params.id}`))
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      <Container>
        <form>
          <FormControl>
            <FormLabel>Title: </FormLabel>
            <Input
              name='title'
              onChange={handleInputChange}
              value={noteData.title}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Text: </FormLabel>
            <Textarea
              onChange={handleInputChange}
              name='text'
              value={noteData.text}
            />
          </FormControl>
          <Flex justifyContent={'end'} mt={4}>
            <Button mr={2} colorScheme={'gray'} onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} colorScheme={'green'}>
              Save
            </Button>
          </Flex>
        </form>
      </Container>
    </Box>
  );
};

export default NoteEdit;
