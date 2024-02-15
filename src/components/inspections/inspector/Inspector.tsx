import React, { useEffect, useState } from 'react'
import TextInput from '@/components/common/input/Input'
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';

import { Box, Grid, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import DevicesTable from '../devices-table/DevicesTable'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setInitialValues, updateInspectorData } from '@/redux/features/inspectSlice';
import Modal from '@/components/common/modal/Modal';
import WhatToInspectModal from '../what-to-inspect/WhatToInspectModal';
import { fetchviewReport } from '@/actions/api';
interface Device {
    deviceId: string; // or number, depending on your data
    // other properties...
}

const Inspector = () => {
    const dispatch = useAppDispatch();
    const [isModal, setModal] = useState(false)
    const { inspectorData, selectedInspector } = useAppSelector(state => state.inspectFormData)
    const [isLoading, setLoading] = useState(true)
    const [viewReport, setViewReport] = useState<Device[]>([]);
    const inspectorHandlechange = (name: string, value: string) => {
        dispatch(updateInspectorData({ name, value }));
    }
    const handleModalClose = () => {
        setModal(false)
    }
    const handleModalOpen = () => {
        setModal(true)
    }
    const fetchDataAndSetDate = async () => {
        try {
            setLoading(true);
            dispatch(setInitialValues({ id: "", status: "", notes: "" }));
            const viewReport = await fetchviewReport(selectedInspector);
            await Promise.all(viewReport.map(async (device: { deviceId: any; }) => {
                const { deviceId } = device; // Capture the current value of deviceId
                await dispatch(setInitialValues({ id: deviceId, status: "", notes: "" }));
            }));
            setViewReport(viewReport);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAndSetDate();
    }, []);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stack textAlign={"center"} mb={2} spacing={2}>
                    <Typography color={"primary"} variant='h5' sx={{ fontWeight: "600" }} component={"h3"} >Inspector</Typography>
                </Stack>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3.3}>
                    <TextInput defaultValue={inspectorData.inspector ?? ""} onChange={inspectorHandlechange} label={'Inspector'} name={'inspector'} id={'inspector'} />
                </Grid>
                <Grid item xs={12} md={3.3}>
                    <TextInput defaultValue={inspectorData.employee ?? ""} onChange={inspectorHandlechange} label={'Employee'} name={'employee'} id={'employee'} />
                </Grid>
                <Grid item xs={12} md={3.3}>
                    <TextInput defaultValue={inspectorData.venue ?? ""} onChange={inspectorHandlechange} label={'Venue'} name={'venue'} id={'venue'} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography variant='caption' sx={{
                        display: "flex",
                        gap: "5px",
                        fontSize: " 14px",
                        fontWeight: "600",
                        justifyContent: { xs: "center", md: "flex-start" }, // Adjust justifyContent for different screen sizes
                        marginTop: { xs: "0", md: "24px" }, // Adjust marginTop for different screen sizes
                        '& span': { cursor: 'pointer' },
                    }} >What to Inspect:  <span onClick={handleModalOpen}> <ContactSupportRoundedIcon color='primary' /></span> </Typography>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', mt: "1rem" }}>
                <Stack textAlign={"center"} mb={2} spacing={2}>
                    <Typography color={"primary"} variant='h5' sx={{ fontWeight: "600" }} component={"h3"} >Devices</Typography>
                </Stack>
            </Box>
            <DevicesTable data={viewReport} isLoading={isLoading} />
            <Modal
                title={'Instruction'}
                open={isModal}
                scroll={'body'}
                handleClose={handleModalClose}
                contentComponent={WhatToInspectModal}
            />



        </>
    )
}

export default Inspector