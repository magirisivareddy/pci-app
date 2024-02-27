import React from 'react'
import { Suspense } from 'react'
import Venues from '@/components/venues/Venues'
import { fetchInspectors, fetchVenue } from '@/actions/api';
import Loading from '../loading';


const VenuesPage = async() => {
  const [venues, inspectors] = await Promise.all([fetchVenue(), fetchInspectors()]);
  return (
    <Suspense fallback={<Loading/>}>
    <Venues dropdowns={{venueDropdown: venues, inspectorsDropdown: inspectors}} />
    </Suspense>
  )
}

export default VenuesPage
