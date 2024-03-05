"use client"
import CustomTable from '@/components/common/table/Table'
import React, { FC, useEffect, useState } from 'react'
import { ReceiveNotices } from './ReceiveNotices';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '@/components/common/modal/Modal';
import { setDeleteInspectorModal, setAddVenuToInspectorModal, setdeleteVenuModal, getGroupInspectors } from '@/redux/features/GroupInspectorsSlice';

import { Alert, Box, Button, Grid, Typography } from '@mui/material';

import SelectInput from '@/components/common/input/SelectInput';
import AddAndDeleteVenue from './AddAndDeleteVenue';

import InspectorDelete from './InspectorDelete';
import DeleteGroupInspector from '../delete-group-inspector/DeleteGroupInspector';
import AddVenueToGroupInspector from '../add-venue-to-groupInspector/AddVenueToGroupInspector';
import { groupInspectorRemoveVenue } from '@/actions/api';
import Loading from '@/app/loading';



const myHeaders = [
    {
        id: "firstName", label: "Inspectors", customRender: (_: any, row: any) => {
            return <>{row.lastName} {row.firstName} </>
        }
    },
    {
        id: "department", label: "Department"
    },
    {
        id: "jobTitle", label: "Job Title"
    },
    {
        id: "venues", label: "Venues", customRender: (_: any, row: any) => (
            <AddAndDeleteVenue row={row} />
        )
    },
    {
        id: "receive_notices", label: "Receive Notices", customRender: (_: any, row: any) => (
            <ReceiveNotices row={row} />
        )
    },
    {
        id: "actions", label: "Actions", customRender: (_: any, row: any) => (
            <InspectorDelete row={row} />
        )
    },
]



export const GroupInspectorsTable = ({ venues, isloading }: any) => {
    const dispatch = useAppDispatch();
    const { groupInspectorsData, status } = useAppSelector(state => state.groupInspector)
    const [isLoading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { isAddVenueToInspectorModal, selectedGroupInspector, isDeleteInspectorModal, isdeleteVenuModal, deletedVenuId } = useAppSelector(state => state.groupInspector.groupInspectorsInfo)
    const handleClose = () => {
        dispatch(setAddVenuToInspectorModal(false))
        dispatch(setDeleteInspectorModal(false))
        dispatch(setdeleteVenuModal(false))

    }



    const VenueDeleteModal = () => {
        const onDelete = async () => {
            setLoading(true)
            try {
                const res = await groupInspectorRemoveVenue(selectedGroupInspector.employeeNumber, deletedVenuId)
                setMessage(res.message)
                setLoading(false)
                setTimeout(() => {
                  
                    const obj: any = {
                        venueId: 'All',
                        inspectorEmployeeNumber: 'All',
                        is_It: '1'
                    }
                    Object.keys(obj).forEach(key => {
                        obj[key] = String(obj[key]);
                    });
                    setMessage("")
                    dispatch(getGroupInspectors(obj))
                }, 3000)
                handleClose()

            } catch (error: any) {
                setLoading(false)
                console.log("error", error)
                setErrorMessage(error.message ?? "something went wrong ")
            }
        }
        return (
            <>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography variant="body1">
                        Are you sure tou want to delete this Venue?
                    </Typography>
                    <Box display="flex" gap={2} mt={2} justifyContent="center">
                        <Button variant="outlined" onClick={onDelete}>Yes</Button>
                        <Button variant="outlined" onClick={handleClose}>No</Button>
                    </Box>
                </Box>
                {isLoading && <Loading />}
                {message && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                    {message}
                </Alert>}

                {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                    {errorMessage}
                </Alert>}
            </>
        )
    }
    return (
        <>
            <CustomTable data={groupInspectorsData} headers={myHeaders} isloading={status === "loading"} />
            <Modal
                title={`Group Inspector -Add venue: ${selectedGroupInspector?.lastName} ${selectedGroupInspector?.firstName}`}
                open={isAddVenueToInspectorModal}
                scroll={'body'}
                maxWidth="sm"
                handleClose={handleClose}
                // contentComponent={AddVenue}
                contentComponent={(props) => <AddVenueToGroupInspector venues={venues} />}
                fullWidth={true}
            />
            <Modal
                title={`Delete Inspector`}
                open={isDeleteInspectorModal}
                scroll={"body"}
                handleClose={handleClose}
                contentComponent={(props) => <DeleteGroupInspector />}
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
