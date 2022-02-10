import React from 'react';
import { useParams } from 'react-router-dom';

const NoteView = () => {
  const params = useParams();
  console.log(params);

  return <div>Hello {params.id}</div>;
};

export default NoteView;
