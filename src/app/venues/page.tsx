import React from 'react'

import Venues from '@/components/venues/Venues'
import { fetchInspectors, fetchVenue } from '@/actions/api';

const VenuesPage = async() => {
  const [venues, inspectors] = await Promise.all([fetchVenue(), fetchInspectors()]);
  return (
    <Venues dropdowns={{venueDropdown: venues, inspectorsDropdown: inspectors}} />
  )
}

export default VenuesPage
