import { addVenueToGroupInspector } from '@/actions/api'
import SelectInput from '@/components/common/input/SelectInput'
import { getGroupInspectors, setAddVenuToInspectorModal, setdeleteVenuModal } from '@/redux/features/GroupInspectorsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Button, Grid } from '@mui/material'
import React, { useState } from 'react'

const AddVenueToGroupInspector = ({ venues, }: any) => {
    const dispatch = useAppDispatch()
    const [venueId, setVenue] = useState("All")
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { selectedGroupInspector } = useAppSelector(state => state.groupInspector.groupInspectorsInfo)

    const onChange = (val: any) => {
        setVenue(val)
    }
    console.log("venueId", venueId)

    const addVenue = async () => {
        console.log("selectedGroupInspector",selectedGroupInspector.employeeNumber)
        const obj = {
            employeeNumber: selectedGroupInspector.employeeNumber.toString(),
            venueId: venueId.toString(),
            inspectorType: "1"
        }
        try {
            const res: any = await addVenueToGroupInspector(obj)
            setMessage(res.message)
            const payload = {
                venueId: 'All',
                inspectorEmployeeNumber: 'All',
                is_It: '1'
            }
            setTimeout(() => {
                dispatch(setAddVenuToInspectorModal(false))
                setMessage("")
                dispatch(getGroupInspectors(payload))
            }, 3000)
        } catch (error: any) {
            setErrorMessage(error.message ?? "something went wrong ")
        }
    }
    return (
        <div>  <Grid container spacing={2} mb={2} pr={2}>
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