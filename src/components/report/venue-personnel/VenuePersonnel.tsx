"use client"
import { getVenueInspectorReport } from '@/actions/api';
import CustomTable from '@/components/common/table/Table';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

const VenuePersonnel = () => {
  const headers = [
    { id: 'venueName', label: 'Venue Name' },
    { id: 'inspectorName', label: 'Inspector' },
  ];
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const getVenueInspectorList = async () => {
    const employeeNumber = 5860
    try {
      setLoading(true)
      const res = await getVenueInspectorReport(employeeNumber)
      setData(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getVenueInspectorList()
  }, [])
  const handleExport = () => {
    const header = [
      'Venue Name',
      'Inspector Name'
    ];
    const body: (string | undefined)[][] = data.map((venue: any) => [
      venue.venueName,
      venue.inspectorName,

    ]);

    const csvData = [header, ...body];
    const csvFileName = 'VenuePersonnelReport.csv';

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
      <CustomTable data={data} headers={headers} isloading={isLoading} />
    </>

  )
}

export default VenuePersonnel