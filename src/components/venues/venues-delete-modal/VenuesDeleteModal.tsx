import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Alert, Box, Button, Typography } from '@mui/material';
import { deleteVenue } from '@/actions/api';
import { getVenues, setDeletVenueModal, setVenuesDeletMessage } from '@/redux/features/VenuesSlice';
import Loading from '@/app/loading';
import { getInspectors, getVenue } from '@/redux/features/CommonSlice';

const VenuesDeleteModal = () => {
    const dispatch =useAppDispatch()
    const { employeeInfo } = useAppSelector(state => state.common)
    const [errorMessage, setErrorMessage] = useState("")
    const [isloading, setLoading] = useState(false)
    const { selectedVenueRow } = useAppSelector(state => state.Venues.venueInfo);
    const isDevices = selectedVenueRow.totalDevices !== 0;
    const employeeNumber = employeeInfo?.employeeNumber;
    const venue_id =selectedVenueRow.venue_id.toString()
    const {venuesDeletMessage}=useAppSelector(state=>state.Venues.venueInfo)

    const onDeleteVenue = async () => {

        try {
            setLoading(true)
            const res = await deleteVenue(employeeNumber, venue_id)
            dispatch(setVenuesDeletMessage(res.message))
            dispatch(getVenue())
            dispatch(getInspectors())
            setLoading(false)
            setTimeout(() => {
                dispatch(setDeletVenueModal(false))
                dispatch(setVenuesDeletMessage(""))
                const obj = {
                    "employeeNumber":employeeNumber,
                    "is_it": "1",
                    "adminLevel": "1",
                    "inspectorType": "1",
                    "venueId": "All",
                    "inspectorEmployeeNumber": "All"
                }
        
                dispatch(getVenues(obj))
            }, 3000)

        } catch (error: any) {
            setLoading(false)
            dispatch(setVenuesDeletMessage(""))
            setErrorMessage(error.message ?? "something went wrong ")
        }
    }
    const onClose=()=>{
        dispatch(setDeletVenueModal(false)) 
    }
    const renderContent = () => {
        if (isDevices) {
            return <Typography variant="body1">A venue cannot be deleted until you have removed/transferred all its associated devices from it.</Typography>;
        } else {
            return <Typography variant="body1">Are you sure you want to delete this venue?</Typography>;
        }
    };

    const renderButtons = () => {
        if (isDevices) {
            return <Button variant="outlined" onClick={onClose}>Okay</Button>;
        } else {
            return (
                <>
                    <Button variant="outlined" onClick={onDeleteVenue}>Yes</Button>
                    <Button variant="outlined" onClick={onClose}>No</Button>
                </>
            );
        }
    };

    return (
        <div>
            {isloading && <Loading/>}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                {renderContent()}

                <Box display="flex" gap={2} mt={2} justifyContent="center">
                    {renderButtons()}
                </Box>
                {venuesDeletMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                    {venuesDeletMessage}
                </Alert>}

                {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                    {errorMessage}
                </Alert>}
            </Box>
        </div>
    );
};

export default VenuesDeleteModal;
