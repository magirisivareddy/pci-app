import { fetchInspectors, fetchVenue } from '@/actions/api';
import CustomBreadcrumbs from '@/components/common/breadcrumb/Breadcrumb'
import GroupInspectors from '@/components/group-inspectors/GroupInspectors'
import React from 'react'

const GroupinspectorsPage = async() => {
  const [venues, inspectors] = await Promise.all([fetchVenue(), fetchInspectors()]);
  return (
    <div>
      {/* <CustomBreadcrumbs/> */}
      <GroupInspectors dropdowns={{venueDropdown: venues, inspectorsDropdown: inspectors}}/>
      </div>
  )
}

export default GroupinspectorsPage