import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, useTheme } from "@mui/material";
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
                 dispatch(setSelectedRow(row));
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
    { id: 'commonAssetName', label: 'Device', },
    { id: 'serialNumber', label: 'Serial' },
    { id: 'deviceLocation', label: 'Location' },
    {
        id: 'status', label: 'Status', customRender: (value: any, row: any): JSX.Element => {
            const dispatch = useAppDispatch(); // Use the useAppDispatch hook here
            const handleStatusChange = (event: any) => {
                console.log("row", row)
                dispatch(updateRow({ id: row.deviceId, status: event.target.value }));
            }
            return (
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={row.status}
                        name="status"
                        onChange={handleStatusChange}

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
            const theme = useTheme();
            const dispatch = useAppDispatch(); // Use the useAppDispatch hook here
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
    },
];

export const devicesHeader: Header[] =[
    { id: 'commonAssetName', label: 'Common Asset Name', },
    { id: 'model', label: 'Model' },
    { id: 'assetSerial', label: 'Asset Serial' },
    { id: 'terminalID', label: 'Terminal ID / Profile Id' },
    { id: 'ipAddress', label: 'IP Address /Slot' },
    { id: 'assignedVenue', label: 'Assigned Venue' },
    { id: 'location', label: 'Location' },
    { id: 'action', label: 'Action' },
]

function setSelectedRow(row: any): any {
    throw new Error("Function not implemented.");
}
