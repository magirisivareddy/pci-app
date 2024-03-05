"use client"
import React, { useState } from 'react'
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';

// Function to get the default date range for the current week




const VenuesFilters = ({ dropdowns, handelSubmit, formData, onChange }: any) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const updatedVenueDropdown = [...dropdowns.venueDropdown, { label: "All", value: "All" }];
    const updatedInspectorsDropdown = [...dropdowns.inspectorsDropdown, { label: "All", value: "All" }];

    return (<>

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
                <SelectInput
                    selectedOption={formData.inspectorEmployeeNumber}
                    onChange={onChange}
                    label={'Inspector'}
                    options={updatedInspectorsDropdown}
                    name={'inspectorEmployeeNumber'}
                    id={'inspectorEmployeeNumber'} size={'small'} />
            </Grid>
            <Grid item xs={12} md={1}>
                <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
            </Grid>
        </Grid>

    </>


    )
}

export default VenuesFilters