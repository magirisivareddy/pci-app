"use client"
import React, { Suspense } from 'react'
import Loading from '../loading'
import Information from '@/components/information/Information'

const InformationPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Information />
    </Suspense>

  )
}

export default InformationPage