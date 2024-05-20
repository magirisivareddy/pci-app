"use client"
import React, { useEffect, useState } from 'react'
import InspectorAdminTable from './inspector-admin-table/InspectorAdminTable'
import InspectorAdminFilter from './inspector-admin-filter/InspectorAdminFilter'
import { clearInspectorAdminFilterFormData, getAdminList, setInspectorAdminFilterFormData } from '@/redux/features/InspectorAdminSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert } from '@mui/material'

const InspectorAdmin = () => {
  const dispatch = useAppDispatch()
  const { adminLevelStatus, formData } = useAppSelector(state => state.inspectorAdmin.inspectorAdminInfo)
  const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
  const onChange = (value: any, name: any) => {
    dispatch(setInspectorAdminFilterFormData({ value, name }))
  }
  useEffect(() => {
    dispatch(clearInspectorAdminFilterFormData())
    const obj =
    {
      "lastName": "",
      "firstName": "",
      "badgeNumber": "",
      "employeeNumber": employeeInfo?.employeeNumber,
      "is_It": employeeInfo?.role === "IT" ? "1" : "0",
    }
    dispatch(getAdminList(obj))

  }, []);
  const handelSearch = () => {
    const obj = {
      ...formData, is_It: employeeInfo?.role === "IT" ? "1" : "0",
    }
    dispatch(getAdminList(obj))
  }
  return (
    <>
      <InspectorAdminFilter
        formData={formData}
        onChange={onChange}
        handelSubmit={handelSearch}
      />
      {adminLevelStatus && <Alert sx={{ marginTop: "10px", marginBottom: "10px" }} variant="filled" severity={adminLevelStatus?.suucessMessage ? "success" : "error"}>
        {adminLevelStatus.suucessMessage ?? adminLevelStatus.errorMessage}
      </Alert>}
      <InspectorAdminTable
      />
    </>
  )
}

export default InspectorAdmin