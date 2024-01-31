"use client"
import React from 'react'
import { usePathname } from 'next/navigation';

import CustomSeparator from '@/components/common/breadcrumb/Breadcrumb'

const InspectionsFilters = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(p => p);


    return (<>
    <CustomSeparator/>
      <p>InspectionsFilters</p>
    </>


    )
}

export default InspectionsFilters