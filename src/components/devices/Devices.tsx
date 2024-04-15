"use client"
import React, { useEffect, useState } from 'react'
import DeviceFilter from './device-filter/DeviceFilter'
import DevicesTable from './devices-table/DevicesTable'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import * as XLSX from 'xlsx';
import Modal from '../common/modal/Modal'
import { clearDeviceFilterFormData, getDevices, setDeviceFilterFormData, setDeviceSelectedFormData, setDeviceHistoryInfo, setDeviceInfo } from '@/redux/features/DevicesSlice'
import DeviceAddEditForm from './device-add-edit-form/DeviceAddEditForm'
import DeviceHistory from './device-history/DeviceHistory'
import { searchDevices } from '@/actions/api'
import { Alert, Box, Button } from '@mui/material'
import Loading from '@/app/loading'
import { getInspectors, getVenue } from '@/redux/features/CommonSlice'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DeviceDeleteModal from './device-delete-modal/DeviceDeleteModal'

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
  const { devicesInfo, deviceHistory, deviceSelectedFormData, formData, devicesData } = useAppSelector(state => state.devices)
  const { deviceModalType, isDeviceModal, deviceLocationErrorMessage, deviceLocationStatus, deviceLocationSuccessMessage,deleteDeviceModal } = devicesInfo
  const { isDeviceHistoryModal } = deviceHistory
  useEffect(() => {
    dispatch(clearDeviceFilterFormData())
    const obj = {
      "is_It": "1",
      "venueId": "All",
      "commonAssetName": "",
      "serialNumber": "",
      "assetNumber": "",
      "terminalId": "",
      "profileId": "",
      "employeeNumber": "3752"
    }
    dispatch(getVenue())
    dispatch(getInspectors())
    dispatch(getDevices(obj))
  }, []);
  const handelSearchDevices = () => {
    const obj: any = {
      ...formData, employeeNumber: "3752", is_It: "1"
    }
    Object.keys(obj).forEach(key => {
      obj[key] = String(obj[key]);
    });
    dispatch(getDevices(obj))
  }
  const onChange = (value: any, name: any) => {
    dispatch(setDeviceFilterFormData({ value, name }));
  }
  const handleClose = () => {
    dispatch(setDeviceInfo({
      isDeviceModal: false,
      deviceModalType: ""
    }))
    dispatch(setDeviceHistoryInfo(false))
    dispatch(setDeviceSelectedFormData(null))
  }
  const addDevice = () => {
    dispatch(clearDeviceFilterFormData())
    dispatch(
      setDeviceInfo({
        isDeviceModal: true,
        deviceModalType: 'Add'
      })
    );
  };
  const handleExport = () => {
    const header = [
      'Device Id',
      'Venue Id',
      'Venue Name',
      'Common AssetName',
      'Asset Number',
      'Manufacturer',
      'Vendor',
      'Model Number',
      'Serial Number',
      'Device Location',
      'Terminal Id',
      'Profile Id',
      'Ip Address',
      'Slot Number',
      'Was Deleted',
      'Pci Labeled',
      'Deleted Date',
      'Is Labeled',
      'Is LabeledExcel'
    ];

    const body = devicesData.map((device: any) => [
      device.deviceId,
      device.venueId,
      device.venueName,
      device.commonAssetName,
      device.assetNumber,
      device.manufacturer,
      device.vendor,
      device.modelNumber,
      device.serialNumber,
      device.deviceLocation,
      device.terminalId,
      device.profileId,
      device.ipAddress,
      device.slotNumber,
      device.wasDeleted,
      device.pciLabeled,
      device.deletedDate,
      device.isLabeled,
      device.isLabeledExcel
    ]);

    const data = [header, ...body];
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Make header row bold
    const headerStyle = { font: { bold: true } };
    for (let col = 0; col < header.length; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellRef].s) ws[cellRef].s = {};
      Object.assign(ws[cellRef].s, headerStyle); // Apply bold style
    }

    // Set fixed width for columns
    const colWidths = [ // Adjust column widths as needed
      { wpx: 100 }, // Device Id
      { wpx: 100 }, // Venue Id
      { wpx: 150 }, // Venue Name
      { wpx: 200 }, // Common AssetName
      { wpx: 120 }, // Asset Number
      { wpx: 150 }, // Manufacturer
      { wpx: 150 }, // Vendor
      { wpx: 150 }, // Model Number
      { wpx: 150 }, // Serial Number
      { wpx: 200 }, // Device Location
      { wpx: 120 }, // Terminal Id
      { wpx: 120 }, // Profile Id
      { wpx: 150 }, // Ip Address
      { wpx: 100 }, // Slot Number
      { wpx: 100 }, // Was Deleted
      { wpx: 100 }, // Pci Labeled
      { wpx: 150 }, // Deleted Date
      { wpx: 100 }, // Is Labeled
      { wpx: 150 }, // Is LabeledExcel
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Devices');

    const currentDate = new Date();
    const timestamp = currentDate.toISOString().replace(/[-:T.]/g, '').slice(0, 14); // Get timestamp in format YYYYMMDDHHmmss
    const fileName = `NQ_PCI_Devices_${timestamp}.xls`;

    XLSX.writeFile(wb, fileName);
  };
  return (
    <>
      {deviceLocationStatus && <Loading />}
      <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>
        <Button onClick={addDevice} size="small" variant="outlined">
          Add Device
        </Button>
        <Button onClick={handleExport} size="small" variant="outlined">
          Export to Excel
        </Button>
        {/* <span style={{ cursor: "pointer" }}>
          <PrintOutlinedIcon color='primary' />
        </span> */}
      </Box>
      <DeviceFilter
        onChange={onChange}
        handelSubmit={handelSearchDevices}
      />
      {deviceLocationSuccessMessage && <Alert sx={{ marginTop: "20px", marginBottom: "20px" }} variant="filled" severity="success">
        {deviceLocationSuccessMessage}
      </Alert>}

      {deviceLocationErrorMessage && <Alert sx={{ marginTop: "20px", marginBottom: "20px" }} variant="filled" severity="error">
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
        title={`Device History: ${deviceSelectedFormData?.commonAssetName} , ${deviceSelectedFormData?.modelNumber}`}
        open={isDeviceHistoryModal}
        maxWidth="md"
        scroll={'body'}
        contentComponent={DeviceHistory}
        handleClose={handleClose}
      />
           <Modal
                title={`Delete Device`}
                open={deleteDeviceModal}
                scroll={"body"}
                handleClose={handleClose}
                contentComponent={DeviceDeleteModal}
                maxWidth='sm'
                fullWidth={true}

            />
    </>
  )
}

export default Devices