import { Checkbox } from '@mui/material'
import React from 'react'

export const ReceiveNotices = ({ row }: any) => {
  console.log("row", row)
  const onChangeNotice = () => {

  }
  const label = { inputProps: { 'aria-label': 'receive notices' } };
  return (
    <div>
      <Checkbox sx={{paddingTop:"0",paddingBottom:"0"}} {...label} checked={row.receive_notices === "Yes" ? true : false} />
    </div>
  )
}
