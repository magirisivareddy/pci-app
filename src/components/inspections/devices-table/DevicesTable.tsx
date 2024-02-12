import React from 'react'
import { fetchDataById } from '@/actions/api'
import CustomTable from '@/components/common/table/Table'
import { inspectionDeviceHeader } from '@/utils/table-heders'
import { useAppDispatch } from '@/redux/hooks'

const DevicesTable = ({ data }: any) => {
  const dispatch = useAppDispatch();
  return (
    <CustomTable data={data} headers={inspectionDeviceHeader} dispatch={dispatch} isloading={false} isPagination={false} />
  )
}

export default DevicesTable