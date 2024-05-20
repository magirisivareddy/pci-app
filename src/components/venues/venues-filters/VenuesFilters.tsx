"use client"
import React, { useState } from 'react'
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppSelector } from '@/redux/hooks';

// Function to get the default date range for the current week




const VenuesFilters = ({ handelSubmit, formData, onChange, handleClear }: any) => {
    const { venueDropdown, inspectorDropdown, employeeInfo } = useAppSelector(state => state.common)
    const roles = employeeInfo?.role?.split(",").map((role: string) => role?.trim());
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const updatedVenueDropdown = [{ label: "All", value: "All" }, ...venueDropdown ?? []];
    const updatedInspectorsDropdown = [{ label: "All", value: "All" }, ...inspectorDropdown ?? []];

    return (<>

        <Grid container spacing={2} mb={2} pr={2}>
            <Grid item xs={12} md={5}>
                <SelectInput
                    selectedOption={formData.venueId}
                    onChange={onChange}
                    label={'Venue'}
                    options={updatedVenueDropdown}
                    name={'venueId'}
                    id={'venueId'} size={'small'} />
            </Grid>
            <Grid item xs={12} md={5}>
                <SelectInput
                    selectedOption={formData.inspectorEmployeeNumber}
                    onChange={onChange}
                    label={'Inspector'}
                    options={updatedInspectorsDropdown}
                    name={'inspectorEmployeeNumber'}
                    id={'inspectorEmployeeNumber'} size={'small'}
                    disabled={!roles?.includes("Admin") && !roles?.includes("Audit") && !roles?.includes("IT")}
                    />
            </Grid>
            <Grid item xs={12} md={2}>
                <Button onClick={handleClear} sx={{ marginTop: "22px", marginRight: "3px", width: isDesktop ? "auto" : "100%", padding: "6px 16px " }} variant='outlined'>Clear</Button>
                <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
            </Grid>
        </Grid>
    </>

    )
}

export default VenuesFilters