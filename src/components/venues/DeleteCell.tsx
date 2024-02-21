import React from 'react';
import {  IconButton } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

interface DeleteCellProps {
  onDelete: () => void; // Callback function for the delete action
}

const DeleteCell: React.FC<DeleteCellProps> = ({ onDelete }) => {
  return (

      <IconButton onClick={onDelete} sx={{padding:0}}>
        <RemoveCircleRoundedIcon color='warning' fontSize='small' />
      </IconButton>

  );
};

export default DeleteCell;
