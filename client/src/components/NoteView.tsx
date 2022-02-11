import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Container } from '@chakra-ui/react';
const NoteView = () => {
  const params = useParams();
  const [noteData, setNoteData] = useState({
    id: '',
    title: '',
    text: '',
    createdAt: '',
  });
  const url = '/api/notes/' + params.id;

  useEffect(() => {
    axios
      .get(url)
      .then((data) => setNoteData(data.data))
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
