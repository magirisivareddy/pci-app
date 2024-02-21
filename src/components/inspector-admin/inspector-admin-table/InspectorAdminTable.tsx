
import CustomTable from '@/components/common/table/Table'
import React from 'react'
import InspectorAdminDeleteCell from './InspectorAdminDeleteCell';
import InspectorAdminLevelCell from './InspectorAdminLevelCell';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '@/components/common/modal/Modal';
import { setinspectorAdminDeleteModal } from '@/redux/features/inspectorAdminSlice';

const headers = [
    { id: "name", label: "Name" },
    { id: "employee", label: "Employee Badge" },
    { id: "job_title", label: "Job Title Department" },
    { id: "phone", label: "Phone" },
    { id: "email", label: "email" },
    {
        id: "level", label: "Level", customRender: (_: any, row: any) => (
            <InspectorAdminLevelCell row={row} />
        )
    },
    {
        id: "actions", label: "Actions", customRender: (_: any, row: any) => (
            <InspectorAdminDeleteCell row={row} />
        )
    },
]
const data = [{ name: "John Doe", employee: "123", job_title: "Developer", phone: "555-1234", email: "john@example.com", level: "1", actions: "Edit" },
{ name: "John Doe", employee: "123", job_title: "Developer 1", phone: "555-1234", email: "john@example.com", level: "2", actions: "Edit" },
{ name: "Siva", employee: "124", job_title: "Developer 2", phone: "555-1235", email: "john@example.com", level: "1", actions: "Edit" },
{ name: "Magiri", employee: "125", job_title: "Developer 3", phone: "555-1236", email: "john@example.com", level: "2", actions: "Edit" },
{ name: "John Doe", employee: "126", job_title: "Developer 4", phone: "555-1237", email: "john@example.com", level: "1", actions: "Edit" },
{ name: "John", employee: "127", job_title: "Developer 5", phone: "555-1238", email: "john@example.com", level: "2", actions: "Edit" },]

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
const InspectorAdminTable = () => {
    const dispatch = useAppDispatch()
    const { isinspectorAdminDeleteModal } = useAppSelector(state => state.inspectorAdmin.inspectorAdminInfo)
    const handleClose = () => {
        dispatch(setinspectorAdminDeleteModal(false))
    }
    return (
        <>
            <CustomTable data={data} headers={headers} isloading={false} />
            <Modal
                title={`Delete Inspector`}
                open={isinspectorAdminDeleteModal}
                scroll={"body"}
                handleClose={handleClose}
                contentComponent={VenueDeleteModal}
                maxWidth='sm'
                fullWidth={true}

            />
        </>
    )
}

export default InspectorAdminTable