import { ThemeProvider } from '@emotion/react';
import React from 'react'
import CustomTable from '../common/table/table';

interface TableRowData {
    status: string;
    reportDate: string;
    weekNumber: number;
    venue: string;
    inspectorEmployeeNumber: string;
    totalDevices: number;
    totalQuestionableDevices: number;
    totalFailedDevices: number;
    id: number;
  }
const InspectionsTable = () => {
    const data: TableRowData[] = [
        {
          id: 1,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 2,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 3,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 4,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 5,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 6,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 7,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 8,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 9,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
        {
          id: 10,
          status: 'Active',
          reportDate: '2023-01-01',
          weekNumber: 1,
          venue: 'Location A',
          inspectorEmployeeNumber: 'EMP123',
          totalDevices: 50,
          totalQuestionableDevices: 5,
          totalFailedDevices: 2
        },
      ];
      const myHeaders = [
        { id: 'status', label: 'Status' },
        { id: 'reportDate', label: 'Report Date' },
        { id: 'weekNumber', label: 'Week' },
        { id: 'venue', label: 'Venue' },
        { id: 'inspectorEmployeeNumber ', label: 'Employee ' },
        { id: 'totalDevices', label: 'Total Devices' },
        { id: 'totalQuestionableDevices', label: 'Total Questionable Devices' },
        { id: 'totalFailedDevices', label: 'Total Failed Devices' },
    
      ];
  return (

    <CustomTable data={data} headers={myHeaders} />

  )
}

export default InspectionsTable