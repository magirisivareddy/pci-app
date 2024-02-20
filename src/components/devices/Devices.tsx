"use client"
import React from 'react'
import DeviceFilter from './device-filter/DeviceFilter'
import DevicesTable from './devices-table/DevicesTable'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Modal from '../common/modal/Modal'
import { setDeviceHistoryInfo, setDeviceInfo } from '@/redux/features/devicesSlice'
import DeviceAddEditForm from './device-add-edit-form/DeviceAddEditForm'
import DeviceHistory from './device-history/DeviceHistory'

const Devices = () => {
  const dispatch = useAppDispatch();
  const { devicesInfo, deviceHistory, deviceFormData } = useAppSelector(state => state.devices)
  const { deviceModalType, isDeviceModal } = devicesInfo
  const { isDeviceHistoryModal } = deviceHistory
  const handleClose = () => {
    dispatch(setDeviceInfo({
      isDeviceModal: false,
      deviceModalType: ""
    }))
    dispatch(setDeviceHistoryInfo(false))
  }
  return (
    <>
      <DeviceFilter />
      <DevicesTable />
      <Modal
        title={deviceModalType === "Add" ? "Add Device" : "Edit Device"}
        open={isDeviceModal}
        maxWidth="md"
        scroll={'body'}
        contentComponent={DeviceAddEditForm}
        handleClose={handleClose}
      />
      <Modal
        title={`Device History: ${deviceFormData?.commonAssetName} , ${deviceFormData?.model}`}
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