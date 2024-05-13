import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '@/redux/hooks';
import "./editableCell.css"

interface EditableCellProps {
  onEdit: () => void; // Callback function for the edit action
}

const EditableCell: React.FC<EditableCellProps> = ({ onEdit }) => {
  const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
  const isViewList = ["Inspector", "GroupInspector","BackupInspector","MainInspector"]

  return (
    <IconButton
      disabled={isViewList.includes(employeeInfo?.role)}
      onClick={onEdit}
 
      sx={{ padding: 0 }}>

      <EditIcon sx={{color:isViewList.includes(employeeInfo?.role) ? '#c8cfcf' : '#008c99'}} fontSize='small' />
    </IconButton>
  );
};

export default EditableCell;
