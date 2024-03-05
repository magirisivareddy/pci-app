import { getDeviceHistory } from '@/actions/api';
import CustomTable from '@/components/common/table/Table'
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react'
const devicesHeader = [
    { id: 'historyDateTime', label: 'Date' },
    { id: 'title', label: 'Event' },
    { id: 'teamMember', label: 'By Who' },
    { id: 'information', label: 'Changes' }
];
const mockData = [
    {
        date: '2024-02-19',
        event: 'Update',
        by_who: 'John Doe',
        changes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        date: '2024-02-18',
        event: 'Create',
        by_who: 'Jane Smith',
        changes: 'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Nunc faucibus turpis sed risus tincidunt, eget accumsan nulla tincidunt.'
    },
    {
        date: '2024-02-17',
        event: 'Delete',
        by_who: 'Bob Johnson',
        changes: 'Integer nec libero vel erat tincidunt dapibus. Vivamus vel metus vel lacus dapibus fermentum.'
    }
];
const DeviceHistory = () => {
    const [deviceHistoryData, setDeviceHistory]=useState([])
    const [isloading, setLoading]=useState(false)
    const { deviceFormData } = useAppSelector(state => state.devices)
    const fetchDataAndSetDate = async () => {
    
        try {
          setLoading(true);
          const deviceHistory = await getDeviceHistory(deviceFormData?.deviceId);
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