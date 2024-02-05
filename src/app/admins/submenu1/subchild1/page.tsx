"use client"
import CustomBreadcrumbs from '@/components/common/breadcrumb/Breadcrumb'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const params = useParams<{ tag: string; item: string }>()
    console.log("params", params)
    return (
        <div>
            <CustomBreadcrumbs />
            <p>sub child page</p>
        </div>
    )
}

export default page