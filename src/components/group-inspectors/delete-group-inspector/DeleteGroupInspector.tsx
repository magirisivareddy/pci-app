import { deleteGroupInspector } from '@/actions/api'
import Loading from '@/app/loading'
import { getGroupInspectors, setDeleteInspectorModal } from '@/redux/features/GroupInspectorsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeleteGroupInspector = () => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setLoading] = useState(false)
    const { selectedGroupInspector, formData } = useAppSelector(state => state.groupInspector.groupInspectorsInfo)
    const onDelete = async () => {
        const inspectorId = selectedGroupInspector?.inspectorId.toString()
        try {
            setLoading(true)
            const res = await deleteGroupInspector(inspectorId)
            setMessage(res.message)
            const payload = {
                venueId: 'All',
                inspectorEmployeeNumber: 'All',
                is_It: '1'
            }
            setLoading(false)
            setTimeout(() => {
                setMessage("")
                dispatch(setDeleteInspectorModal(false))
                dispatch(getGroupInspectors(payload))
            }, 3000)
        } catch (error: any) {
            console.log("error", error)
            setLoading(false)
            setErrorMessage(error.message ?? "something went wrong ")
        }
    }
    const onClose = () => {
        dispatch(setDeleteInspectorModal(false))
    }


    return (
        <>
           {isLoading && <Loading />}
           <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">
                Are you sure you want to delete this group inspector?
            </Typography>
            <Box display="flex" gap={2} mt={2} justifyContent="center">
                <Button onClick={onDelete} variant="outlined">Yes</Button>
                <Button onClick={onClose} variant="outlined">No</Button>
            </Box>
            {message && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                {message}
            </Alert>}

            {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                {errorMessage}
            </Alert>}
        </Box>
           </>
     
    )
}

export default DeleteGroupInspector