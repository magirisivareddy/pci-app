import React, { Suspense } from 'react'
import InspectorAdmin from "../../components/inspector-admin/InspectorAdmin"
import Loading from '../loading'

const InspectorAdminPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <InspectorAdmin />
    </Suspense>
  )
}

export default InspectorAdminPage