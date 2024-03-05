"use client"
import React, { ReactNode, useEffect, useState } from "react";
import InspectorCell from "./InspectorCell";
import EditableCell from "./EditableCell";
import DeleteCell from "./DeleteCell";
import VenuesFilters from "./venues-filters/VenuesFilters";
import Modal from "../common/modal/Modal";
import AddInspector from "./add-inspector/AddInspector";
import { Box, Button, Grid, Paper, Popover, Typography } from "@mui/material";
import VenuesNotes from "./notes/VenuesNotes";
import CustomTable from "../common/table/Table";
import { searchVenues } from "@/actions/api";
import AddUpdateVenue from "./add-update-venue/AddUpdateVenue";
import { getVenues, selectedVenueRow, setAddOrEditVenueModal, setDeletInspectionModal, setDeletVenueModal, setShowInspector } from "@/redux/features/VenuesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InspectionDeleteModal from "./inspection-delete-modal/InspectionDeleteModal";
import VenuesDeleteModal from "./venues-delete-modal/VenuesDeleteModal";

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
const Venues: React.FC<VenuesProps> = ({ dropdowns }) => {
    const dispatch = useAppDispatch()
    const { venuesData, status, venueInfo } = useAppSelector(state => state.Venues)
    const { isAddOrEditVenueModal, isDeletVenueModal, showInspector, isDeletInspectionModal } = venueInfo
    const [modalType, setModalTyep] = useState("")
    const [selectedRow, setSelectedRow] = useState<any>(null)
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
            ...formData, employeeNumber: "0004236", is_it: "1", adminLevel: "1", inspectorType: "1"
        }
        Object.keys(obj).forEach(key => {
            obj[key] = String(obj[key]);
        });
        dispatch(getVenues(obj))
    }
    useEffect(() => {
        const obj = {
            "employeeNumber": "0004236",
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
        dispatch(setAddOrEditVenueModal(true))
    }
    const onAddVenue = () => {
        setSelectedRow(null)
        setModalTyep("Add")
        dispatch(setAddOrEditVenueModal(true))
    }
    const onDeleteVenue = (row: any) => {
        dispatch(selectedVenueRow(row))
        dispatch(setDeletVenueModal(true))
    }
    const handleCloseAddorEdit = () => {
        setModalTyep("")
        dispatch(setAddOrEditVenueModal(false))
    }
    const handleCloseDelete = () => {
        dispatch(setDeletVenueModal(false))
    }
    const handleCloseDeleteInspection = () => {
        dispatch(setDeletInspectionModal(false))
    }
    const handleAddInspector = (row: any) => {
        dispatch(selectedVenueRow(row))
        dispatch(setShowInspector(true))
    };
    const handleCloseInspector = () => {
        dispatch(setShowInspector(false))

    };
    const handleDeleteInspector = (row: any,inspector:any) => {
        console.log("row", row)
        console.log("inspector",inspector)
        dispatch(setDeletInspectionModal(true))
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
                <DeleteCell onDelete={() => onDeleteVenue(row)} />
            )
        },
    ];
    console.log("isDeletInspectionModal", isDeletInspectionModal)
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
            // buttonText="Okay"
            // handleSubscribe={() => { console.log("cal") }}
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