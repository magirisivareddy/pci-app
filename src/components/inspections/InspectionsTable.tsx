"use server"
import React from 'react'
import CustomTable from '../common/table/Table';
import { fetchData } from '@/actions/api';
import { inspectionsTableHeaders } from '@/utils/table-heders';

interface TableRowData {
  status: string;
  reportDate: string;
  weekNumber: number;
  venue: string;
  inspectorEmployeeNumber: string;
  totalDevices: number;
  totalQuestionableDevices: number;
  totalFailedDevices: number;
  id: number;
}
const InspectionsTable = async ({ data }: any) => {

  return (
    <CustomTable data={data} headers={inspectionsTableHeaders} />

  )
}

export default InspectionsTable