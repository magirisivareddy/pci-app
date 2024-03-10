import { fetchVenue } from '@/actions/api'
import VenueStatusReport from '@/components/report/venue-status-report/VenueStatusReport'
import React from 'react'

const VenueStatusReportPage =async() => {
  const venues = await fetchVenue()
  return (
    <VenueStatusReport venueDropdown={venues} />
  )
}

export default VenueStatusReportPage