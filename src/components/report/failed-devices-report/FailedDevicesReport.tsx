"use client"
import CustomTable from '@/components/common/table/Table';
import React, { useState } from 'react'
import FailedDevicesFilter from './FailedDevicesFilter';
import { format } from 'date-fns';

type Dropdowns = {
  venueDropdown: any; // replace with the actual type
  inspectorsDropdown: any; // replace with the actual type
}

type VenuesProps = {
  dropdowns: Dropdowns;
}
interface TableRowData {
  inspectorDetails: any;
  id: number;
  venue: string;
  totalDevices: number;
}

interface FormData {
  venueId: string;
  inspectorEmployeeNumber: string;
}
const FailedDevicesReport: React.FC<VenuesProps> = ({ dropdowns }) => {
  const mockData = [
    {
      venueName: 'Venue G',
      deviceName: 'Device 7',
      deviceStatus: 'Active',
      reason: 'Routine maintenance',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      inspectionType: 'Routine',
      inspector: 'Eva Williams',
      inspectionActualDate: '2024-03-12T14:00:00',
    },
    {
      venueName: 'Venue H',
      deviceName: 'Device 8',
      deviceStatus: 'Inactive',
      reason: 'Technical issue',
      notes: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      inspectionType: 'Emergency',
      inspector: 'Frank Johnson',
      inspectionActualDate: '2024-03-13T15:30:00',
    },
    // Add more mock data as needed
  ];

  const headers = [
    { id: 'venueName', label: 'Venue Name' },
    { id: 'deviceName', label: 'Device Name' },
    { id: 'deviceStatus', label: 'Device Status' },
    { id: 'reason', label: 'Reason' },
    { id: 'notes', label: 'Notes' },
    { id: 'inspectionType', label: 'Inspection Type' },
    { id: 'inspector', label: 'Inspector' },
    { id: 'inspectionActualDate', label: 'Inspection Actual Date',customRender: (value: any, row: any): JSX.Element => (
      <span>
        {format(row.inspectionActualDate, 'dd/MM/yyyy hh:mm a')}
      </span>
    ) },
  ];
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
const handelSubmit = () => {}
  return (<>
    <FailedDevicesFilter dropdowns={dropdowns} formData={formData} handelSubmit={handelSubmit} onChange={onChange} />
    <CustomTable data={mockData} headers={headers} />
  </>

  )
}

export default FailedDevicesReport