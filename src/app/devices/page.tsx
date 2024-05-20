"use client";
import CustomBreadcrumbs from '@/components/common/breadcrumb/Breadcrumb'
import Devices from '@/components/devices/Devices'
import React, { Suspense } from 'react'
import Loading from '../loading'
import { fetchVenue } from '@/actions/api'
import isAuth from '@/components/is-auth/IsAuth'

const DevicesPage = async() => {
  const venues = await fetchVenue();
  return (
    <div>
      {/* <CustomBreadcrumbs /> */}
      <Suspense fallback={<Loading />}>
        <Devices venueDropdown={venues} />
      </Suspense>
    </div>
  )
}

// export default DevicesPage
export default isAuth(DevicesPage);