import { addUpdateVenue } from '@/actions/api'
import Loading from '@/app/loading'
import TextInput from '@/components/common/input/Input'
import { getInspectors, getVenue } from '@/redux/features/CommonSlice'
import { clearVenueFilterFormData, getVenues, setAddOrEditVenueModal, setAddUpdateVenueErrorMessage, setAddUpdateVenueMessage, setVenueFilterFormData } from '@/redux/features/VenuesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AddUpdateVenue = ({ selectedRow, modalType, setSelectedRow }: any) => {
    const dispatch = useAppDispatch()
    const { employeeInfo } = useAppSelector(state => state.common)
    const [venue_name, setVenueName] = useState("");

    useEffect(() => {
        if (selectedRow) {
            setVenueName(selectedRow.venue_name)
        }
    }, [selectedRow])

    const [isloading, setLoading] = useState(false)
    const { addUpdateVenueErrorMessage, addUpdateVenueMessage, formData } = useAppSelector(state => state.Venues.venueInfo)
    const onChange = (value: any) => {
        setVenueName(value)
        dispatch(setAddUpdateVenueErrorMessage(""));
    }
    const onAddUpdateVenue = async () => {
        try {
            if (!venue_name.trim()) {
                dispatch(setAddUpdateVenueErrorMessage("Venue name cannot be empty"));
                return;
            }
            setSelectedRow(null)
            setLoading(true);
            const obj = {
                venueId: (selectedRow?.venue_id ?? 0).toString(),
                venueName: venue_name,
                employeeNumber: employeeInfo?.employeeNumber,
            };
            const res = await addUpdateVenue(obj);
            setVenueName(venue_name)
            if (res.validationMessage) {
                dispatch(setAddUpdateVenueErrorMessage(res.validationMessage));
                setLoading(false);
                setTimeout(() => {

                    dispatch(setAddUpdateVenueErrorMessage(""));
                }, 3000)
                return;
            }
            dispatch(setAddUpdateVenueMessage(res.message));
            setLoading(false);
            dispatch(getVenue());
            dispatch(getInspectors());
            setTimeout(() => {
                dispatch(setAddOrEditVenueModal(false));
                dispatch(setAddUpdateVenueMessage(null));
                const obj = {
                    employeeNumber: employeeInfo?.employeeNumber,
                    is_it:  employeeInfo?.role === "IT"?"1":"0",
                    adminLevel: "1",
                    inspectorType: "1",
                    venueId: formData.venueId.toString() ?? "All",
                    inspectorEmployeeNumber: formData.inspectorEmployeeNumber.toString() ?? "All"
                };
                dispatch(getVenues(obj));
            }, 3000);
        } catch (error: any) {
            setLoading(false);
            dispatch(setAddUpdateVenueErrorMessage(error.message ?? "Something went wrong"));
            setTimeout(() => {
                dispatch(setAddUpdateVenueErrorMessage(""));
            }, 3000)
        }
    }

    return (
        <Grid container spacing={2} mb={2} pr={2}>
            {isloading && <Loading />}
            <Grid item xs={12} md={9}>
                <TextInput label={"Venue Name"} onChange={onChange} defaultValue={venue_name} name={"venue_name"} id={"venue_name"} />
            </Grid>
            <Grid item xs={12} md={3}>
                <Button onClick={onAddUpdateVenue} sx={{ marginTop: "22px" }} variant='contained'>{modalType === "Edit" ? "Update Venue" : "Add Venue"}</Button>
            </Grid>
            <Grid item xs={12} md={12}>
                {addUpdateVenueMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                    {addUpdateVenueMessage}
                </Alert>}

                {addUpdateVenueErrorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                    {addUpdateVenueErrorMessage}
                </Alert>}
            </Grid>
        </Grid>
    )
}

export default AddUpdateVenue
