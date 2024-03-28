import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateRow } from '@/redux/features/InspectionsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { format, parseISO } from 'date-fns';
;

const NotesCell = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const [note, setNote] = useState(row?.notes)
    const [resolution, setResolution] = useState(row?.resolution)
    const { devices, selectedInspectorType } = useAppSelector(state => state.Inspections)
    const theme = createTheme(); // Use createTheme to get access to breakpoints
    const xs = theme.breakpoints.down('xs');
    useEffect(() => {
        if (selectedInspectorType === "Inspect") {
            dispatch(updateRow({ deviceId: row.deviceId, notes: row.notes }));
        } else {
            dispatch(updateRow({ inspectedId: row.inspectedId, notes: row.notes }));
        }
    }, [])
    const device = devices.find(device => device.inspectedId === row.inspectedId);
    const handleNotesChange = (event: any) => {
        setNote(event.target.value)
        if (selectedInspectorType === "Inspect") {
            dispatch(updateRow({ deviceId: row.deviceId, notes: event.target.value }));

        } else {

            dispatch(updateRow({ inspectedId: row.inspectedId, notes: event.target.value }));
        }

    }
    const handleResolutionChange = (event: any) => {
        setResolution(event.target.value)
        dispatch(updateRow({ inspectedId: row.inspectedId, resolution: event.target.value }));
    }
    const removeBrTag = (formattedDatetime: any) => {
        const parts = formattedDatetime.split('<br>');
        return parts.map((part:any, index:any) => (
            <React.Fragment key={index}>
                {part}
                {index < parts.length - 1 && <br />} {/* Add newline after each part except the last one */}
            </React.Fragment>
        ));
    };
    return (
        <>
            {selectedInspectorType === "Edit" ? <>
                <p> {note}</p>
                {device?.status !== 1 && <FormControl>
                    {row?.formattedDatetime ? <span style={{ marginBottom: "5px" }}><b>{row?.formattedDatetime && removeBrTag(row.formattedDatetime)}</b> </span> : <label style={{
                        color: "rgba(0, 0, 0, 0.8)",
                        fontWeight: "600",
                        fontSize: " 0.6428571428571428rem",
                        lineHeight: "1.66",
                        textAlign: "left",
                        marginTop: "3px",
                        marginLeft: "13px"
                    }}>Resolution:</label>}

                    <TextField
                        multiline

                        sx={{
                            width: xs ? "200px" : "100%",
                        }}
                        size="small"
                        name={"resolution"}
                        rows={4}
                        variant="outlined"
                        value={resolution}
                        onChange={handleResolutionChange}
                    />  </FormControl>}
            </>
                : <TextField
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
                />}

        </>

    );
}

export default NotesCell;
