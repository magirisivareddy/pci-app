import { getDeviceHistory } from '@/actions/api';
import CustomTable from '@/components/common/table/Table'
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react'
const devicesHeader = [
    { id: 'historyDateTime', label: 'Date',width:"100px" },
    { id: 'title', label: 'Event',width:"100px" },
    { id: 'teamMember', label: 'By Who',width:"100px" },
    { id: 'information', label: 'Changes',width:"300px" }
];

const DeviceHistory = () => {
    const [deviceHistoryData, setDeviceHistory]=useState([])
    const [isloading, setLoading]=useState(false)
    const { deviceSelectedFormData } = useAppSelector(state => state.devices)
    const fetchDataAndSetDate = async () => {
        try {
          setLoading(true);
          const deviceHistory = await getDeviceHistory(deviceSelectedFormData?.deviceId);
         setDeviceHistory(deviceHistory)
        setLoading(false);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchDataAndSetDate();
      }, []);
    return (
        <CustomTable data={deviceHistoryData} headers={devicesHeader} isloading={isloading} isPagination={false} />
    )
}

export default DeviceHistory