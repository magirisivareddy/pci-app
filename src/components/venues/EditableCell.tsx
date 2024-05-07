import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '@/redux/hooks';
import "./editableCell.css"

interface EditableCellProps {
  onEdit: () => void; // Callback function for the edit action
}

const EditableCell: React.FC<EditableCellProps> = ({ onEdit }) => {
  const { userInfo } = useAppSelector((state: { common: any; }) => state.common)
  const isViewList = ["Inspector", "Group Inspector"]
  console.log("isViewList.includes(userInfo.role)",isViewList.includes(userInfo.role))
  return (
    <IconButton
      disabled={isViewList.includes(userInfo.role)}
      onClick={onEdit}
      // className={!isViewList.includes(userInfo.role) ? "sx-custom-button" : ""}
      sx={{ padding: 0 }}>

      <EditIcon sx={{color:isViewList.includes(userInfo.role) ? '#c8cfcf' : '#008c99'}} fontSize='small' />
    </IconButton>
  );
};

export default EditableCell;
