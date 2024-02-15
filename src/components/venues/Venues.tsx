"use client"
import React, { useState } from "react";
import CustomTable from "../common/table/Table";
import InspectorCell from "./InspectorCell";
import EditableCell from "./EditableCell";
import DeleteCell from "./DeleteCell";
import CustomBreadcrumbs from "../common/breadcrumb/Breadcrumb";
import { useAppDispatch } from "@/redux/hooks";
import VenuesFilters from "./venues-filters/VenuesFilters";
import Modal from "../common/modal/Modal";
import AddInspector from "./add-inspector/AddInspector";
import { Box, Button, Grid, Typography } from "@mui/material";
import SelectInput from "../common/input/SelectInput";

type Dropdowns = {
    venueDropdown: any; // replace with the actual type
    inspectorsDropdown: any; // replace with the actual type
}

type VenuesProps = {
    dropdowns: Dropdowns;
}
interface TableRowData {
    id: number;
    venue: string;
    inspector: any;
    totalDevices: number;
}
function generateMockData(numRecords: any) {
    const mockData = [];
    const inspectorNames = ['siva', 'magiri', 'example', 'john', 'doe', 'alice', 'bob', 'charlie']; // Add more unique names

    for (let i = 1; i <= numRecords; i++) {
        const randomInspectorIndex = Math.floor(Math.random() * inspectorNames.length);
        const inspectorName = inspectorNames[randomInspectorIndex];

        const record = {
            id: i,
            venue: `Location ${String.fromCharCode(65 + (i % 3))}`,
            inspector: [{ id: 1, name: inspectorName }],
            totalDevices: 50,
        };

        mockData.push(record);
    }

    console.log('mockData', mockData);
    return mockData;
}
const numberOfRecords = 30;
const mockData = generateMockData(numberOfRecords);

const Venues: React.FC<VenuesProps> = ({ dropdowns }) => {
    const [data, setData] = useState<TableRowData[]>(mockData);
    const [showInspector, setShowInspector] = useState(false)
    const [isAddOrEditVenueModal, setAddOrEditVenueModal] = useState(false)
    const [isDeletVenueModal, setDeletVenueModal] = useState(false)
    const [isDeletInspectionModal, setDeletInspectionModal] = useState(false)
    const [modalType, setModalTyep] = useState("")

    const onEditVenue = () => {
        setModalTyep("Edit")
        setAddOrEditVenueModal(true)
    }
    const onAddVenue = () => {
        setModalTyep("Add")
        setAddOrEditVenueModal(true)
    }
    const onDeleteVenue = () => {
        setDeletVenueModal(true)
    }
    const handleCloseAddorEdit = () => {
        setModalTyep("")
        setAddOrEditVenueModal(false)
    }
    const handleCloseDelete = () => {
        setDeletVenueModal(false)
    }
    const handleCloseDeleteInspection = () => {
        setDeletInspectionModal(false)
    }
    const handleAddInspector = (rowId: number, newInspector: { name: string }) => {
        setShowInspector(true)
        // const row = data.find(r => r.id === rowId);
        // const maxId = row ? Math.max(0, ...row.inspector.map((ins: { id: any; }) => ins.id)) : 0;
        // const newInspectorWithId = { ...newInspector, id: maxId + 1 };
        // const newData = data.map(row => {
        //     if (row.id === rowId) {
        //         return {
        //             ...row,
        //             inspector: [...row.inspector, newInspectorWithId],
        //         };
        //     }
        //     return row;
        // });
        // setData(newData);
    };
    const handleCloseInspector = () => {
        setShowInspector(false)

    };
    const VenuesDeleteModal = () => {
        return (
            <Typography variant="body1">A venue can not be deleted until you have removed/transferred all its associated devices from it.</Typography>
        )
    }
    const VenuesModal = () => {
        const onChange = () => {

        }
        return (
            <Grid container spacing={2} mb={2} pr={2}>
                <Grid item xs={12} md={9}>
                    <SelectInput
                        selectedOption={"All"}
                        onChange={onChange}
                        label={'Venue'}
                        options={dropdowns.venueDropdown}
                        name={'venue'}
                        id={'venue'}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button sx={{ marginTop: "22px" }} variant='contained'>{modalType === "Edit" ? "Update Venue" : "Add Venue"}</Button>
                </Grid>
            </Grid>
        )
    }
    const InspectionDeleteModal = () => {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="body1">
                    Are You Sure You want to delete this inspections?
                </Typography>
                <Box display="flex" gap={2} mt={2} justifyContent="center">
                    <Button variant="outlined">Yes</Button>
                    <Button variant="outlined">No</Button>
                </Box>
            </Box>
        )
    }

    const handleDeleteInspector = (rowId: number, inspectorId: number) => {
        setDeletInspectionModal(true)
        // const newData = data.map((row) => {
        //     if (row.id === rowId) {
        //         return {
        //             ...row,
        //             inspector: row.inspector.filter((inspector: { id: number; }) => inspector.id !== inspectorId),
        //         };
        //     }
        //     return row;
        // });
        // setData(newData);
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
                <EditableCell onEdit={() => onEditVenue()} />
            ),
        },
        {
            id: 'delete',
            label: 'Delete',
            customRender: (_: any, row: TableRowData) => (
                <DeleteCell onDelete={() => onDeleteVenue()} />
            )
        },


    ];
    const dispatch = useAppDispatch();
    return (
        <>
            {/* <CustomBreadcrumbs /> */}
            <Box display="flex" justifyContent="flex-end" pr={2}>
                <Button onClick={onAddVenue} size="small" variant="outlined">Add Venue</Button>
            </Box>
            <VenuesFilters dropdowns={dropdowns} />
            <CustomTable data={data} headers={myHeaders} dispatch={dispatch} />
            <Modal
                title={"Lookup"}
                open={showInspector}
                scroll={"body"}
                handleClose={handleCloseInspector}
                contentComponent={AddInspector}
            />
            <Modal
                title={`${modalType} Venue`}
                open={isAddOrEditVenueModal}
                scroll={"body"}
                handleClose={handleCloseAddorEdit}
                contentComponent={VenuesModal}
                maxWidth='sm'
                fullWidth={true}
            />
            <Modal
                title={`Delete Venue`}
                open={isDeletVenueModal}
                scroll={"body"}
                handleClose={handleCloseDelete}
                contentComponent={VenuesDeleteModal}
                maxWidth='sm'
                fullWidth={true}
                buttonText="Okay"
                handleSubscribe={() => { console.log("cal") }}
            />
            <Modal
                title={`Delete Inspection`}
                open={isDeletInspectionModal}
                scroll={"body"}
                handleClose={handleCloseDeleteInspection}
                contentComponent={InspectionDeleteModal}
                maxWidth='sm'
                fullWidth={true}

            />

        </>

    )
}
export default Venues