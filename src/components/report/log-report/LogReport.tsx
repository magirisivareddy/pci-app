"use client"
import CustomTable from '@/components/common/table/Table';
import { format } from 'date-fns';
import React from 'react'

const LogReport = () => {
    const mockData = [
        {
          inspectionType: 'Routine',
          venueName: 'Venue C',
          deviceName: 'Device 5',
          inspector: 'Alice Johnson',
          inspectedDateTime: '2024-03-10T08:30:00',
          recordCaptureDateTime: '2024-03-10T09:00:00',
        },
        {
          inspectionType: 'Emergency',
          venueName: 'Venue D',
          deviceName: 'Device 6',
          inspector: 'Bob Williams',
          inspectedDateTime: '2024-03-11T10:45:00',
          recordCaptureDateTime: '2024-03-11T11:15:00',
        },
        // Add more mock data as needed
      ];
      
      const headers = [
        { id: 'inspectionType', label: 'Inspection Type' },
        { id: 'venueName', label: 'Venue Name' },
        { id: 'deviceName', label: 'Device Name' },
        { id: 'inspector', label: 'Inspector' },
        { id: 'inspectedDateTime', label: 'Inspected Actual Date/Time',customRender: (value: any, row: any): JSX.Element => (
          <span>
            {format(row.inspectedDateTime, 'dd/MM/yyyy hh:mm a')}
          </span>
        ) },
        { id: 'recordCaptureDateTime', label: 'Record / Capture Date/Time',customRender: (value: any, row: any): JSX.Element => (
          <span>
            {format(row.recordCaptureDateTime, 'dd/MM/yyyy hh:mm a')}
          </span>
        ) },
      ];
      
      return (
        <CustomTable data={mockData} headers={headers} />
      )
    }

export default LogReport