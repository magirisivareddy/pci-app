"use client";
import React from 'react'
import { Suspense } from 'react'
import Venues from '@/components/venues/Venues'

import Loading from '../loading';
import isAuth from '@/components/is-auth/IsAuth';



const VenuesPage = () => {

  return (
    <Suspense fallback={<Loading/>}>
    <Venues  />
    </Suspense>
  )
}


export default isAuth(VenuesPage);
