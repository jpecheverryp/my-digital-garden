import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { redirectTo } from '../utils/redirectTo';
import NoteView from './NoteView';

interface IProps {
  note: {
    id: number;
    note_name: string;
    created_at: Date;
  };
}

const NotePreview: React.FC<IProps> = ({ note }) => {
  let navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    redirectTo(navigate, '/note/' + note.id);
  };
  return (
    <div id={'note-' + note.id} className='note-preview' onClick={handleClick}>
      {note.note_name} - Created At: {note.created_at.getDate()}/
      {note.created_at.getMonth() + 1}/{note.created_at.getFullYear() - 2000}
    </div>
  );
};

export default NotePreview;
