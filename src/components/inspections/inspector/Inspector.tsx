import React from 'react'
import TextInput from '@/components/common/input/Input'

import { Box, Grid, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import DevicesTable from '../devices-table/DevicesTable'

const Inspector = () => {

    const data = [
        {
            device: "Credit Card Terminal",
            serial: "1707134282",
            location: "Tyson merchand ",
            status: 'pass',
            notes: '',
            id: 1
        },
        {
            device: "Desktop",
            serial: "1707134282J45766",
            location: "Tyson merchand ",
            status: 'fail',
            notes: '',
            id: 2
        },
        {
            device: "Laptop",
            serial: "1707134282Test",
            location: "Tyson merchand ",
            status: 'Questionable',
            notes: 'Test',
            id: 3
        }
    ]
    return (
        <>

            <Box sx={{ width: '100%' }}>
                <Stack textAlign={"center"} spacing={2}>
                    <Typography color={"primary"} component={"h3"} >Inspector</Typography>
                </Stack>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <TextInput label={'Inspector'} name={'inspector'} id={'inspector'} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextInput label={'Employee'} name={'employee'} id={'employee'} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextInput label={'Venue'} name={'venue'} id={'venue'} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextInput label={'What to Inspect'} name={'whatToInspect'} id={'whatToInspect'} />
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', mt: "1rem" }}>
                <Stack textAlign={"center"} spacing={2}>
                    <Typography color={"primary"} component={"h3"} >Devices</Typography>
                </Stack>
            </Box>
            <DevicesTable data={data} />

        </>
    )
}

export default Inspector