import { fetchInspectors, fetchVenue } from '@/actions/api';
import CustomBreadcrumbs from '@/components/common/breadcrumb/Breadcrumb'
import GroupInspectors from '@/components/group-inspectors/GroupInspectors'
import React, { Suspense } from 'react'
import Loading from '../loading';

const GroupinspectorsPage = async () => {
  const [venues, inspectors] = await Promise.all([fetchVenue(), fetchInspectors()]);
  return (
    <div>
      {/* <CustomBreadcrumbs/> */}

      <Suspense fallback={<Loading />}>
        <GroupInspectors dropdowns={{ venueDropdown: venues, inspectorsDropdown: inspectors }} />
      </Suspense>
    </div>
  )
}

export default GroupinspectorsPage