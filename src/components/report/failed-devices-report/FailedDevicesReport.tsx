"use client"
import CustomTable from '@/components/common/table/Table';
import React, { useEffect, useState } from 'react'
import FailedDevicesFilter from './FailedDevicesFilter';
import { format } from 'date-fns';
import { getVenuePassFailSummaryReport } from '@/actions/api';
import { useDispatch } from 'react-redux';
import { getVenue, getInspectors } from '@/redux/features/CommonSlice';
import { useAppDispatch } from '@/redux/hooks';

type Dropdowns = {
  venueDropdown: any; // replace with the actual type
  inspectorsDropdown: any; // replace with the actual type
}


interface TableRowData {
  inspectorDetails: any;
  id: number;
  venue: string;
  totalDevices: number;
}

interface FormData {
  venueId: string;
  inspectorId: string;
}
const FailedDevicesReport = () => {


  const headers = [
    { id: 'venueName', label: 'Venue Name' },
    { id: 'deviceName', label: 'Device Name' },
    { id: 'deviceStatus', label: 'Device Status' },
    { id: 'reason', label: 'Reason' },
    { id: 'notes', label: 'Notes' },
    { id: 'inspectionType', label: 'Inspection Type' },
    { id: 'inspector', label: 'Inspector' },
    {
      id: 'inspectionActualDate', label: 'Inspection Actual Date', customRender: (value: any, row: any): JSX.Element => (
        <span>
          {format(row.inspectionActualDate, 'dd/MM/yyyy hh:mm a')}
        </span>
      )
    },
  ];
  const [formData, setFormData] = useState<FormData>({
    venueId: 'All',
    inspectorId: 'All'
  });
  const dispatch = useAppDispatch()
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const employeeNumber = "5860"
  const getVenueInspectorList = async (
    employeeNumber: string,
    venueId?: string,
    inspectorId?: string
  ) => {
    try {
      setLoading(true)
      const res = await getVenuePassFailSummaryReport(employeeNumber, venueId, inspectorId)
      setData(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(getVenue())
    dispatch(getInspectors())
    getVenueInspectorList(employeeNumber)
  }, [])


  const onChange = (value: any, name: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handelSubmit = () => {
    getVenueInspectorList(formData.venueId, formData.inspectorId);
  };
  return (<>
    <FailedDevicesFilter  failedDevicesData={data} formData={formData} handelSubmit={handelSubmit} onChange={onChange} />
    <CustomTable data={data} headers={headers} isloading={isLoading} />
  </>

  )
}

export default FailedDevicesReport