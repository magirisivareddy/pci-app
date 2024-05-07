"use client"
import React, { useState } from 'react'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setGroupInspectorModal, setGroupInspectorsFilterClearFormData } from '@/redux/features/GroupInspectorsSlice';
import Modal from '@/components/common/modal/Modal';
import AddGroupInspector from '../add-group-inspector/AddGroupInspector';


const GroupInspectorsFilter = ({ handelSubmit, onChange }: any) => {
    const dispatch = useAppDispatch()
    const { userInfo } = useAppSelector((state: { common: any; }) => state.common)
    const isViewList = ["Inspector", "Group Inspector"]
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const { inspectorDropdown, venueDropdown } = useAppSelector(state => state.common)

    const { groupInspectorModal, formData } = useAppSelector(state => state.groupInspector.groupInspectorsInfo)

    const onAddGroupInspector = () => {
        dispatch(setGroupInspectorModal(true))
        dispatch(setGroupInspectorsFilterClearFormData())

    }
    const handleClose = () => {
        dispatch(setGroupInspectorModal(false))
    }
    const handleClear = () => {
        dispatch(setGroupInspectorsFilterClearFormData())
    }
    const ContentComponent = () => {
        return <AddGroupInspector onClose={handleClose} venues={venueDropdown} />;
    };
    const updatedVenueDropdown = [{ label: "All", value: "All" }, ...venueDropdown];
    const updatedInspectorsDropdown = [{ label: "All", value: "All" }, ...inspectorDropdown];
    return (<>
        {!isViewList.includes(userInfo.role) ? <Box display="flex" justifyContent="flex-end" pr={2}>
            <Button onClick={onAddGroupInspector} size="small" variant="outlined">Add Group Inspector</Button>
        </Box> : null}

        <Grid container spacing={2} mb={2} pr={2}>
            <Grid item xs={12} md={5}>
                <SelectInput
                    selectedOption={formData.venue}
                    onChange={onChange}
                    label={'Venue'}
                    options={updatedVenueDropdown}
                    name={'venue'}
                    id={'venue'} size={'small'} />
            </Grid>
            <Grid item xs={12} md={5}>
                <SelectInput
                    selectedOption={formData.inspector}
                    onChange={onChange}
                    label={'Inspector'}
                    options={updatedInspectorsDropdown}
                    name={'inspector'}
                    id={'inspector'} size={'small'} />
            </Grid>
            <Grid item xs={12} md={2}>
                <Button onClick={handleClear} sx={{ marginTop: "22px", marginRight: "3px", width: isDesktop ? "auto" : "100%", padding: "6px 16px " }} variant='outlined'>Clear</Button>
                <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
            </Grid>
        </Grid>
        <Modal
            title={'Lookup'}
            open={groupInspectorModal}
            scroll={'body'}
            handleClose={handleClose}
            maxWidth="md"
            fullWidth={true}
            contentComponent={(props) => <ContentComponent />}
        />

    </>


    )
}

export default GroupInspectorsFilter