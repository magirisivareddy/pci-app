import { fetchInspectors, fetchVenue } from '@/actions/api';
import VenueSummary from '@/components/report/venue-summary/VenueSummary'
import React from 'react'

const VenueSummaryPage = async () => {
  const [venues, inspectors] = await Promise.all([fetchVenue(), fetchInspectors()]);
  return (
    <VenueSummary dropdowns={{ venueDropdown: venues, inspectorsDropdown: inspectors }} />
  )
}

export default VenueSummaryPage