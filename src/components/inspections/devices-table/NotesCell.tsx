import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateRow } from '@/redux/features/InspectionsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import TextField from '@mui/material/TextField';
;

const NotesCell = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const [note, setNote]=useState(row.notes)
    useEffect(()=>{
        dispatch(updateRow({ inspectedId: row.inspectedId, notes:row.notes }));
    })
  
    const theme = createTheme(); // Use createTheme to get access to breakpoints
    const xs = theme.breakpoints.down('xs');
    const { devices, selectedInspectorType } = useAppSelector(state => state.Inspections)
    console.log("selectedInspectorType",selectedInspectorType)
    const device = devices.find(device => device.inspectedId === row.inspectedId);
    const handleNotesChange = (event: any) => {
        setNote(event.target.value)
        dispatch(updateRow({ inspectedId: row.inspectedId, notes: event.target.value }));
    }
    return (
        <>
            <TextField
                multiline
                disabled={selectedInspectorType === "View"}
                sx={{
                    width: xs ? "200px" : "100%",
                }}
                size="small"
                name={"notes"}
                rows={4}
                variant="outlined"
                 value={note}
                onChange={handleNotesChange}
            />
        </>

    );
}

export default NotesCell;
