import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { setDeviceSelectedFormData, setDeviceHistoryInfo, setDeviceInfo, setDeleteDeviceModal } from '@/redux/features/DevicesSlice';

const DeviceActions = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
    const isViewList = ["Inspector", "GroupInspector","BackupInspector","MainInspector"]
    const onEdit = (event: any) => {
        dispatch(setDeviceInfo({
            isDeviceModal: true,
            deviceModalType: "Edit"
        }))

        dispatch(setDeviceSelectedFormData(row))
    }
    const onHistory = () => {
        dispatch(setDeviceHistoryInfo(true))
        dispatch(setDeviceSelectedFormData(row))

    }
    const onDelete = () => {
        dispatch(setDeviceSelectedFormData(row))
        dispatch(setDeleteDeviceModal(true))
    }
    return (
        <Box display={'flex'} gap={'5px'}>
            <Tooltip color='primary' title="Edit">
                <IconButton disabled={isViewList.includes(employeeInfo?.role)} onClick={onEdit} sx={{ padding: 0 }}>
                    <EditIcon sx={{color:isViewList.includes(employeeInfo?.role) ? '#c8cfcf' : '#008c99'}} fontSize='small' />
                </IconButton>
            </Tooltip>
            <Tooltip color='primary' title="delete device">
                {/* <IconButton
                    // onClick={onHistory}
                    sx={{ padding: 0 }}>
                    <ManageHistoryIcon color='primary' fontSize='small' />
                </IconButton> */}
                <IconButton disabled={isViewList.includes(employeeInfo?.role)} onClick={onDelete} sx={{ padding: 0 }}>
                    <RemoveCircleRoundedIcon sx={{ color: isViewList.includes(employeeInfo?.role) ? '#c8cfcf' : '#ed6c02' }} fontSize='small' />
                </IconButton>
            </Tooltip>
        </Box>

    );
}

export default DeviceActions


