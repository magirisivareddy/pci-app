import { addVenueToGroupInspector } from '@/actions/api'
import Loading from '@/app/loading'
import SelectInput from '@/components/common/input/SelectInput'
import { getGroupInspectors, setAddVenuToInspectorModal, setdeleteVenuModal } from '@/redux/features/GroupInspectorsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Button, Grid } from '@mui/material'
import React, { Suspense, useState } from 'react'

const AddVenueToGroupInspector = ({ venues, }: any) => {
    const dispatch = useAppDispatch()
    const [venueId, setVenue] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { selectedGroupInspector } = useAppSelector(state => state.groupInspector.groupInspectorsInfo)

    const onChange = (val: any) => {
        setErrorMessage("")
        setVenue(val)
    }
    const addVenue = async () => {
        if (!venueId) {
            setErrorMessage("Venue cannot be empty");
            return;
        }
    
        const obj = {
            employeeNumber: selectedGroupInspector.employeeNumber.toString(),
            venueId: venueId.toString(),
            inspectorType: "1"
        };
    
        try {
            setLoading(true);
            const res = await addVenueToGroupInspector(obj);
            if (res?.validationMessage) {
                setErrorMessage(res.validationMessage);
                setLoading(false);
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000)
                return
            }
            setMessage(res.message);
    
            const payload = {
                venueId: 'All',
                inspectorEmployeeNumber: 'All',
                is_It: '1'
            };
    
            setLoading(false);
            setTimeout(() => {
                dispatch(setAddVenuToInspectorModal(false));
                setMessage("");
                dispatch(getGroupInspectors(payload));
            }, 2000);
        } catch (error:any) {
            setLoading(false);
            setErrorMessage(error.message ?? "Something went wrong");
        }
    };
    
    return (
        <div>
            {isLoading && <Loading />}
            <Grid container spacing={2} mb={2} pr={2}>
                <Grid item xs={12} md={9}>
                    <SelectInput
                        selectedOption={venueId}
                        onChange={onChange}
                        label={'Available Venues'}
                        options={venues}
                        name={'venue'}
                        id={'venue'}
                        size={'small'} />
                </Grid>
                <Grid item xs={12} md={3}>

                    <Button onClick={addVenue} sx={{ marginTop: "22px" }} variant='contained'> Add Venue</Button>

                </Grid>

                <Grid item xs={12} md={12}>
                    {message && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                        {message}
                    </Alert>}

                    {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                        {errorMessage}
                    </Alert>}
                </Grid>
            </Grid></div>
    )
}

export default AddVenueToGroupInspector