"use client"

import TextInput from '@/components/common/input/Input';
import React from 'react'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useAppDispatch } from '@/redux/hooks';
import { clearInspectorAdminFilterFormData } from '@/redux/features/InspectorAdminSlice';

const InspectorAdminFilter = ({ onChange, handelSubmit, formData }: any) => {
    const dispatch=useAppDispatch()
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

const onClear=()=>{
    dispatch(clearInspectorAdminFilterFormData())
}
    return (
        <>

            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={2.4}>
                    <TextInput
                        defaultValue={formData.lastName}
                        onChange={onChange}
                        label={'Last Name'}
                        name={'lastName'}
                        id={'lastName'}
                    />
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <TextInput
                        defaultValue={formData.firstName}
                        onChange={onChange}
                        label={'First Name'}
                        name={'firstName'}
                        id={'firstName'}
                    />
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <TextInput
                        defaultValue={formData.employeeNumber}
                        onChange={onChange}
                        label={'Employee'}
                        name={'employeeNumber'}
                        id={'employeeNumber'}
                    />
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <TextInput
                        defaultValue={formData.badgeNumber}
                        onChange={onChange}
                        label={'Badge'}
                        name={'badgeNumber'}
                        id={'badgeNumber'}
                    />
                </Grid>
                <Grid item xs={12} md={2} sx={{display:"flex", gap:"10px"}}>
                    <Button onClick={onClear} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='outlined'>Clear</Button>
                    <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
                </Grid>
            </Grid>
        </>


    )
}



export default InspectorAdminFilter