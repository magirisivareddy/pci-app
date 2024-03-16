"use client"
import React, { useEffect, useState } from 'react'
import DeviceFilter from './device-filter/DeviceFilter'
import DevicesTable from './devices-table/DevicesTable'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Modal from '../common/modal/Modal'
import { getDevices, setDeviceFormData, setDeviceHistoryInfo, setDeviceInfo } from '@/redux/features/DevicesSlice'
import DeviceAddEditForm from './device-add-edit-form/DeviceAddEditForm'
import DeviceHistory from './device-history/DeviceHistory'
import { searchDevices } from '@/actions/api'
import { Alert } from '@mui/material'
import Loading from '@/app/loading'
import { getInspectors, getVenue } from '@/redux/features/CommonSlice'

interface FormData {
  commonAssetName: string;
  venueId: string;
  assetNumber: string;
  serialNumber: string;
  terminalId: string;
  profileId: string;
}
const Devices = ({ venueDropdown }: any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    commonAssetName: '',
    venueId: 'All',
    assetNumber: '',
    serialNumber: '',
    terminalId: '',
    profileId: ''
  });



  useEffect(() => {
    const obj = {
      "is_It": "1",
      "venueId": "All",
      "commonAssetName": "",
      "serialNumber": "",
      "assetNumber": "",
      "terminalId": "",
      "profileId": "",
      "employeeNumber": "789"
    }
    dispatch(getVenue())
    dispatch(getInspectors())
    dispatch(getDevices(obj))
  }, []);
  const handelSearchDevices = () => {
    const obj: any = {
      ...formData, employeeNumber: "789", is_It: "1"
    }
    Object.keys(obj).forEach(key => {
      obj[key] = String(obj[key]);
    });
    dispatch(getDevices(obj))

  }
  const onChange = (value: any, name: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const { devicesInfo, deviceHistory, deviceFormData } = useAppSelector(state => state.devices)
  const { deviceModalType, isDeviceModal, deviceLocationErrorMessage, deviceLocationStatus, deviceLocationSuccessMessage } = devicesInfo
  const { isDeviceHistoryModal } = deviceHistory
  const handleClose = () => {
    dispatch(setDeviceInfo({
      isDeviceModal: false,
      deviceModalType: ""
    }))
    dispatch(setDeviceHistoryInfo(false))
    dispatch(setDeviceFormData(null))
  }

  return (
    <>
    {deviceLocationStatus && <Loading/>}
      <DeviceFilter
        formData={formData}
        onChange={onChange}
        handelSubmit={handelSearchDevices}
      />
      {deviceLocationSuccessMessage && <Alert sx={{ marginTop: "20px", marginBottom:"20px" }} variant="filled" severity="success">
        {deviceLocationSuccessMessage}
      </Alert>}

      {deviceLocationErrorMessage && <Alert sx={{ marginTop: "20px",marginBottom:"20px"  }} variant="filled" severity="error">
        {deviceLocationErrorMessage}
      </Alert>}
      <DevicesTable />
      <Modal
        title={deviceModalType === "Add" ? "Add Device" : "Edit Device"}
        open={isDeviceModal}
        maxWidth="md"
        scroll={'body'}
        contentComponent={(props) => <DeviceAddEditForm {...props} />}
        handleClose={handleClose}
      />
      <Modal
        title={`Device History: ${deviceFormData?.commonAssetName} , ${deviceFormData?.modelNumber}`}
        open={isDeviceHistoryModal}
        maxWidth="md"
        scroll={'body'}
        contentComponent={DeviceHistory}
        handleClose={handleClose}
      />
    </>
  )
}

export default Devices