"use client"
import CustomTable from '@/components/common/table/Table';
import React, { useEffect, useState } from 'react'
import FailedDevicesFilter from './FailedDevicesFilter';
import { format } from 'date-fns';
import { getVenuePassFailSummaryReport } from '@/actions/api';
import { useDispatch } from 'react-redux';
import { getVenue, getInspectors } from '@/redux/features/CommonSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Box, Button } from '@mui/material';

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
    { id: 'deviceStatus', label: 'Device Status' },
    { id: 'reason', label: 'Reason' },
    { id: 'notes', label: 'Notes' },
    { id: 'inspectionType', label: 'Inspection Type' },
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
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const employeeNumber = "5860"
  const onClear = () => {
    setFormData({
      venueId: 'All',
      inspectorId: 'All'
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
    dispatch(getVenue())
    dispatch(getInspectors())
    getVenueInspectorList()
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
      'Device Type',
      'Notes',
      'Device Status',
      'Inspection Actual Date',
      'Inspector',
      'Inspection Type'
    ];
    const body: (string | undefined)[][] = data.map((device: any) => [
      device.deviceId,
      device.venueName,
      device.deviceName,
      device.deviceLocation,
      device.deviceType,
      device.notes,
      device.deviceStatus,
      device.inspectionActualDate,
      device.inspector,
      device.inspectionType
    ]);

    const csvData = [header, ...body];
    const csvFileName = 'Failed-devices-report.csv';

    const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', csvFileName);


    document.body.appendChild(link);
    link.click();
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
    <CustomTable data={data} headers={headers} isloading={isLoading} />
  </>

  )
}

export default FailedDevicesReport