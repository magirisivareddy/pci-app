import React, { Suspense } from 'react'
import Loading from '../Loading'

const InformationPage = () => {
  return (
    <Suspense fallback={<Loading />}>
       <div>InformationPage</div>
    </Suspense>
   
  )
}

export default InformationPage