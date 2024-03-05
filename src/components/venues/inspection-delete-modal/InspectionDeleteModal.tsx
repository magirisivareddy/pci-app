import { deleteVenue, deleteVenueInspector } from '@/actions/api'
import { getVenues, setDeletInspectionModal } from '@/redux/features/VenuesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

const InspectionDeleteModal = () => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { selectedVenueInspector } = useAppSelector(state => state.Venues.venueInfo)
    console.log("selectedVenueInspector", selectedVenueInspector)
    const onDeleteVenue = async () => {
        const inspectorId = selectedVenueInspector?.inspectorId.toString()
        try {
            const res = await deleteVenueInspector(inspectorId)
            setMessage(res.message)
            setTimeout(() => {
                // dispatch(setDeletVenueModal(false))
                setMessage("")
                dispatch(setDeletInspectionModal(false))
                const obj = {
                    "employeeNumber": "0004236",
                    "is_it": "1",
                    "adminLevel": "1",
                    "inspectorType": "1",
                    "venueId": "All",
                    "inspectorEmployeeNumber": "All"
                }

                dispatch(getVenues(obj))
            }, 3000)

        } catch (error: any) {

            setErrorMessage(error.message ?? "something went wrong ")
        }
    }
    const onClose = () => {
        dispatch(setDeletInspectionModal(false))
    }
    return (
        <div>   <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">
                Are you sure you want to delete this inspector?
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

export default InspectionDeleteModal