import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from '@/redux/hooks';
import { setDeleteInspectorModal, setInspectorModal, setSelectedGroupInspectors } from '@/redux/features/groupInspectorsSlice';



const ActionInspectors = ({ row }: any) => {
    const dispatch = useAppDispatch();
  
    const onDelete = () => {
        dispatch(setSelectedGroupInspectors(row))
        dispatch(setDeleteInspectorModal(true))
    }
    return (
        <Box display={'flex'} gap={'10px'}>
            <Tooltip color='primary' title="Delete Inspector">
                <IconButton onClick={onDelete} sx={{ padding: 0 }}>
                    <DeleteOutlineIcon color='primary' fontSize='medium' />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default ActionInspectors

