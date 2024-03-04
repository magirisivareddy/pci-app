"use client"

import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import { downloadExcel } from 'react-export-table-to-excel';
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDeviceInfo } from '@/redux/features/DevicesSlice';


const DeviceFilter = ({ venueDropdown, formData, onChange,handelSubmit }: any) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { header, body } = useAppSelector(state => state.export.value)

  const addDevice = () => {
    dispatch(setDeviceInfo({
      isDeviceModal: true,
      deviceModalType: "Add"
    }))
  }

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
              { label: "Apple Pay Change Point", value: "Apple Pay Change Point" },
              { label: "ATM", value: "ATM" },
              { label: "Credit card terminal", value: "Credit card terminal" },
              { label: "Desktop, Laptop, Tablet", value: "Desktop, Laptop, Tablet" },
              { label: "Fastbar CC Reader", value: "Fastbar CC Reader" },
              { label: "Fastbar POS", value: "Fastbar POS" },
              { label: "POS Card Reader", value: "POS Card Reader" },
              { label: "POS System", value: "POS System" },
              { label: "Receipt Printer", value: "Receipt Printer" },
              { label: "USB credit card swiper", value: "USB credit card swiper" },
            ]}
            name={'commonAssetName'}
            id={'commonAssetName'} size={'small'} />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <SelectInput
            selectedOption={formData.venueId}
            onChange={onChange}
            label={'Assigned Venue'}
            options={venueDropdown}
            name={'venueId'}
            id={'venueId'} size={'small'} />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.assetNumber ?? ""}
            onChange={onChange}
            label={'Asset'}
            name={'assetNumber'}
            id={'assetNumber'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.serialNumber ?? ""}
            onChange={onChange}
            label={'Serial'}
            name={'serialNumber'}
            id={'serialNumber'}
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