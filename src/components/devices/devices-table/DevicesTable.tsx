"use client"
import CustomTable from '@/components/common/table/Table'
import { devicesHeader } from '@/utils/table-heders'
import React from 'react'
function generateMockData(numRecords:any) {
  const mockData = [];

  for (let i = 1; i <= numRecords; i++) {
    const record = {
      id: 'commonAssetName',
      commonAssetName: `commonAssetName${i}`,
      model: `Model${i % 3 + 1}`,
      assetSerial: `SN00${i}`,
      terminalID: `TID00${i}`,
      ipAddress: `192.168.1.${i}`,
      assignedVenue: `Venue${i % 3 + 1}`,
      location: `Location${String.fromCharCode(65 + (i % 3))}`,
      action: `Action${String.fromCharCode(65 + (i % 3))}`
    };

    mockData.push(record);
  }

  return mockData;
}

const numberOfRecords = 30;
const mockData = generateMockData(numberOfRecords);
const DevicesTable = () => {
  return (
    <CustomTable data={mockData} headers={devicesHeader} isloading={false} isPagination={true} />
  )
}

export default DevicesTable