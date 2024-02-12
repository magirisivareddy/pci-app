import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React from "react";
import { setModalInspectOpen } from '@/redux/features/ModalSlice';
import { useAppDispatch } from "@/redux/hooks";
import { updateRow } from "@/redux/features/inspectSlice";

type Header = {
    id: string;
    label: string;
    customRender?: (_value: any, row: any) => JSX.Element;
};
export const inspectionsTableHeaders: Header[] = [
    {
        id: 'status',
        label: 'Status',
        customRender: (value: any, row: any): JSX.Element => (
            <span>{row.status === 'Active' ? 'Active' : 'Inactive'}</span>
        )
    },
    { id: 'reportDate', label: 'Report Date' },
    { id: 'weekNumber', label: 'Week' },
    { id: 'venue', label: 'Venue' },
    { id: 'inspectorEmployeeNumber', label: 'Employee Number' },
    { id: 'totalDevices', label: 'Total Devices' },
    { id: 'totalQuestionableDevices', label: 'Total Questionable Devices' },
    { id: 'totalFailedDevices', label: 'Total Failed Devices' },
    {
        id: 'inspect', label: 'Inspect', customRender: (value: any, row: any): JSX.Element => {

            const handleInspectClick = (row: any) => {
                console.log("row", row)
                // dispatch(setSelectedRow(row));
                dispatch(setModalInspectOpen(true));
            };
            const dispatch = useAppDispatch(); // Use the useAppDispatch hook here
            return (
                <Button size="small" variant="outlined" onClick={() => handleInspectClick(row)}>
                    Inspect
                </Button>
            );
        }
    },
];
export const inspectionDeviceHeader: Header[] = [
    { id: 'device', label: 'Device', },
    { id: 'serial', label: 'Serial' },
    { id: 'location', label: 'Location' },
    {
        id: 'status', label: 'Status', customRender: (value: any, row: any): JSX.Element => {
            return (
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={row.status}
                        name="status"

                    >
                        <FormControlLabel value="pass" control={<Radio />} label="Pass" />
                        <FormControlLabel value="fail" control={<Radio />} label="Fail" />
                        <FormControlLabel value="Questionable" control={<Radio />} label="Questionable" />
                    </RadioGroup>
                </FormControl>
            );
        }
    },
    {
        id: 'notes', label: 'Notes', customRender: (value: any, row: any): JSX.Element => {
            const dispatch = useAppDispatch(); // Use the useAppDispatch hook here
            const handleNotesChange = (event: any) => {
                //dispatch(updateRow({ id: row.id, status: event.target.value }));
            }
            return (
                <TextField
                    multiline
                    size="small"
                    name={"notes"}
                    rows={4}  // You can adjust the number of rows as needed
                    variant="outlined"  // You can use 'filled', 'outlined', or 'standard'
                    onChange={handleNotesChange}
                />
            );
        }
    },
];
