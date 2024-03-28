import { deleteVenue, deleteVenueInspector } from '@/actions/api'
import Loading from '@/app/loading'
import { getInspectors, getVenue } from '@/redux/features/CommonSlice'
import { getVenues, setDeletInspectionModal } from '@/redux/features/VenuesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

const InspectionDeleteModal = () => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isloading, setLoading] = useState(false)
    const { selectedVenueInspector, formData } = useAppSelector(state => state.Venues.venueInfo)

    const onDeleteVenue = async () => {
        const inspectorId = selectedVenueInspector?.inspectorId.toString()
        try {
            setLoading(true)
            const res = await deleteVenueInspector(inspectorId)
            setMessage(res.message)
      
            setLoading(false)
            setTimeout(() => {
                setMessage("")
                dispatch(setDeletInspectionModal(false))
                const obj = {
                    employeeNumber: "0004236",
                    is_it: "1",
                    adminLevel: "1",
                    inspectorType: "1",
                    venueId: formData.venueId.toString() ?? "All",
                    inspectorEmployeeNumber: formData.inspectorEmployeeNumber.toString() ?? "All"
                }

                dispatch(getVenues(obj))
            }, 3000)

        } catch (error: any) {
            setLoading(false)
            setErrorMessage(error.message ?? "something went wrong ")
        }
    }
    const onClose = () => {
        dispatch(setDeletInspectionModal(false))
    }
    return (
        <div>
              {isloading && <Loading/>}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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