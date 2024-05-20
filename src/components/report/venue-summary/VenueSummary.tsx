"use client"
import { getVenueSummaryReport } from '@/actions/api';
import CustomTable from '@/components/common/table/Table';
import VenuesFilters from '@/components/report/failed-devices-report/FailedDevicesFilter';
import { getInspectors, getVenue } from '@/redux/features/CommonSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';

interface FormData {
  venueId: string;
  inspectorId: string;
}
type Dropdowns = {
  venueDropdown: any; // replace with the actual type
  inspectorsDropdown: any; // replace with the actual type
}
type VenuesProps = {
  dropdowns: Dropdowns;
}
const VenueSummary: React.FC<VenuesProps> = ({ dropdowns }) => {
  const dispatch = useAppDispatch()
  const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
  const [venueSummaryData, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const isViewList = ["Inspector", "GroupInspector", "BackupInspector", "MainInspector"]
  const [formData, setFormData] = useState<FormData>({
    venueId: 'All',
    inspectorId: 'All'
  });
  useEffect(() => {
    setFormData({
      venueId: 'All',
      inspectorId: isViewList.includes(employeeInfo?.role) ? employeeInfo.employeeNumber : 'All'
    })
  }, [employeeInfo])
  const onChange = (value: any, name: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const headers = [
    { id: 'venueName', label: 'Venue Name' },
    { id: 'deviceName', label: 'Device Name' },
    {
      id: 'deviceStatus', label: 'Device Status',
      customRender: (value: any, row: any): JSX.Element => (
        <span>

          {row.deviceStatus === 1 ? (
            <span style={{ color: "green" }}>PASS</span>
          ) : row.deviceStatus === 2 ? (
            <span style={{ color: "#ff9800" }}> QUESTIONABLE</span>
          ) : (
            <span style={{ color: "#d32f2f" }}>FAIL</span>
          )}
        </span>
      )
    },
    { id: 'notes', label: 'Notes' },
    { id: 'inspector', label: 'Inspector' },
  ];
  const getVenueInspectorList = async (
    employeeNumber: string,
    venueId?: string,
    inspectorId?: string
  ) => {
    try {
      setLoading(true)
      const res = await getVenueSummaryReport(employeeNumber, venueId, inspectorId)
      setData(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    dispatch(getVenue())
    dispatch(getInspectors())
  }, [])
  useEffect(() => {
    let inspectorId = isViewList.includes(employeeInfo?.role) ? employeeInfo.employeeNumber : ''
    const employeeNumber = employeeInfo?.employeeNumber;
    if (employeeNumber) {
      const venueId = ""
      getVenueInspectorList(employeeNumber, venueId, inspectorId)
    }
  }, [employeeInfo])
  const handelSubmit = () => {
    const employeeNumber = employeeInfo?.employeeNumber;
    let venueId = formData.venueId
    let inspectorId = isViewList.includes(employeeInfo?.role) ? employeeInfo.employeeNumber : 'All'
    if (formData.venueId === "All") {
      venueId = ""
    }
    if (formData.inspectorId === "All") {
      inspectorId = ""
    }
    getVenueInspectorList(employeeNumber, venueId, inspectorId)
  }


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
    const body = venueSummaryData.map((venue: any) => [
      venue.deviceId,
      venue.venueName,
      venue.deviceName,
      venue.deviceLocation,
      // venue.deviceType,
      venue.notes,
      venue.deviceStatus,
      venue.inspectionActualDate,
      venue.inspector,
      // venue.inspectionType
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
    const fileName = `Venue_Summary_${timestamp}.xls`;

    XLSX.writeFile(wb, fileName);
  };
  const onClear = () => {
    setFormData({
      venueId: 'All',
      inspectorId: isViewList.includes(employeeInfo?.role) ? employeeInfo.employeeNumber : 'All'
    })
  }
  return (
    <>
      <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>
        <Button onClick={handleExport} size="small" variant="outlined">
          Export to Excel
        </Button>
      </Box>
      <VenuesFilters formData={formData} handelSubmit={handelSubmit} onChange={onChange} onClear={onClear} />
      <CustomTable data={venueSummaryData} headers={headers} isloading={isLoading} />
    </>

  )
}

export default VenueSummary