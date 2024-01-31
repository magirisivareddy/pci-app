import React from 'react';
import {  IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteCellProps {
  onDelete: () => void; // Callback function for the delete action
}

const DeleteCell: React.FC<DeleteCellProps> = ({ onDelete }) => {
  return (

      <IconButton onClick={onDelete} sx={{padding:0}}>
        <DeleteIcon />
      </IconButton>

  );
};

export default DeleteCell;
