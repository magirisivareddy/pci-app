import { addUpdateVenue } from '@/actions/api'
import TextInput from '@/components/common/input/Input'
import { getVenues, setAddOrEditVenueModal } from '@/redux/features/VenuesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { Alert, Button, Grid } from '@mui/material'
import React, { useState } from 'react'

const AddUpdateVenue = ({ selectedRow, modalType }: any) => {
    const dispatch = useAppDispatch()
    const [venue_name, setVenueName] = useState(selectedRow?.venue_name ?? "")
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const onChange = (value: any) => {
        setVenueName(value)
    }
    const onAddUpdateVenue = async () => {
        const obj = {
            venueId: (selectedRow?.venue_id ?? 0).toString(),
            venueName: venue_name,
            employeeNumber: "789"
        }
        try {
            const res = await addUpdateVenue(obj)
            setMessage(res.message)
            setTimeout(() => {
                setMessage("")
                dispatch(setAddOrEditVenueModal(false))
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
    return (
        <Grid container spacing={2} mb={2} pr={2}>
            <Grid item xs={12} md={9}>
                <TextInput label={"Venue Name"} onChange={onChange} defaultValue={venue_name} name={"venue_name"} id={"venue_name"} />
            </Grid>
            <Grid item xs={12} md={3}>
                <Button onClick={onAddUpdateVenue} sx={{ marginTop: "22px" }} variant='contained'>{modalType === "Edit" ? "Update Venue" : "Add Venue"}</Button>
            </Grid>
            <Grid item xs={12} md={12}>
                {message && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                    {message}
                </Alert>}

                {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                    {errorMessage}
                </Alert>}
            </Grid>
        </Grid>
    )
}

export default AddUpdateVenue