import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '@/redux/hooks';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { setDeviceFormData, setDeviceHistoryInfo, setDeviceInfo } from '@/redux/features/devicesSlice';

const DeviceActions = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const onEdit = (event: any) => {
        dispatch(setDeviceInfo({
            isDeviceModal: true,
            deviceModalType: "Edit"
        }))
        dispatch(setDeviceFormData(row))
    }
    const onHistory=()=>{
        
        dispatch(setDeviceHistoryInfo(true))
        dispatch(setDeviceFormData(row))

    }
    return (
        <Box display={'flex'} gap={'5px'}>
            <Tooltip color='primary' title="Edit">
                <IconButton onClick={onEdit} sx={{ padding: 0 }}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>
            </Tooltip>
            <Tooltip color='primary' title="History">
                <IconButton onClick={onHistory} sx={{ padding: 0 }}>
                    <ManageHistoryIcon color='primary' fontSize='small' />
                </IconButton>
            </Tooltip>
        </Box>

    );
}

export default DeviceActions


