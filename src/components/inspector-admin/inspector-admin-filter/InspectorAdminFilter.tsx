"use client"

import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import { downloadExcel } from 'react-export-table-to-excel';
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDeviceInfo } from '@/redux/features/DevicesSlice';

interface FormData {
    lastName: string;
    firstName: string;
    employee: string;
    badge: string;

}
const InspectorAdminFilter = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [formData, setFormData] = useState<FormData>({
        lastName: '',
        firstName: '',
        employee: '',
        badge: ''
    });
    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handelSubmit = (event: any) => { }

    return (
        <>

            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={2.75}>
                    <TextInput
                        defaultValue={""}
                        onChange={onChange}
                        label={'Last Name'}
                        name={'lastName'}
                        id={'lastName'}
                    />
                </Grid>
                <Grid item xs={12} md={2.75}>
                    <TextInput
                        defaultValue={""}
                        onChange={onChange}
                        label={'First Name'}
                        name={'firstName'}
                        id={'firstName'}
                    />
                </Grid>
                <Grid item xs={12} md={2.74}>
                    <TextInput
                        defaultValue={""}
                        onChange={onChange}
                        label={'Employee'}
                        name={'employee'}
                        id={'employee'}
                    />
                </Grid>
                <Grid item xs={12} md={2.75}>
                    <TextInput
                        defaultValue={""}
                        onChange={onChange}
                        label={'Badge'}
                        name={'badge'}
                        id={'badge'}
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
                </Grid>
            </Grid>
        </>


    )
}



export default InspectorAdminFilter