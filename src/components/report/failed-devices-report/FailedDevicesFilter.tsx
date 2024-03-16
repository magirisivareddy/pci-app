"use client"
import React, { useState } from 'react'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppSelector } from '@/redux/hooks';

// Function to get the default date range for the current week

const FailedDevicesFilter = ({handelSubmit, formData, onChange, failedDevicesData }: any) => {
    const {venueDropdown, inspectorDropdown}=useAppSelector(state=>state.common)
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const updatedVenueDropdown = [{ label: "All", value: "All" }, ...venueDropdown];
    const updatedInspectorsDropdown = [{ label: "All", value: "All" }, ...inspectorDropdown];
    const handleExport = () => {
        const header = [
            'Device Id',
            'Venue Name',
            'Device Name',
            'Device Location',
            'Device Type',
            'Notes',
            'Device Status',
            'Inspection Actual Date',
            'Inspector',
            'Inspection Type'
        ];
        const body: (string | undefined)[][] = failedDevicesData.map((device: any) => [
            device.deviceId,
            device.venueName,
            device.deviceName,
            device.deviceLocation,
            device.deviceType,
            device.notes,
            device.deviceStatus,
            device.inspectionActualDate,
            device.inspector,
            device.inspectionType
        ]);

        const csvData = [header, ...body];
        const csvFileName = 'Failed-devices-report.csv';

        const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', csvFileName);


        document.body.appendChild(link);
        link.click();
    };

    return (<>
        <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>

            <Button onClick={handleExport} size="small" variant="outlined">
                Export to Excel
            </Button>
        </Box>
        <Grid container spacing={2} mb={2} pr={2}>
            <Grid item xs={12} md={5.5}>
                <SelectInput
                    selectedOption={formData.venueId}
                    onChange={onChange}
                    label={'Venue'}
                    options={updatedVenueDropdown}
                    name={'venueId'}
                    id={'venueId'}
                    size={'small'} />
            </Grid>
            <Grid item xs={12} md={5.5}>
                <SelectInput
                    selectedOption={formData.inspectorId}
                    onChange={onChange}
                    label={'Inspector'}
                    options={updatedInspectorsDropdown}
                    name={'inspectorId'}
                    id={'inspectorId'}
                    size={'small'} />
            </Grid>
            <Grid item xs={12} md={1}>
                <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
            </Grid>
        </Grid>
    </>

    )
}


export default FailedDevicesFilter