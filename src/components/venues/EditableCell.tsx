import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface EditableCellProps {
  onEdit: () => void; // Callback function for the edit action
}

const EditableCell: React.FC<EditableCellProps> = ({ onEdit }) => {
  return (

    <IconButton onClick={onEdit} sx={{padding:0}}>
      <EditIcon />
    </IconButton>
  );
};

export default EditableCell;
