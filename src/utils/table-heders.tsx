import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, useTheme } from "@mui/material";
import React from "react";
import { setModalInspectOpen } from '@/redux/features/ModalSlice';
import { useAppDispatch } from "@/redux/hooks";
import { updateRow } from "@/redux/features/InspectionsSlice";
import DeviceActions from "@/components/devices/devices-table/DeviceActions";
import StatusCell from "@/components/inspections/devices-table/StatusCell";
import NotesCell from "@/components/inspections/devices-table/NotesCell";
import ReasonsCell from "@/components/inspections/devices-table/ReasonsCell";



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
        id: 'notes', label: 'Notes', customRender: (value: any, row: any) => <NotesCell row={row} />
    },
    {
        id: 'reason', label: 'Reason', customRender: (value: any, row: any) => <ReasonsCell row={row} />
    },
];


export const devicesHeader: Header[] = [
    { id: 'commonAssetName', label: 'Common Asset Name', },
    { id: 'modelNumber', label: 'Model' },
    {
        id: 'assetNumber', label: 'Asset / Serial', customRender: (_, row) => {
            const assetNumber = row.assetNumber || "";
            const serialNumber = row.serialNumber || "";
            return (
                <p>
                    {assetNumber && serialNumber ? `${assetNumber} / ${serialNumber}` : assetNumber || serialNumber}
                </p>
            );
        }
    },
    {
        id: 'terminalId',
        label: 'Terminal ID / Profile Id',
        customRender: (_, row) => {
            const terminalId = row.terminalId || "";
            const profileId = row.profileId || "";
            return (
                <p>
                    {terminalId && profileId ? `${terminalId} / ${profileId}` : terminalId || profileId}
                </p>
            );
        }
    },

    {
        id: 'slotNumber', label: 'IP Address /Slot',
        customRender: (_, row) => {
            const ipAddress = row.ipAddress || "";
            const slotNumber = row.slotNumber || "";
            return (
                <p>
                    {ipAddress && slotNumber ? `${ipAddress} / ${slotNumber}` : ipAddress || slotNumber}
                </p>
            );
        }
    },
    { id: 'venueName', label: 'Assigned Venue' },
    { id: 'deviceLocation', label: 'Location' },
    {
        id: 'action', label: 'Action', customRender: (_: any, row: any) => (
            <DeviceActions row={row} />
        )
    },
]
