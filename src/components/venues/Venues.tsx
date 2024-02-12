"use client"
import React from "react";
import CustomTable from "../common/table/Table";
import InspectorCell from "./InspectorCell";
import EditableCell from "./EditableCell";
import DeleteCell from "./DeleteCell";
import CustomBreadcrumbs from "../common/breadcrumb/Breadcrumb";
import { useAppDispatch } from "@/redux/hooks";

interface TableRowData {
    id: number;
    venue: string;
    inspector: any;
    totalDevices: number;

}
const tableldata = [
    {
        id: 1,
        venue: 'Location A test 123567',
        inspector: [{ id: 1, name: "siva" }],
        totalDevices: 50,
    },
    {
        id: 2,
        venue: 'Location A',
        inspector: [{ id: 1, name: "siva" }, { id: 2, name: "reddy" }],
        totalDevices: 50,
    },
    {
        id: 3,
        venue: 'Location A',
        inspector: [{ id: 1, name: "siva" }],
        totalDevices: 50,
    },
    {
        id: 4,
        venue: 'Location A',
        inspector: [{ id: 1, name: "siva" }],
        totalDevices: 50,
    },
    {
        id: 5,
        venue: 'Location A',
        inspector: [{ id: 1, name: "siva" }],
        totalDevices: 50,
    },
];

const Venues = () => {
    const [data, setData] = React.useState<TableRowData[]>(tableldata);
    const handleAddInspector = (rowId: number, newInspector: { name: string }) => {
        const row = data.find(r => r.id === rowId);
        const maxId = row ? Math.max(0, ...row.inspector.map((ins: { id: any; }) => ins.id)) : 0;
        const newInspectorWithId = { ...newInspector, id: maxId + 1 };
        const newData = data.map(row => {
            if (row.id === rowId) {
                return {
                    ...row,
                    inspector: [...row.inspector, newInspectorWithId],
                };
            }
            return row;
        });
        setData(newData);
    };

    const handleDeleteInspector = (rowId: number, inspectorId: number) => {
        const newData = data.map((row) => {
            if (row.id === rowId) {
                return {
                    ...row,
                    inspector: row.inspector.filter((inspector: { id: number; }) => inspector.id !== inspectorId),
                };
            }
            return row;
        });
        setData(newData);
    };
    const myHeaders = [
        { id: 'venue', label: 'Venue', },
        {
            id: 'inspector',
            label: 'Inspector',
            customRender: (_value: any, row: any) => (
                <InspectorCell
                    inspectors={row.inspector} // pass the array of inspectors
                    onAdd={(newInspector) => handleAddInspector(row.id, newInspector)}
                    onDelete={(inspectorId) => handleDeleteInspector(row.id, inspectorId)}
                />
            )
        },
        { id: 'totalDevices', label: 'Total Devices' },
        {
            id: 'Edit',
            label: 'Edit',
            customRender: (rowData: TableRowData) => (
                <EditableCell onEdit={() => console.log("rowdara", rowData)} />
            ),
        },
        {
            id: 'delete',
            label: 'Delete',
            customRender: (_: any, row: TableRowData) => (
                <DeleteCell onDelete={() => console.log("row", row)} />
            )
        },


    ];
    const dispatch = useAppDispatch();
    return (
        <>
            <CustomBreadcrumbs/>
            <CustomTable data={data} headers={myHeaders} dispatch={dispatch} />
        </>

    )
}
export default Venues