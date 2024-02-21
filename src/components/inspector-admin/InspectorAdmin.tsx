"use client"
import React from 'react'
import InspectorAdminTable from './inspector-admin-table/InspectorAdminTable'
import InspectorAdminFilter from './inspector-admin-filter/InspectorAdminFilter'

const InspectorAdmin = () => {
  return (
    <>
    <InspectorAdminFilter/>
    <InspectorAdminTable/>
    </>
  )
}

export default InspectorAdmin