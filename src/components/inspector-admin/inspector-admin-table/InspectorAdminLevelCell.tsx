import { changeAdminLevel } from '@/actions/api'
import { getAdminList, setAdminLevelStatus, setAdminLevelStatusLoader } from '@/redux/features/InspectorAdminSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Box, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

interface AdminListPayload {
    lastName: string;
    firstName: string;
    badgeNumber: string;
    employeeNumber: string;
    is_It: string;
}
const InspectorAdminLevelCell = ({ row }: any) => {
    const dispatch = useAppDispatch()
    const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
    const [adminLevel, setAdminLevel] = useState("")
    const handleChange = async (e: any) => {
        setAdminLevel(e.target.value)
        const paylaod = {
            adminId: row.adminId.toString(),
            adminLevel: e.target.value
        }
   
        try {
            dispatch(setAdminLevelStatusLoader(true))
            const res = await changeAdminLevel(paylaod)
            dispatch(setAdminLevelStatusLoader(false))
            dispatch(setAdminLevelStatus({
                errorMessage: "",
                suucessMessage: res.message
            }))
            const obj: AdminListPayload = {
                lastName: "",
                firstName: "",
                badgeNumber: "",
                employeeNumber: employeeInfo?.employeeNumber,
                is_It: "2"
            };

            dispatch(getAdminList(obj))
            setTimeout(() => {
                dispatch(setAdminLevelStatus(null))
            }, 3000)
        } catch (error: any) {
            dispatch(setAdminLevelStatusLoader(false))
            dispatch(setAdminLevelStatus({
                errorMessage: error.messsage ?? "Failed to change admin level",
                suucessMessage: ""

            }))
            setTimeout(() => {
                dispatch(setAdminLevelStatus(null))
            }, 2000)

        }
    }
    return (
        <Box sx={{ width: "65%", margin:"0 auto" }}>
            <Select
                size='small'
                value={row.adminLevel ?? adminLevel}
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',

                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&.Mui-focused': {
                        border: '1px solid #008c99',
                    },

                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    color: "rgb(157 148 148)",
                    '& .MuiSelect-select, & .MuiOutlinedInput-input': {
                        padding: '4px 6px',
                    },
                    '&:hover': {
                        border: '1px solid #008c99',
                        borderColor: 'none',
                    },
                }}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >

                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>

            </Select>
        </Box>
    )
}

export default InspectorAdminLevelCell