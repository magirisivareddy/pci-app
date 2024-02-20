import CustomTable from '@/components/common/table/Table'
import React from 'react'
const devicesHeader = [
    { id: 'date', label: 'Date' },
    { id: 'event', label: 'Event' },
    { id: 'by_who', label: 'By Who' },
    { id: 'changes', label: 'Changes' }
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
    return (
        <CustomTable data={mockData} headers={devicesHeader} isloading={false} isPagination={false} />
    )
}

export default DeviceHistory