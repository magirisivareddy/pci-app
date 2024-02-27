import CustomBreadcrumbs from '@/components/common/breadcrumb/Breadcrumb'
import Devices from '@/components/devices/Devices'
import React, { Suspense } from 'react'
import Loading from '../loading'

const DevicesPage = () => {
  return (
    <div>
      {/* <CustomBreadcrumbs /> */}
      <Suspense fallback={<Loading />}>
        <Devices />
      </Suspense>
    </div>
  )
}

export default DevicesPage