"use client"

import React, { useEffect } from 'react'
import MissedInspectionFilter from './MissedInspectionFilter'
import MissedInspectionTable from './MissedInspectionTable'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getInspectors, getVenue } from '@/redux/features/CommonSlice'
import { Box, Button } from '@mui/material'
import * as XLSX from 'xlsx';
import { getInspections } from '@/redux/features/InspectionsSlice'
import { format } from 'date-fns'

const MissedInspection = () => {
  const dispatch = useAppDispatch()
  const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
  const { selectedDateRange, inspectionForm } = useAppSelector(state => state.Inspections?.inspectionFilterData)
  const { inspectionsList } = useAppSelector(state => state.Inspections)
  useEffect(() => {
    dispatch(getVenue())
    dispatch(getInspectors())

  }, []);
  useEffect(() => {
    if (employeeInfo) {
      const initialPayload = {
        FromDate: selectedDateRange[0] ? format(selectedDateRange[0], 'yyyy/MM/dd') : null,
        ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'yyyy/MM/dd') : null,
        InspectorNumber: employeeInfo?.role === "Admin" ? inspectionForm.inspector.toString() : employeeInfo?.employeeNumber?.toString(),
        ReportStatus: "missed",
        VenueId: "All",
        Is_it: employeeInfo?.role === "IT" ? "1" : "0",
        EmployeeNumber: employeeInfo?.employeeNumber,
        AdminLevel: "1"
      }
      dispatch(getInspections(initialPayload))
    }
  }, [employeeInfo])
  const handelSubmit = () => {
    const obj = {
      FromDate: selectedDateRange[0] ? format(selectedDateRange[0], 'yyyy/MM/dd') : null,
      ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'yyyy/MM/dd') : null,
      InspectorNumber: employeeInfo?.role === "Admin" ? inspectionForm.inspector.toString() : employeeInfo?.employeeNumber?.toString(),
      ReportStatus: "missed",
      VenueId: inspectionForm.venue.toString(),
      Is_it: employeeInfo?.role === "IT" ? "1" : "0",
      EmployeeNumber: employeeInfo?.employeeNumber,
      AdminLevel: "1"
    }
    dispatch(getInspections(obj))
  }



  const handleExport = () => {
    const header = [
      'Venue Id',
      'Venue Name',
      'Formatted Date Time',
      'Date Difference',
      'Week Number',
      'Inpsector LastName',
      'Inpsector FirstName',
      'Total Devices',
      'Inspector Enumber',
      'Report Id',
      'Inspected',
      'Failed',
      'Questionable',
      'Resolution Failed',
      'Resolution Questionable',
      'Report Date Time',
      'Status'
    ];
    const body = inspectionsList.map((device: any) => [
      device.venue_id,
      device.venue_name,
      device.formattedDatetime,
      device.dateDifference,
      device.weekNumber,
      device.inpsectorLastName,
      device.inpsectorFirstName,
      device.totalDevices,
      device.inspector_enumber,
      device.reportId,
      device.inspected,
      device.failed,
      device.questionable,
      device.resolutionFailed,
      device.resolutionQuestionable,
      device.reportDateTime,
      device.status,
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
    const fileName = `NQ_Missed_Inspections_${timestamp}.xls`;

    XLSX.writeFile(wb, fileName);
  };

  return (
    <>
      <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>
        <Button onClick={handleExport} size="small" variant="outlined">
          Export to Excel
        </Button>
      </Box>
      <MissedInspectionFilter
        handelSubmit={handelSubmit} />
      <MissedInspectionTable />
    </>
  )
}

export default MissedInspection