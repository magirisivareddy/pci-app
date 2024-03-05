import React, { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateRow } from '@/redux/features/InspectionsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import TextField from '@mui/material/TextField';
;

const NotesCell = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const theme = createTheme(); // Use createTheme to get access to breakpoints
    const xs = theme.breakpoints.down('xs');
    const { devices } = useAppSelector(state => state.Inspections)
    const device = devices.find(device => device.deviceId === row.deviceId);
    const handleNotesChange = (event: any) => {
        dispatch(updateRow({ deviceId: row.deviceId, notes: event.target.value }));
    }

    return (
        <TextField
            multiline
            // disabled={device?.status === "pass"}
            sx={{
                width: xs ? "200px" : "100%",
            }}
            size="small"
            name={"notes"}
            rows={4}
            variant="outlined"
            onChange={handleNotesChange}
        />
    );
}

export default NotesCell;
