import React from 'react'
import { GroupInspectorsTable } from './group-inspectors-table/GroupInspectorsTable'
import GroupInspectorsFilter from './group-inspectors-filter/GroupInspectorsFilter'
type Dropdowns = {
  venueDropdown: any; // replace with the actual type
  inspectorsDropdown: any; // replace with the actual type
}
type VenuesProps = {
  dropdowns: Dropdowns;
}
  const GroupInspectors: React.FC<VenuesProps> = ({ dropdowns }) => {

  return (
    <div>
      <GroupInspectorsFilter dropdowns={dropdowns}  />
      <GroupInspectorsTable venues={dropdowns.venueDropdown} />
    </div>
  )
}

export default GroupInspectors