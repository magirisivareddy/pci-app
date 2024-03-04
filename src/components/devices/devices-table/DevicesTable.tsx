"use client"
import { searchDevices } from '@/actions/api';
import CustomTable from '@/components/common/table/Table';
import { useAppSelector } from '@/redux/hooks';
import { devicesHeader } from '@/utils/table-heders'
import React, { useEffect, useState } from 'react'

interface FormData {
  commonAssetName: string;
  associatedVenue: string;
  asset: string;
  manufacturer: string;
  vendor: string;
  model: string;
  serial: string;
  location: string;
  terminalId: string;
  profileId: string;
  ipAddress: string
  assetStatus: boolean
}


const numberOfRecords = 30;

const DevicesTable = () => {
  const { devicesData, status } = useAppSelector(state => state.devices)


  return (
    <CustomTable data={devicesData} headers={devicesHeader} isloading={status === "loading"} isPagination={true} />
  )
}

export default DevicesTable