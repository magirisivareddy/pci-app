
import React from "react";
import DeviceActions from "@/components/devices/devices-table/DeviceActions";
import StatusCell from "@/components/inspections/devices-table/StatusCell";
import NotesCell from "@/components/inspections/devices-table/NotesCell";
import ReasonsCell from "@/components/inspections/devices-table/ReasonsCell";
import DeviceLocationCell from "@/components/devices/devices-table/DeviceLocationCell";



type Header = {
    id: string;
    label: string;
    customRender?: (_value: any, row: any) => JSX.Element;
    width?: string
};

export const inspectionDeviceHeader: Header[] = [
    { id: 'commonAssetName', label: 'Device', width: "100px" },
    { id: 'serialNumber', label: 'Serial', width: "100px" },
    { id: 'deviceLocation', label: 'Location', width: "100px" },
    {
        id: 'status', label: 'Status',width:"150px", customRender: (value: any, row: any) => <StatusCell row={row} />
    },
    {
        id: 'notes', label: 'Notes', width:"150px",customRender: (value: any, row: any) => <NotesCell row={row} />
    },
    {
        id: 'reason', label: 'Reason',width:"150px", customRender: (value: any, row: any) => <ReasonsCell row={row} />
    },
];


export const devicesHeader: Header[] = [
    { id: 'commonAssetName', label: 'Common Asset Name', width: "172px"},
    { id: 'modelNumber', label: 'Model',width: "100px" },
    {
        id: 'assetNumber', label: 'Asset / Serial',width: "172px", customRender: (_, row) => {
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
        label: 'Terminal ID / Profile Id',width: "180px",
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
        id: 'slotNumber', label: 'IP Address /Slot',width: "150px",
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
    { id: 'venueName', label: 'Assigned Venue',width: "125px" },
    {
        id: 'deviceLocation', label: 'Location',width: "300px", customRender: (_: any, row: any) => (
            <DeviceLocationCell row={row} />
        )
    },
    {
        id: 'action', label: 'Action',width:"70px", customRender: (_: any, row: any) => (
            <DeviceActions row={row} />
        )
    },
]
