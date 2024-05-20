"use client"
import CustomTable from '@/components/common/table/Table';
import React, { useEffect, useState } from 'react'
import FailedDevicesFilter from './FailedDevicesFilter';
import { format } from 'date-fns';
import { getVenuePassFailSummaryReport } from '@/actions/api';
import { useDispatch } from 'react-redux';
import { getVenue, getInspectors } from '@/redux/features/CommonSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Box, Button } from '@mui/material';
import * as XLSX from 'xlsx';

type Dropdowns = {
  venueDropdown: any; // replace with the actual type
  inspectorsDropdown: any; // replace with the actual type
}


interface TableRowData {
  inspectorDetails: any;
  id: number;
  venue: string;
  totalDevices: number;
}

interface FormData {
  venueId: string;
  inspectorId: string;
}
const FailedDevicesReport = () => {


  const headers = [
    { id: 'venueName', label: 'Venue Name' },
    { id: 'deviceName', label: 'Device Name' },
    {
      id: 'deviceStatus', label: 'Device Status', customRender: (value: any, row: any): JSX.Element => (
        <span>
          {row.deviceStatus === -1 ? <span style={{ color: "#d32f2f" }}> FAIL</span> : ""}
        </span>
      )
    },
    { id: 'reason', label: 'Reason' },
    { id: 'notes', label: 'Notes' },

    { id: 'inspector', label: 'Inspector' },
    {
      id: 'inspectionActualDate', label: 'Inspection Actual Date', customRender: (value: any, row: any): JSX.Element => (
        <span>
          {format(row.inspectionActualDate, 'dd/MM/yyyy hh:mm a')}
        </span>
      )
    },
  ];
  const [formData, setFormData] = useState<FormData>({
    venueId: 'All',
    inspectorId: 'All'
  });
  const dispatch = useAppDispatch()
  const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
  const [failedDevicesReportData, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const employeeNumber = employeeInfo?.employeeNumber
  const isViewList = ["Inspector", "GroupInspector", "BackupInspector", "MainInspector"]
  useEffect(() => {
    setFormData({
      venueId: 'All',
      inspectorId: isViewList.includes(employeeInfo?.role) ? employeeInfo.employeeNumber : 'All'
    })
  }, [employeeInfo])
  const onClear = () => {
    setFormData({
      venueId: 'All',
      inspectorId: isViewList.includes(employeeInfo?.role) ? employeeInfo.employeeNumber : 'All'
    })
  }
  const getVenueInspectorList = async (
    venueId?: string,
    inspectorId?: string
  ) => {
    try {
      setLoading(true)
      const res = await getVenuePassFailSummaryReport(employeeNumber, venueId, inspectorId)
      setData(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (employeeNumber) {
      let venueId = formData.venueId
      let inspectorId = formData.inspectorId
      if (formData.venueId === "All") {
        venueId = "" 
      }
      if (formData.inspectorId === "All") {
        inspectorId = ""
      }
      getVenueInspectorList(venueId, inspectorId)
    }
  }, [employeeNumber])
  useEffect(() => {
    dispatch(getVenue())
    dispatch(getInspectors())
  }, [])
  const onChange = (value: any, name: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handelSubmit = () => {
    let venueId = formData.venueId
    let inspectorId = formData.inspectorId
    if (formData.venueId === "All") {
      venueId = ""
    }
    if (formData.inspectorId === "All") {
      inspectorId = ""
    }
    getVenueInspectorList(venueId, inspectorId);
  };

  const handleExport = () => {
    const header = [
      'Device Id',
      'Venue Name',
      'Device Name',
      'Device Location',
      // 'Device Type',
      'Notes',
      'Device Status',
      'Inspection Actual Date',
      'Inspector',
      // 'Inspection Type'
    ];
    const body = failedDevicesReportData.map((device: any) => [
      device.deviceId,
      device.venueName,
      device.deviceName,
      device.deviceLocation,
      // device.deviceType,
      device.notes,
      device.deviceStatus,
      device.inspectionActualDate,
      device.inspector,
      // device.inspectionType
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
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
    ];
    ws['!cols'] = colWidths;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Devices');
    const currentDate = new Date();
    const timestamp = currentDate.toISOString().replace(/[-:T.]/g, '').slice(0, 14); // Get timestamp in format YYYYMMDDHHmmss
    const fileName = `Failed_Devices_Report${timestamp}.xls`;
    XLSX.writeFile(wb, fileName);
  };
  return (<>
    <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>
      <Button onClick={handleExport} size="small" variant="outlined">
        Export to Excel
      </Button>
    </Box>
    <FailedDevicesFilter
      formData={formData}
      handelSubmit={handelSubmit}
      onClear={onClear}
      onChange={onChange}
    />
    <CustomTable data={failedDevicesReportData} headers={headers} isloading={isLoading} />
  </>

  )
}

export default FailedDevicesReport