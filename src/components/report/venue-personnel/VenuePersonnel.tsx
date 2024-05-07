"use client"
import { getVenueInspectorReport } from '@/actions/api';
import CustomTable from '@/components/common/table/Table';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';

const VenuePersonnel = () => {
  const headers = [
    { id: 'venueName', label: 'Venue Name' },
    { id: 'inspectorName', label: 'Inspector' },
  ];
  const [VenuePersonnelData, setData] = useState([])
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
    const body = VenuePersonnelData.map((venue: any) => [
      venue.venueName,
      venue.inspectorName,
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
    ];
    ws['!cols'] = colWidths;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Devices');
    const currentDate = new Date();
    const timestamp = currentDate.toISOString().replace(/[-:T.]/g, '').slice(0, 14); // Get timestamp in format YYYYMMDDHHmmss
    const fileName = `Venue_Personnel_${timestamp}.xls`;
    XLSX.writeFile(wb, fileName);
  };
  return (
    <>
      <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>

        <Button onClick={handleExport} size="small" variant="outlined">
          Export to Excel
        </Button>
      </Box>
      <CustomTable data={VenuePersonnelData} headers={headers} isloading={isLoading} />
    </>

  )
}

export default VenuePersonnel