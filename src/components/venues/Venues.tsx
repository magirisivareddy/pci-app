"use client"
import React, { ReactNode, useEffect, useState } from "react";
import InspectorCell from "./InspectorCell";
import EditableCell from "./EditableCell";
import DeleteCell from "./DeleteCell";
import VenuesFilters from "./venues-filters/VenuesFilters";
import Modal from "../common/modal/Modal";
import AddInspector from "./add-inspector/AddInspector";
import { Box, Button, Grid, Paper, Popover, Typography } from "@mui/material";
import TextInput from "../common/input/Input";
import VenuesNotes from "./notes/VenuesNotes";
import CustomTable from "../common/table/Table";
import { searchVenues } from "@/actions/api";
import AddUpdateVenue from "./add-update-venue/AddUpdateVenue";
import { getVenues, selectedVenueRow } from "@/redux/features/VenuesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type Dropdowns = {
    venueDropdown: any; // replace with the actual type
    inspectorsDropdown: any; // replace with the actual type
}

type VenuesProps = {
    dropdowns: Dropdowns;
}
interface TableRowData {
    inspectorDetails: any;
    id: number;
    venue: string;
    totalDevices: number;
}

interface FormData {
    venueId: string;
    inspectorEmployeeNumber: string;
}
const mockData = [
    { id: 1, venue: 'Venue A', inspector: [{ id: 1, name: "Inspector 1", type: "MI" }, { id: 2, name: "Inspector 2", type: "BI" }, { id: 3, name: "Inspector 3" }, { id: 4, name: "Inspector 4" }, { id: 5, name: "Inspector 5" }], totalDevices: 10 },
    { id: 2, venue: 'Venue B', inspector: [{ id: 1, name: "Inspector 3", type: "GI" }], totalDevices: 5 },
    { id: 3, venue: 'Venue C', inspector: [{ id: 1, name: "Inspector 4", type: "BI" }, { id: 2, name: "Inspector 5" },], totalDevices: 8 },
    { id: 4, venue: 'Venue D', inspector: [{ id: 1, name: "Inspector 6", type: "MI" }, { id: 2, name: "Inspector 7" },], totalDevices: 12 },
    { id: 5, venue: 'Venue E', inspector: [], totalDevices: 15 },
];

const Venues: React.FC<VenuesProps> = ({ dropdowns }) => {
    const dispatch = useAppDispatch()

    const { venuesData, status } = useAppSelector(state => state.Venues)
    const [showInspector, setShowInspector] = useState(false)
    const [isAddOrEditVenueModal, setAddOrEditVenueModal] = useState(false)
    const [isDeletVenueModal, setDeletVenueModal] = useState(false)
    const [isDeletInspectionModal, setDeletInspectionModal] = useState(false)
    const [modalType, setModalTyep] = useState("")
    const [selectedRow, setSelectedRow] = useState<any>(null)

    const [isLoading, setLoading] = useState(false)


    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const openPopOver = Boolean(anchorEl);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [formData, setFormData] = useState<FormData>({
        venueId: 'All',
        inspectorEmployeeNumber: 'All'
    });

    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handelSubmit = () => {
        const obj: any = {
            ...formData, employeeNumber: "789", is_it: "1", adminLevel: "1", inspectorType: "1"
        }
        Object.keys(obj).forEach(key => {
            obj[key] = String(obj[key]);
        });
        dispatch(getVenues(obj))
    }
    useEffect(() => {
        const obj = {
            "employeeNumber": "789",
            "is_it": "1",
            "adminLevel": "1",
            "inspectorType": "1",
            "venueId": "All",
            "inspectorEmployeeNumber": "All"
        }

        dispatch(getVenues(obj))
    }, []);
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const onEditVenue = (row: any) => {
        setSelectedRow(row)
        setModalTyep("Edit")
        setAddOrEditVenueModal(true)
    }
    const onAddVenue = () => {
        setSelectedRow(null)
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
    const handleAddInspector = (row: any) => {
        dispatch(selectedVenueRow(row))
        setShowInspector(true)
    };
    const handleCloseInspector = () => {
        setShowInspector(false)

    };
    const VenuesDeleteModal = () => {
        return (
            <Typography variant="body1">A venue can not be deleted until you have removed/transferred all its associated devices from it.</Typography>
        )
    }

    const InspectionDeleteModal = () => {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="body1">
                    Are you sure you want to delete this inspector?
                </Typography>
                <Box display="flex" gap={2} mt={2} justifyContent="center">
                    <Button variant="outlined">Yes</Button>
                    <Button variant="outlined">No</Button>
                </Box>
            </Box>
        )
    }

    const handleDeleteInspector = (row: any) => {
        console.log("row", row)
        setDeletInspectionModal(true)
    };
    const myHeaders: any = [
        { id: 'venue_name', label: 'Venue' },
        {
            id: 'inspectorDetails',
            label: 'Inspector',
            customRender: (data: any, row: any): ReactNode => (
                <InspectorCell
                    inspectorDetails={row.inspectorDetails}
                    onAdd={() => handleAddInspector(row)}
                    onDelete={(inspectorId) => handleDeleteInspector(row)}
                />
            )
        },
        { id: 'totalDevices', label: 'Total Devices' },
        {
            id: 'Edit',
            label: 'Edit',
            customRender: (data: any, row: TableRowData): ReactNode => (
                <EditableCell onEdit={() => onEditVenue(row)} />
            )
        },
        {
            id: 'delete',
            label: 'Delete',
            customRender: (data: any, row: TableRowData): ReactNode => (
                <DeleteCell onDelete={() => onDeleteVenue()} />
            )
        },
    ];

    return (
        <>
            {/* <CustomBreadcrumbs /> */}
            <Box display="flex" justifyContent="flex-end" pr={2}>
                <Button onClick={onAddVenue} size="small" variant="outlined">Add Venue</Button>
            </Box>
            <VenuesFilters dropdowns={dropdowns} formData={formData} handelSubmit={handelSubmit} onChange={onChange} />
            <Typography
                variant='caption'
                // aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                NOTES:
            </Typography>
            <CustomTable data={venuesData} headers={myHeaders} isloading={status === "loading"} />
            <Modal
                title={"Lookup"}
                open={showInspector}
                scroll={"body"}
                handleClose={handleCloseInspector}

                contentComponent={(props) => <AddInspector selectedRow={selectedRow} />}
            />
            <Modal
                title={`${modalType} Venue`}
                open={isAddOrEditVenueModal}
                scroll={"body"}
                handleClose={handleCloseAddorEdit}
                contentComponent={(props) => <AddUpdateVenue modalType={modalType} selectedRow={selectedRow} />}
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
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',

                }}
                open={openPopOver}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}

                onClose={handlePopoverClose}
                disableRestoreFocus

            >
                <Paper sx={{ maxWidth: 'small', padding: '16px' }}>
                    <VenuesNotes />
                </Paper>
            </Popover>

        </>

    )
}
export default Venues