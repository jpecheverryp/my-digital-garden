import React from 'react';

interface IProps {
  note: {
    note_name: string;
    created_at: Date;
  };
}

const NotePreview: React.FC<IProps> = ({ note }) => {
  return (
    <div className='note-preview'>
      {note.note_name} - Created At: {note.created_at.getDate()}/
      {note.created_at.getMonth() + 1}/{note.created_at.getFullYear() - 2000}
    </div>
  );
};

export default NotePreview;
