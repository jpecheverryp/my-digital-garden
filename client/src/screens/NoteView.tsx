import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Container, Box } from '@chakra-ui/react';
import { getAccessToken } from '../utils/cookiesHandler';
import NoteOptions from '../components/NoteOptions';
const NoteView = () => {
  const params = useParams();
  const [noteData, setNoteData] = useState({
    id: '',
    title: '',
    text: '',
    createdAt: '',
    isAuthor: false,
  });
  const url = '/api/notes/' + params.id;

  useEffect(() => {
    axios
      .get(url, {
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
      .catch((err) => console.log(err));
  }, [params.id]);

  return (
    <Box>
      {noteData.isAuthor ? <NoteOptions /> : <></>}
      <Heading>{noteData.title}</Heading>
      <Container>{noteData.text}</Container>
    </Box>
  );
};

export default NoteView;
