import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'

import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

import { useAppDispatch } from '@/redux/hooks';
import "./DeleteVenue.css"
import { setDeleteInspectorModal, setSelectedGroupInspectors } from '@/redux/features/GroupInspectorsSlice';



const InspectorDelete = ({ row }: any) => {
    const dispatch = useAppDispatch();
  
    const onDelete = () => {
        dispatch(setSelectedGroupInspectors(row))
        dispatch(setDeleteInspectorModal(true))
    }
    return (
        <Box display={'flex'} justifyContent="center" gap={'10px'}>
            <Tooltip color='primary' title="Delete Inspector">
                <IconButton onClick={onDelete} sx={{ padding: 0 }}>
                    <RemoveCircleRoundedIcon color='warning' fontSize='medium' />
                </IconButton>
            </Tooltip>
        </Box>
    )
}


export default InspectorDelete

