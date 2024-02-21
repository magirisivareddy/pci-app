import React from 'react'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useAppDispatch } from '@/redux/hooks';
import { setinspectorAdminDeleteModal } from '@/redux/features/inspectorAdminSlice';

const InspectorAdminDeleteCell = ({row}:any) => {
    const dispatch= useAppDispatch()
    const onDelete=()=>{
        dispatch(setinspectorAdminDeleteModal(true))
    }
  return (
    <div> <RemoveCircleRoundedIcon sx={{cursor:'pointer'}} onClick={onDelete} color='warning' /></div>
  )
}

export default InspectorAdminDeleteCell