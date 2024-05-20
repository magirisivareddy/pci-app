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
import { fetchInspectors, fetchVenue, searchVenues } from "@/actions/api";
import AddUpdateVenue from "./add-update-venue/AddUpdateVenue";
import { clearVenueFilterFormData, getVenues, selectedVenueRow, setAddOrEditVenueModal, setDeletInspectionModal, setDeletVenueModal, setShowInspector, setTotalDeviceModal, setVenueFilterFormData } from "@/redux/features/VenuesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InspectionDeleteModal from "./inspection-delete-modal/InspectionDeleteModal";
import VenuesDeleteModal from "./venues-delete-modal/VenuesDeleteModal";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Loading from "@/app/loading";
import { getInspectors, getVenue } from "@/redux/features/CommonSlice";
import TotalDeviceCell from "./TotalDeviceCell";
import TotalDeviceModal from "./total-device-modal/TotalDeviceModal";


interface TableRowData {
    inspectorDetails: any;
    id: number;
    venue: string;
    totalDevices: number;
}
const Venues = () => {
    const dispatch = useAppDispatch()


    const { venuesData, status, venueInfo } = useAppSelector(state => state.Venues)
    const { employeeInfo } = useAppSelector(state => state.common)
    const { isAddOrEditVenueModal, isDeletVenueModal, showInspector, isDeletInspectionModal, formData, totalDeviceModal, selectedVenueInspector } = venueInfo
    const [modalType, setModalTyep] = useState("")
    const [selectedRow, setSelectedRow] = useState<any>(null)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const openPopOver = Boolean(anchorEl);
    const roles = employeeInfo?.role?.split(",").map((role: string) => role?.trim());
    const isViewList = ["Inspector", "GroupInspector", "BackupInspector", "MainInspector", "Audit"]
    useEffect(() => {
        const formData = {
            venueId: 'All',
            inspectorEmployeeNumber:  roles?.includes("Admin") || roles?.includes("IT") || roles?.includes("Audit") ? "All" : employeeInfo?.employeeNumber?.toString(),
        }
        dispatch(clearVenueFilterFormData(formData))
    }, [])
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClear = () => {
        const formData = {
            venueId: 'All',
            inspectorEmployeeNumber: roles?.includes("Admin") || roles?.includes("IT") || roles?.includes("Audit") ? "All" : employeeInfo?.employeeNumber?.toString(),
            // inspectorEmployeeNumber: employeeInfo?.role === "Admin" ? "All" : employeeInfo?.employeeNumber?.toString(),
        }
        dispatch(clearVenueFilterFormData(formData))
    }
    const onChange = (value: any, name: any) => {
        dispatch(setVenueFilterFormData({ value, name }));
    }
    const handelSubmit = () => {
        const obj: any = {
            ...formData, employeeNumber: employeeInfo?.employeeNumber, is_it: employeeInfo?.role === "IT" ? "1" : "0", adminLevel: "1", inspectorType: "1"
        }
        Object.keys(obj).forEach(key => {
            obj[key] = String(obj[key]);
        });
        dispatch(getVenues(obj))
    }

    useEffect(() => {
        dispatch(getVenue())
        dispatch(getInspectors())
    }, [])
    useEffect(() => {
        const obj = {
            "employeeNumber": employeeInfo?.employeeNumber,
            "is_it": employeeInfo?.role === "IT" ? "1" : "0",
            "adminLevel": "1",
            "inspectorType": roles?.includes("Admin") || roles?.includes("Audit") || roles?.includes("IT") ? "All" : employeeInfo?.employeeNumber?.toString(),
            "venueId": "All",
            "inspectorEmployeeNumber": roles?.includes("Admin") || roles?.includes("Audit") || roles?.includes("IT") ? "All" : employeeInfo?.employeeNumber?.toString(),
        }
        if (employeeInfo) {
            const name = "inspectorEmployeeNumber";
            const value = roles?.includes("Admin") || roles?.includes("IT") || roles?.includes("Audit") ? "All" : employeeInfo?.employeeNumber?.toString();
            dispatch(setVenueFilterFormData({ value, name }));
            dispatch(getVenues(obj))
        }

    }, [employeeInfo]);
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const onEditVenue = (row: any) => {
        setSelectedRow(row)
        setModalTyep("Edit")
        dispatch(setAddOrEditVenueModal(true))
    }
    const onAddVenue = () => {
        const formData = {
            venueId: 'All',
            inspectorEmployeeNumber:  roles?.includes("Admin") || roles?.includes("IT") || roles?.includes("Audit") ? "All" : employeeInfo?.employeeNumber?.toString(),
        }
        setSelectedRow(null)
        dispatch(clearVenueFilterFormData(formData))
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
    const handleClose = () => {
        dispatch(setTotalDeviceModal(false))
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

    const myHeaders: any = [
        { id: 'venue_name', label: 'Venue', width: "70px" },
        {
            id: 'inspectorDetails',
            label: 'Inspector',
            width: "350px",
            customRender: (data: any, row: any): ReactNode => (
                <InspectorCell
                    inspectorDetails={row.inspectorDetails}
                    onAdd={() => handleAddInspector(row)}
                />
            )
        },
        {
            id: 'totalDevices', label: 'Total Devices', width: "70px", customRender: (data: any, row: any): ReactNode => (
                <TotalDeviceCell row={row} />
            )
        },
        {
            id: 'Edit',
            label: 'Edit',
            width: "70px",
            customRender: (data: any, row: TableRowData): ReactNode => (
                <EditableCell onEdit={() => onEditVenue(row)} />
            )
        },
        {
            id: 'delete',
            label: 'Delete',
            width: "70px",
            customRender: (data: any, row: TableRowData): ReactNode => (
                <DeleteCell onDelete={() => onDeleteVenue(row)} />
            )
        },
    ];
    return (
        <>

            <Box display="flex" justifyContent="flex-end" pr={2}>
                {!isViewList.includes(employeeInfo?.role) ? <Button onClick={onAddVenue} size="small" variant="outlined">Add Venue</Button> : ""}

            </Box>
            <VenuesFilters handleClear={handleClear} formData={formData} handelSubmit={handelSubmit} onChange={onChange} />
            <Typography
                variant='caption'
                // aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ marginLeft: "2px", fontSize: "0.8rem", fontWeight: "600" }}
            >
                NOTES: <InfoOutlinedIcon color='primary' sx={{ width: "17px", height: '17px', position: 'relative', top: "4px" }} />
            </Typography>
            <CustomTable data={venuesData} headers={myHeaders} isloading={status === "loading"} />
            <Modal
                title={"Lookup"}
                open={showInspector}
                scroll={"paper"}
                handleClose={handleCloseInspector}
                maxWidth="md"
                fullWidth={true}

                contentComponent={(props) => <AddInspector onClose={handleCloseInspector} selectedRow={selectedRow} />}
            />
            <Modal
                title={`${modalType} Venue`}
                open={isAddOrEditVenueModal}
                scroll={"body"}
                handleClose={handleCloseAddorEdit}
                contentComponent={(props) => <AddUpdateVenue modalType={modalType} setSelectedRow={setSelectedRow} selectedRow={selectedRow} />}
                maxWidth='sm'
                fullWidth={true}
            />
            {/* <Modal
                title={` Venue: ${selectedVenueInspector?.venue_name} `}
                open={totalDeviceModal}
                scroll={"body"}
                handleClose={handleClose}
                contentComponent={(props) => <TotalDeviceModal />}
                maxWidth='md'
                fullWidth={true}
            /> */}
            {totalDeviceModal && <TotalDeviceModal handleClose={handleClose} />}


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