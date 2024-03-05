import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Alert, Box, Button, Typography } from '@mui/material';
import { deleteVenue } from '@/actions/api';
import { getVenues, setDeletVenueModal } from '@/redux/features/VenuesSlice';

const VenuesDeleteModal = () => {
    const dispatch =useAppDispatch()
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { selectedVenueRow } = useAppSelector(state => state.Venues.venueInfo);
    const isDevices = selectedVenueRow.totalDevices === 0;
    console.log("selectedVenueRow", selectedVenueRow.venue_id)
    const employeeNumber = "0004236";
    const venue_id =selectedVenueRow.venue_id.toString()
    const onDeleteVenue = async () => {

        try {
            const res = await deleteVenue(employeeNumber, venue_id)
            setMessage(res.message)
            setTimeout(() => {
                dispatch(setDeletVenueModal(false))
                setMessage("")
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
    const renderContent = () => {
        if (isDevices) {
            return <Typography variant="body1">A venue cannot be deleted until you have removed/transferred all its associated devices from it.</Typography>;
        } else {
            return <Typography variant="body1">Are you sure you want to delete this inspector?</Typography>;
        }
    };

    const renderButtons = () => {
        if (isDevices) {
            return <Button variant="outlined">Okay</Button>;
        } else {
            return (
                <>
                    <Button variant="outlined" onClick={onDeleteVenue}>Yes</Button>
                    <Button variant="outlined">No</Button>
                </>
            );
        }
    };

    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                {renderContent()}

                <Box display="flex" gap={2} mt={2} justifyContent="center">
                    {renderButtons()}
                </Box>
                {message && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                    {message}
                </Alert>}

                {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                    {errorMessage}
                </Alert>}
            </Box>
        </div>
    );
};

export default VenuesDeleteModal;