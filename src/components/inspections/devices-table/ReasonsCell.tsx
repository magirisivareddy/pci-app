import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import React, { useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { updateRow } from '@/redux/features/InspectionsSlice';



const ReasonsCell = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const { devices } = useAppSelector(state => state.Inspections)
    const theme = createTheme(); // Use createTheme to get access to breakpoints
    const xs = theme.breakpoints.down('xs');
    const device = devices.find(device => device.deviceId === row.deviceId);
  
    const handleChange = (event: any) => {
        dispatch(updateRow({ deviceId: row.deviceId, reason: event.target.value }));
    }
 

    return (
        <FormControl sx={{
            width: xs ? "200px" : "100%",
        }} >
            <Select
                value={device?.reason ?? "Not Applicable"}
                onChange={handleChange}
                size='small'
                displayEmpty
                disabled={device?.status === "pass"}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value={"Not Applicable"}>Not Applicable</MenuItem>
                <MenuItem value={"Device present but not listed"}>Device present but not listed</MenuItem>
                <MenuItem value={"Device listed but not present"}>Device listed but not present</MenuItem>
                <MenuItem value={"Device serial no is incorrect"}>Device serial no is incorrect</MenuItem>
                <MenuItem value={"Device missing serial number label"}>Device missing serial number label</MenuItem>
                <MenuItem value={"Device serial number is unverifiable"}>Device serial number is unverifiable</MenuItem>
                <MenuItem value={"Device location in venue is incorrect"}>Device location in venue is incorrect</MenuItem>
                <MenuItem value={"Device evidence of tampering"}>Device evidence of tampering</MenuItem>
                <MenuItem value={"Device not found / A new device is missing"}>Device not found / A new device is missing</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
        </FormControl>
    );
}
export default ReasonsCell