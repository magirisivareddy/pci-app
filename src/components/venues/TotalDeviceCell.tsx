import { setSelectedVenueInspector, setTotalDeviceModal } from '@/redux/features/VenuesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { Chip } from '@mui/material'
import React from 'react'

const TotalDeviceCell = ({ row }: any) => {
    const dispatch =useAppDispatch()
    const handleClick = () => {
        dispatch(setTotalDeviceModal(true))
        dispatch(setSelectedVenueInspector(row))
    }
    return (
        <Chip sx={{ cursor: "pointer" }} label={row.totalDevices} variant="outlined" onClick={handleClick} />
    )
}

export default TotalDeviceCell