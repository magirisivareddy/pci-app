import React from 'react';
import { IconButton } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useAppSelector } from '@/redux/hooks';

interface DeleteCellProps {
  onDelete: () => void; // Callback function for the delete action
}

const DeleteCell: React.FC<DeleteCellProps> = ({ onDelete }) => {
  const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
  const isViewList = ["Inspector", "GroupInspector","BackupInspector","MainInspector","Audit"]
  const roles = employeeInfo?.role?.split(",").map((role: string) => role?.trim());
  return (

    <IconButton disabled={isViewList.includes(employeeInfo?.role)} onClick={onDelete} sx={{ padding: 0 }}>
      <RemoveCircleRoundedIcon sx={{ color: isViewList.includes(employeeInfo?.role) ? '#c8cfcf' : '#ed6c02' }} fontSize='small' />
    </IconButton>

  );
};

export default DeleteCell;
