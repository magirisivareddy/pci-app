"use client"
import { getVenueInspectorReport } from '@/actions/api';
import CustomTable from '@/components/common/table/Table';
import React, { useEffect, useState } from 'react'

const VenuePersonnel = () => {


  const headers = [
    { id: 'venueName', label: 'Venue Name' },
    { id: 'inspectorName', label: 'Inspector' },
  ];
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const getVenueInspectorList = async () => {
    const employeeNumber = "5860"
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

  return (
    <CustomTable data={data} headers={headers} isloading={isLoading} />
  )
}

export default VenuePersonnel