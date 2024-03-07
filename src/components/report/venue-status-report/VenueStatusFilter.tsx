import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput'
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'

const VenueStatusFilter = ({ venueDropdown, handelSubmit, formData, onChange }: any) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const updatedVenueDropdown = [...venueDropdown, { label: "All", value: "All" }];

    return (
        <Grid container spacing={2} mb={2} pr={2}>
            <Grid item xs={12} md={5.5}>
                <SelectInput
                    selectedOption={formData.venueId}
                    onChange={onChange}
                    label={'Venue'}
                    options={updatedVenueDropdown}
                    name={'venueId'}
                    id={'venueId'} size={'small'} />
            </Grid>
            <Grid item xs={12} md={5.5}>
                <TextInput
                    label={"Location"}
                    onChange={onChange}
                    defaultValue={formData.deviceLocation}
                    name={"location"}
                    id={"location"}
                />
            </Grid>
            <Grid item xs={12} md={1}>
                <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
            </Grid>
        </Grid>
    )
}

export default VenueStatusFilter