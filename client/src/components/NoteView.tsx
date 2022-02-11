import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Container } from '@chakra-ui/react';
import { getAccessToken } from '../utils/cookiesHandler';
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
        console.log(data);
        setNoteData({
          ...noteData,
          id: data.id,
          title: data.title,
          text: data.text,
          createdAt: data.createdAt,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Heading>{noteData.title}</Heading>
      <Container>{noteData.text}</Container>
    </div>
  );
};

export default NoteView;
