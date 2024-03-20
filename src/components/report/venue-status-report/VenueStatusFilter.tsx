import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput'
import { useAppSelector } from '@/redux/hooks';
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'

const VenueStatusFilter = ({ handelSubmit, formData, onChange, venueStatusReportData,onClear }: any) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const {venueDropdown} =useAppSelector(state=>state.common)
  console.log("venueDropdown",venueDropdown)
    const updatedVenueDropdown = [{ label: "All", value: "All" }, ...venueDropdown??[]];
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
        const body: (string | undefined)[][] = venueStatusReportData.map((venue: any) => [
            venue.deviceId,
            venue.venueName,
            venue.deviceName,
            venue.deviceLocation,
            venue.deviceType,
            venue.notes,
            venue.deviceStatus,
            venue.inspectionActualDate,
            venue.inspector,
            venue.inspectionType
        ]);

        const csvData = [header, ...body];
        const csvFileName = 'VenueStatusReportData.csv';

        const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', csvFileName);


        document.body.appendChild(link);
        link.click();
    };
    return (

        <>

            <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>

                <Button onClick={handleExport} size="small" variant="outlined">
                    Export to Excel
                </Button>
            </Box>
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
                    <TextInput
                        label={"Location"}
                        onChange={onChange}
                        defaultValue={formData.deviceLocation}
                        name={"deviceLocation"}
                        id={"deviceLocation"}
                    />
                </Grid>
                <Grid item xs={12} md={2} sx={{display:"flex",gap:"5px"}}>
                <Button onClick={onClear} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%", padding: "6px 16px "  }} variant='outlined'>Clear</Button>
                    <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default VenueStatusFilter