"use client"
import CustomTable from '@/components/common/table/Table';
import React from 'react'

const DeviceLogReport = () => {
    const mockData = [
        {
          deviceName: 'Device 3',
          deviceType: 'Type C',
          status: 'Active',
          itPersonnel: 'John Doe',
          reportedDate: '2024-03-08',
        },
        {
          deviceName: 'Device 4',
          deviceType: 'Type D',
          status: 'Inactive',
          itPersonnel: 'Jane Smith',
          reportedDate: '2024-03-09',
        },
        // Add more mock data as needed
      ];
      
      const headers = [
        { id: 'deviceName', label: 'Device Name' },
        { id: 'deviceType', label: 'Device Type' },
        { id: 'status', label: 'Status' },
        { id: 'itPersonnel', label: 'IT Personnel' },
        { id: 'reportedDate', label: 'Reported Date' },
      ];
      

    return (
        <div>
            <CustomTable data={mockData} headers={headers}  />

        </div>
    )
}

export default DeviceLogReport