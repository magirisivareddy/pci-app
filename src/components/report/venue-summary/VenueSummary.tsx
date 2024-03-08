"use client"
import { getVenueSummaryReport } from '@/actions/api';
import CustomTable from '@/components/common/table/Table';
import VenuesFilters from '@/components/venues/venues-filters/VenuesFilters';
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
    const employeeNumber = "5860"
    getVenueInspectorList(employeeNumber)
  }, [])
  const handelSubmit = () => {
    const employeeNumber = "5860"
    getVenueInspectorList(employeeNumber, formData.venueId, formData.inspectorEmployeeNumber)
  }
  console.log("isLoading", isLoading)
  return (
    <>
      <VenuesFilters dropdowns={dropdowns} formData={formData} handelSubmit={handelSubmit} onChange={onChange} />
      <CustomTable data={data} headers={headers} isloading={isLoading} />
    </>

  )
}

export default VenueSummary