"use client"
import React, { useState } from 'react'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setGroupInspectorModal } from '@/redux/features/groupInspectorsSlice';
import Modal from '@/components/common/modal/Modal';
import AddGroupInspector from '../add-group-inspector/AddGroupInspector';


interface FormData {
    venue: string;
    inspector: string;
}
const GroupInspectorsFilter = ({ dropdowns }: any) => {
    const dispatch = useAppDispatch()
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [formData, setFormData] = useState<FormData>({
        venue: 'All',
        inspector: 'All'
    });
    const { groupInspectorModal } = useAppSelector(state => state.groupInspector.groupInspectorsInfo)
    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handelSubmit = (event: any) => {

    }
    const onAddGroupInspector = () => {
        dispatch(setGroupInspectorModal(true))

    }
    const handleClose = () => {
        dispatch(setGroupInspectorModal(false))
    }
    const ContentComponent = () => {
        // Use the data as needed within the AddGroupInspector component
        return <AddGroupInspector venues={dropdowns.venueDropdown} />;
    };
    return (<>
        <Box display="flex" justifyContent="flex-end" pr={2}>
            <Button onClick={onAddGroupInspector} size="small" variant="outlined">Add Group Inspector</Button>
        </Box>
        <Grid container spacing={2} mb={2} pr={2}>
            <Grid item xs={12} md={5.5}>
                <SelectInput
                    selectedOption={formData.venue}
                    onChange={onChange}
                    label={'Venue'}
                    options={dropdowns.venueDropdown}
                    name={'venue'}
                    id={'venue'}
                />
            </Grid>
            <Grid item xs={12} md={5.5}>
                <SelectInput
                    selectedOption={formData.inspector}
                    onChange={onChange}
                    label={'Inspector'}
                    options={dropdowns.inspectorsDropdown}
                    name={'inspector'}
                    id={'inspector'} />
            </Grid>
            <Grid item xs={12} md={1}>
                <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
            </Grid>
        </Grid>
        <Modal
            title={'Lookup'}
            open={groupInspectorModal}
            scroll={'body'}
            handleClose={handleClose}
            contentComponent={(props) => <ContentComponent />}
        />

    </>


    )
}

export default GroupInspectorsFilter