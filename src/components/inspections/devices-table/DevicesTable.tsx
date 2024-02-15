import React from 'react'
import CustomTable from '@/components/common/table/Table'
import { inspectionDeviceHeader } from '@/utils/table-heders'


const DevicesTable = ({ data ,isLoading}: any) => {

  return (
    <CustomTable data={data} headers={inspectionDeviceHeader} isloading={isLoading} isPagination={true} />
  )
}

export default DevicesTable