"use client";
import React, { Suspense } from 'react'
import InspectorAdmin from "../../components/inspector-admin/InspectorAdmin"
import Loading from '../loading'
import isAuth from '@/components/is-auth/IsAuth'

const InspectorAdminPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <InspectorAdmin />
    </Suspense>
  )
}


export default isAuth(InspectorAdminPage);