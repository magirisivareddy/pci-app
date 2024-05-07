import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput'
import { useAppSelector } from '@/redux/hooks';
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import * as XLSX from 'xlsx';

const VenueStatusFilter = ({ handelSubmit, formData, onChange, venueStatusReportData,onClear }: any) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const {venueDropdown} =useAppSelector(state=>state.common)

    const updatedVenueDropdown = [{ label: "All", value: "All" }, ...venueDropdown??[]];

    const handleExport = () => {
        const header = [
            'Device Id',
            'Venue Name',
            'Device Name',
            'Device Location',
            // 'Device Type',
            'Notes',
            'Device Status',
            'Inspection Actual Date',
            'Inspector',
            // 'Inspection Type'
        ];
        const body = venueStatusReportData.map((venue: any) => [
            venue.deviceId,
            venue.venueName,
            venue.deviceName,
            venue.deviceLocation,
            // venue.deviceType,
            venue.notes,
            venue.deviceStatus,
            venue.inspectionActualDate,
            venue.inspector,
            // venue.inspectionType
        ]);
    
        const data = [header, ...body];
        const ws = XLSX.utils.aoa_to_sheet(data);
    
        // Make header row bold
        const headerStyle = { font: { bold: true } };
        for (let col = 0; col < header.length; col++) {
          const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
          if (!ws[cellRef].s) ws[cellRef].s = {};
          Object.assign(ws[cellRef].s, headerStyle); // Apply bold style
        }
    
        // Set fixed width for columns
        const colWidths = [ // Adjust column widths as needed
          { wpx: 200 },
          { wpx: 200 },
          { wpx: 200 },
          { wpx: 200 },
          { wpx: 200 },
          { wpx: 200 },
          { wpx: 200 },
          { wpx: 200 },
          { wpx: 200 },
          { wpx: 200 },
    
    
        ];
        ws['!cols'] = colWidths;
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Devices');
    
        const currentDate = new Date();
        const timestamp = currentDate.toISOString().replace(/[-:T.]/g, '').slice(0, 14); // Get timestamp in format YYYYMMDDHHmmss
        const fileName = `Venue_Status_Report${timestamp}.xls`;
    
        XLSX.writeFile(wb, fileName);
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