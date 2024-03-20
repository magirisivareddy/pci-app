import { receiveNoticesGroupInspector } from '@/actions/api';
import { getGroupInspectors, setReceiveNoticeLoading, setReceiveNoticeStatus, setReceiveNoticeStatusError } from '@/redux/features/GroupInspectorsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Checkbox } from '@mui/material'
import React, { useState } from 'react'

export const ReceiveNotices = ({ row }: any) => {
  const dispatch = useAppDispatch()
  const defaultNoticeValue = row.recieveNotes === 1;
  const [notices, setNotices] = useState(defaultNoticeValue);
  const onChangeNotice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotices(e.target.checked);
    receiveNoticesGroup()
  };
  const receiveNoticesGroup = async () => {
    dispatch(setReceiveNoticeLoading(true))
    try {
      const res = await receiveNoticesGroupInspector(row.inspectorId)
      dispatch(setReceiveNoticeStatus(res.message))
      dispatch(setReceiveNoticeLoading(false))
      const obj = {
        venueId: 'All',
        inspectorEmployeeNumber: 'All',
        is_It: '1'
      };
      dispatch(getGroupInspectors(obj));
      setTimeout(()=>{
        dispatch(setReceiveNoticeStatus(""))
      },2000)
      
    } catch (error:any) {
     
      dispatch(setReceiveNoticeStatusError(error.message))
      setTimeout(()=>{
        setNotices(defaultNoticeValue);
        dispatch(setReceiveNoticeStatusError(""))
      },3000)
    
      dispatch(setReceiveNoticeLoading(false))
    }
  }
  const label = { inputProps: { 'aria-label': 'receive notices' } };

  return (
    <div>
      <Checkbox
        onChange={onChangeNotice}
        sx={{ paddingTop: "0", paddingBottom: "0" }}
        {...label}
        checked={notices}
      />
    </div>
  );
};
