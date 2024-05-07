import { deleteDevice, deleteVenue, deleteVenueInspector } from '@/actions/api'
import Loading from '@/app/loading'
import { getInspectors, getVenue } from '@/redux/features/CommonSlice'
import { getDevices, setDeleteDeviceModal } from '@/redux/features/DevicesSlice'
import { getVenues, setDeletInspectionModal } from '@/redux/features/VenuesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeviceDeleteModal = () => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isloading, setLoading] = useState(false)
    const { deviceSelectedFormData , formData} = useAppSelector(state => state.devices)

    const onDeleteVenue = async () => {
        const  employeeNumber= "3752";
        try {
            setLoading(true)
            const res = await deleteDevice(deviceSelectedFormData?.deviceId,employeeNumber)
            setMessage(res.message)
      
            setLoading(false)
            setTimeout(() => {
                setMessage("")
                dispatch(setDeleteDeviceModal(false))
                const obj = {
                    "is_It": "1",
                    "venueId": "All",
                    "commonAssetName": formData?.commonAssetName??"",
                    "serialNumber": formData?.serialNumber??"",
                    "assetNumber":formData?.assetNumber?? "",
                    "terminalId":formData?.terminalId?? "",
                    "profileId": formData?.profileId??"",
                    "employeeNumber": "3752"
                  }
                  dispatch(getDevices(obj))
             
            }, 3000)

        } catch (error: any) {
            setLoading(false)
            setErrorMessage(error.message ?? "something went wrong ")
        }
    }
    const onClose = () => {
        dispatch(setDeleteDeviceModal(false))
    }
    return (
        <div>
              {isloading && <Loading/>}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="body1">
                    Are you sure you want to delete this device?
                </Typography>
                <Box display="flex" gap={2} mt={2} justifyContent="center">
                    <Button variant="outlined" onClick={onDeleteVenue}>Yes</Button>
                    <Button variant="outlined" onClick={onClose}>No</Button>
                </Box>
            </Box>
            {message && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                {message}
            </Alert>}

            {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                {errorMessage}
            </Alert>}
        </div>
    )
}


export default DeviceDeleteModal