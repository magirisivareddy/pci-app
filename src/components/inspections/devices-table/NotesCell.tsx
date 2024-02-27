import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateRow } from '@/redux/features/InspectionsSlice';
import { useAppDispatch } from '@/redux/hooks';
import TextField from '@mui/material/TextField';
import React from 'react';

const NotesCell = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const theme = createTheme(); // Use createTheme to get access to breakpoints
    const xs = theme.breakpoints.down('xs');

    const handleNotesChange = (event: any) => {
        dispatch(updateRow({ id: row.deviceId, notes: event.target.value }));
    }

    return (
        <TextField
            multiline
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
