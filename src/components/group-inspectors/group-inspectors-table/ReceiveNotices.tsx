import { Checkbox } from '@mui/material'
import React from 'react'

export const ReceiveNotices = ({ row }: any) => {
  const onChangeNotice = () => {

  }
  const label = { inputProps: { 'aria-label': 'receive notices' } };
  return (
    <div>
      <Checkbox sx={{ paddingTop: "0", paddingBottom: "0" }} {...label} checked={row.receive_notices === "1" ? true : false} />
    </div>
  )
}
