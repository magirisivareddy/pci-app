import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, useTheme } from "@mui/material";
import React from "react";
import { setModalInspectOpen } from '@/redux/features/ModalSlice';
import { useAppDispatch } from "@/redux/hooks";
import { updateRow } from "@/redux/features/InspectionsSlice";
import DeviceActions from "@/components/devices/devices-table/DeviceActions";
import StatusCell from "@/components/inspections/devices-table/StatusCell";
import NotesCell from "@/components/inspections/devices-table/NotesCell";



type Header = {
    id: string;
    label: string;
    customRender?: (_value: any, row: any) => JSX.Element;
};

export const inspectionDeviceHeader: Header[] = [
    { id: 'commonAssetName', label: 'Device', },
    { id: 'serialNumber', label: 'Serial' },
    { id: 'deviceLocation', label: 'Location' },
    {
        id: 'status', label: 'Status', customRender: (value: any, row: any) => <StatusCell row={row} />
    },
    {
        id: 'notes', label: 'Notes', customRender: (value: any, row: any) => <NotesCell row={row}/>
    },
];

export const devicesHeader: Header[] = [
    { id: 'commonAssetName', label: 'Common Asset Name', },
    { id: 'model', label: 'Model' },
    { id: 'assetSerial', label: 'Asset Serial' },
    { id: 'terminalID', label: 'Terminal ID / Profile Id' },
    { id: 'ipAddress', label: 'IP Address /Slot' },
    { id: 'assignedVenue', label: 'Assigned Venue' },
    { id: 'location', label: 'Location' },
    {
        id: 'action', label: 'Action', customRender: (_: any, row: any) => (
            <DeviceActions row={row} />
        )
    },
]
