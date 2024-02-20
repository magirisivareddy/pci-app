"use client"
import CustomTable from '@/components/common/table/Table'
import React, { FC } from 'react'
import { ReceiveNotices } from './ReceiveNotices';
import ActionInspectors from './ActionInspectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '@/components/common/modal/Modal';
import { setDeleteInspectorModal, setInspectorModal, setdeleteVenuModal } from '@/redux/features/groupInspectorsSlice';

import { Box, Button, Grid, Typography } from '@mui/material';
import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import DeleteVenue from './DeleteVenue';


const myHeaders = [
    {
        id: "inspectors", label: "Inspectors"
    },
    {
        id: "department", label: "Department"
    },
    {
        id: "job_title", label: "Job Title"
    },
    {
        id: "venues", label: "Venues", customRender: (_: any, row: any) => (
            <DeleteVenue row={row} />
        )
    },
    {
        id: "receive_notices", label: "Receive Notices", customRender: (_: any, row: any) => (
            <ReceiveNotices row={row} />
        )
    },
    {
        id: "actions", label: "Actions", customRender: (_: any, row: any) => (
            <ActionInspectors row={row} />
        )
    },
]
const mockData = [
    { id: 1, inspectors: "Inspector 1", department: "Engineering", job_title: "Engineer", venues: [{ id: 1, name: "Venue A" }], receive_notices: "Yes" },
    { id: 2, inspectors: "Inspector 2", department: "Finance", job_title: "Accountant", venues: [{ id: 1, name: "Venue B" }], receive_notices: "No" },
    { id: 3, inspectors: "Inspector 3", department: "Human Resources", job_title: "HR Specialist",venues: [{ id: 1, name: "Venue c" }], receive_notices: "Yes" },
    { id: 4, inspectors: "Inspector 4", department: "Marketing", job_title: "Marketing Coordinator", venues: [{ id: 1, name: "Venue A" }], receive_notices: "No" },
    { id: 5, inspectors: "Inspector 5", department: "Operations", job_title: "Operations Manager", venues: [{ id: 1, name: "Venue D" }], receive_notices: "Yes" },
    { id: 6, inspectors: "Inspector 6", department: "IT", job_title: "IT Specialist", venues: [{ id: 1, name: "Venue B" }], receive_notices: "No" },
    { id: 7, inspectors: "Inspector 7", department: "Customer Service", job_title: "Customer Support", venues: [{ id: 1, name: "Venue C" }], receive_notices: "Yes" },
    { id: 8, inspectors: "Inspector 8", department: "Legal", job_title: "Legal Counsel", venues: [{ id: 1, name: "Venue A" }], receive_notices: "No" },
    { id: 9, inspectors: "Inspector 9", department: "Research and Development", job_title: "Researcher", venues: [{ id: 1, name: "Venue D" }], receive_notices: "Yes" },
    { id: 10, inspectors: "Inspector 10", department: "Quality Assurance", job_title: "QA Specialist",venues: [{ id: 1, name: "Venue B" }], receive_notices: "No" },
];



export const GroupInspectorsTable = ({ venues }: any) => {
    const dispatch = useAppDispatch();
    const { isAddInspectorModal, selectedGroupInspector, isDeleteInspectorModal,isdeleteVenuModal } = useAppSelector(state => state.groupInspector.groupInspectorsInfo)
    const handleClose = () => {
        dispatch(setInspectorModal(false))
        dispatch(setDeleteInspectorModal(false))
        dispatch(setdeleteVenuModal(false))
        
    }
    const AddVenue = () => {
        const defaultValue = 101
        const onChange = () => {

        }
        return (
            <Grid container spacing={2} mb={2} pr={2}>
                <Grid item xs={12} md={9}>
                    <SelectInput
                        selectedOption={defaultValue}
                        onChange={onChange}
                        label={'Available Venues'}
                        options={venues}
                        name={'venue'}
                        id={'venue'} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button sx={{ marginTop: "22px" }} variant='contained'> Add Venue</Button>
                </Grid>
            </Grid>
        )
    }
    const InspectionDeleteModal = () => {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="body1">
                    Are you sure tou want to delete this inspector?
                </Typography>
                <Box display="flex" gap={2} mt={2} justifyContent="center">
                    <Button variant="outlined">Yes</Button>
                    <Button variant="outlined">No</Button>
                </Box>
            </Box>
        )
    }
    const VenueDeleteModal = () => {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="body1">
                    Are you sure tou want to delete this Venue?
                </Typography>
                <Box display="flex" gap={2} mt={2} justifyContent="center">
                    <Button variant="outlined">Yes</Button>
                    <Button variant="outlined">No</Button>
                </Box>
            </Box>
        )
    }
    return (
        <>
            <CustomTable data={mockData} headers={myHeaders} />
            <Modal
                title={`Group Inspector -Add venue: ${selectedGroupInspector?.inspectors}`}
                open={isAddInspectorModal}
                scroll={'body'}
                maxWidth="sm"
                handleClose={handleClose}
                contentComponent={AddVenue}
                fullWidth={true}
            />
            <Modal
                title={`Delete Inspector`}
                open={isDeleteInspectorModal}
                scroll={"body"}
                handleClose={handleClose}
                contentComponent={InspectionDeleteModal}
                maxWidth='sm'
                fullWidth={true}

            />
               <Modal
                title={`Delete Venue`}
                open={isdeleteVenuModal}
                scroll={"body"}
                handleClose={handleClose}
                contentComponent={VenueDeleteModal}
                maxWidth='sm'
                fullWidth={true}

            />
        </>

    )
}
