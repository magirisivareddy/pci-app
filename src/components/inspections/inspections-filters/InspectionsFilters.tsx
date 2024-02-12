"use client"
import React from 'react'
import RangeDatePicker from '@/components/common/datepicker/DatePicker';
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';

import SelectInput from '@/components/common/input/SelectInput';
const InspectionsFilters = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const onChange = (value: any) => {
    console.log(value)
  }

  return (<>
    <form>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4} >
          <RangeDatePicker />
        </Grid>
        <Grid item xs={12} md={2}>
          <SelectInput onChange={onChange} label={'Venue'} options={["test", "test1"]} name={'venue'} id={'venue'} />
        </Grid>
        <Grid item xs={12} md={2}>
          <SelectInput label={'Inspector'} options={["test", "test1"]} name={'inspector'} id={'inspector'} />
        </Grid>
        <Grid item xs={12} md={2}>
          <SelectInput label={'Report Status'} options={["To Be Inspected", "test1"]} name={'reportStatus'} id={'reportStatus'} />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
        </Grid>
      </Grid>
    </form>
  </>


  )
}

export default InspectionsFilters