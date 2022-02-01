import React from 'react';
import NotePreview from './NotePreview';

interface IProps {
  notes: {
    note_name: string;
    created_at: Date;
  }[];
}
const NoteList: React.FC<IProps> = ({ notes }) => {
  return (
    <div>
      {notes.map((note, index) => (
        <NotePreview key={index} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
