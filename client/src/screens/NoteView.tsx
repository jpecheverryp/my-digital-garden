import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heading, Container, Box } from '@chakra-ui/react';
import { getAccessToken } from '../utils/cookiesHandler';
import NoteOptions from '../components/NoteOptions';
import { redirectTo } from '../utils/redirectTo';
const NoteView = () => {
  let navigate = useNavigate();
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
      .catch((err) => {
        if (err.request.status === 404) {
          redirectTo(navigate, '/');
        }
        console.log(err);
      });
  }, [params.id]);

  return (
    <Box>
      {noteData.isAuthor ? <NoteOptions /> : <></>}
      <Container>
        <Heading>{noteData.title}</Heading>

        {noteData.text}
      </Container>
    </Box>
  );
};

export default NoteView;
