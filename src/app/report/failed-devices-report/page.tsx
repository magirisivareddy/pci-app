import { fetchInspectors, fetchVenue } from '@/actions/api';
import FailedDevicesReport from '@/components/report/failed-devices-report/FailedDevicesReport'
import React from 'react'

const FailedDevicesReportPage = async() => {
  const [venues, inspectors] = await Promise.all([fetchVenue(), fetchInspectors()]);
  return (
    <FailedDevicesReport dropdowns={{ venueDropdown: venues, inspectorsDropdown: inspectors }} />
  )
}

export default FailedDevicesReportPage