"use client"

import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import { downloadExcel } from 'react-export-table-to-excel';
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDeviceInfo } from '@/redux/features/devicesSlice';

interface FormData {
  commonAssetName: string;
  assignedVenue: string;
  asset: string;
  serial: string;
  terminalId: string;
  profileId: string
}
const DeviceFilter = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { header, body } = useAppSelector(state => state.export.value)
  const [formData, setFormData] = useState<FormData>({
    commonAssetName: 'All',
    assignedVenue: 'All',
    asset: '',
    serial: '',
    terminalId: '',
    profileId: ''
  });
  const onChange = (value: any, name: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const addDevice = () => {
    dispatch(setDeviceInfo({
      isDeviceModal: true,
      deviceModalType: "Add"
    }))
  }
  const handelSubmit = (event: any) => { }
  const handleExport = () => {
    downloadExcel({
      fileName: "devices",
      sheet: "data",
      tablePayload: {
        header,
        body
      }
    });
  };
  return (
    <>
      <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>
        <Button onClick={() => addDevice()} size="small" variant="outlined">Add Device</Button>
        <Button onClick={handleExport} size="small" variant="outlined">Export to Excel</Button>
      </Box>
      <Grid container spacing={2} mb={2}>

        <Grid item xs={12} md={1.8}>
          <SelectInput
            selectedOption={formData.commonAssetName}
            onChange={onChange}
            label={'Common Asset Name'}
            options={[
              { label: "Inspected", value: "inspected" },
              { label: "Missed Inspection", value: "missed_inspection" },
              { label: "Inspected: Not Resolved", value: "inspected_not_resolved" },
              { label: "To Be Inspected", value: "to_be_inspected" }
            ]}
            name={'commonAssetName'}
            id={'commonAssetName'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <SelectInput
            selectedOption={formData.assignedVenue}
            onChange={onChange}
            label={'Assigned Venue'}
            options={[
              { label: "Inspected", value: "inspected" },
              { label: "Missed Inspection", value: "missed_inspection" },
              { label: "Inspected: Not Resolved", value: "inspected_not_resolved" },
              { label: "To Be Inspected", value: "to_be_inspected" }
            ]}
            name={'assignedVenue'}
            id={'assignedVenue'} />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.asset ?? ""}
            onChange={onChange}
            label={'Asset'}
            name={'asset'}
            id={'asset'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.serial ?? ""}
            onChange={onChange}
            label={'Serial'}
            name={'serial'}
            id={'serial'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.terminalId ?? ""}
            onChange={onChange}
            label={'Terminal id'}
            name={'terminalId'}
            id={'terminalId'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.profileId ?? ""}
            onChange={onChange}
            label={'Profile id'}
            name={'profileId'}
            id={'profileId'}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
        </Grid>
      </Grid>
    </>


  )
}

export default DeviceFilter