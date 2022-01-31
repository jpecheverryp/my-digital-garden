import React from 'react';

interface IProps {
  note: {
    note_name: string;
    created_at: Date;
  };
}

const NotePreview: React.FC<IProps> = ({ note }) => {
  return <div className='note-preview'>{note.note_name}</div>;
};

export default NotePreview;
