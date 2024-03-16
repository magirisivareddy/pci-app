"use client"
import { getVenueSummaryReport } from '@/actions/api';
import CustomTable from '@/components/common/table/Table';
import VenuesFilters from '@/components/venues/venues-filters/VenuesFilters';
import { getInspectors, getVenue } from '@/redux/features/CommonSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
interface FormData {
  venueId: string;
  inspectorEmployeeNumber: string;
}
type Dropdowns = {
  venueDropdown: any; // replace with the actual type
  inspectorsDropdown: any; // replace with the actual type
}
type VenuesProps = {
  dropdowns: Dropdowns;
}
const VenueSummary: React.FC<VenuesProps> = ({ dropdowns }) => {
  const dispatch =useAppDispatch()
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    venueId: 'All',
    inspectorEmployeeNumber: 'All'
  });
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
      id: 'deviceStatus', label: 'Device Status', customRender: (value: any, row: any): JSX.Element => (
        <span>
          {row.deviceStatus === 1 ? (
            "PASS"
          ) : (
            "FAIL"
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
      const res = await getVenueSummaryReport(employeeNumber, venueId, "", inspectorId)
      setData(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(getVenue())
    dispatch(getInspectors())
    const employeeNumber = "5860"
    getVenueInspectorList(employeeNumber)
  }, [])
  const handelSubmit = () => {
    const employeeNumber = "5860"
    getVenueInspectorList(employeeNumber, formData.venueId, formData.inspectorEmployeeNumber)
  }

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
    const body: (string | undefined)[][] = data.map((venue: any) => [
        venue.deviceId,
        venue.venueName,
        venue.deviceName,
        venue.deviceLocation,
        venue.deviceType,
        venue.notes,
        venue.deviceStatus,
        venue.inspectionActualDate,
        venue.inspector,
        venue.inspectionType
    ]);

    const csvData = [header, ...body];
    const csvFileName = 'VenueSummary.csv';

    const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', csvFileName);


    document.body.appendChild(link);
    link.click();
};
  return (
    <>
      <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>
        <Button onClick={handleExport} size="small" variant="outlined">
          Export to Excel
        </Button>
      </Box>
      <VenuesFilters formData={formData} handelSubmit={handelSubmit} onChange={onChange} />
      <CustomTable data={data} headers={headers} isloading={isLoading} />
    </>

  )
}

export default VenueSummary