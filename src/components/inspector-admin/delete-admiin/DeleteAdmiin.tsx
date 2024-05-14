import { deleteAdmin } from '@/actions/api'
import Loading from '@/app/loading'
import { getAdminList, setinspectorAdminDeleteModal } from '@/redux/features/InspectorAdminSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

export const DeleteAdmiin = () => {
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isloading, setLoading] = useState(false)
    const { selectedAdminRow } = useAppSelector(state => state.inspectorAdmin.inspectorAdminInfo)
    const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
    const onDelete = async () => {
        try {
            setLoading(true)
            const res = await deleteAdmin(selectedAdminRow?.adminId)
            setMessage(res.message)
            setLoading(false)
            setTimeout(() => {
                dispatch(setinspectorAdminDeleteModal(false))
                setMessage("")
            }, 3000)
            const obj =
            {
                "lastName": "",
                "firstName": "",
                "badgeNumber": "",
                "employeeNumber": employeeInfo?.employeeNumber,
                "is_It": "2"
            }
            dispatch(getAdminList(obj))
        } catch (error: any) {
            setLoading(false)
            setErrorMessage(error.message ?? "something went wrong ")
        }
    }
    const onClose = () => {
        dispatch(setinspectorAdminDeleteModal(false))
    }
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {isloading && <Loading />}
            <Typography variant="body1">
                Are you sure you want to delete this admin?
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
    )
}

export default DeleteAdmiin