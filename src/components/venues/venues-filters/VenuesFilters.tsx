"use client"
import React, { useState } from 'react'
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';

// Function to get the default date range for the current week



interface FormData {
    venue: string;
    inspector: string;
}
const VenuesFilters = ({ dropdowns }: any) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [formData, setFormData] = useState<FormData>({
        venue: 'All',
        inspector: 'All'
    });

    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handelSubmit = (event: any) => {

    }

    return (<>

        <Grid container spacing={2} mb={2} pr={2}>
            <Grid item xs={12} md={5.5}>
                <SelectInput
                    selectedOption={formData.venue}
                    onChange={onChange}
                    label={'Venue'}
                    options={dropdowns.venueDropdown}
                    name={'venue'}
                    id={'venue'} size={'small'}                />
            </Grid>
            <Grid item xs={12} md={5.5}>
                <SelectInput
                    selectedOption={formData.inspector}
                    onChange={onChange}
                    label={'Inspector'}
                    options={dropdowns.inspectorsDropdown}
                    name={'inspector'}
                    id={'inspector'} size={'small'} />
            </Grid>
            <Grid item xs={12} md={1}>
                <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
            </Grid>
        </Grid>

    </>


    )
}

export default VenuesFilters