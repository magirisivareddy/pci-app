"use client"
import React, { useEffect, useState } from 'react';
import CustomTable from '@/components/common/table/Table';
import VenueStatusFilter from './VenueStatusFilter';
import { getVenueStatusReport, getVenueSummaryReport } from '@/actions/api';
import { format } from 'date-fns';
import { useAppDispatch } from '@/redux/hooks';
import { getVenue } from '@/redux/features/CommonSlice';

// Define the FormData interface
interface FormData {
    venueId?: string;
    deviceLocation?: string;
}

// Define the VenueStatusReport functional component
const VenueStatusReport = () => {
    const dispatch = useAppDispatch()
    const headers = [
        { id: 'venueName', label: 'Venue Name' },
        { id: 'deviceId', label: 'Device Id' },
        { id: 'deviceName', label: 'Device Name' },
        { id: 'deviceLocation', label: 'Device Location' },
        { id: 'deviceType', label: 'Device Type' },
        { id: 'notes', label: 'Notes' },
        {
            id: 'deviceStatus', label: 'Device Status', customRender: (value: any, row: any): JSX.Element => (
                <span>

                    {row.deviceStatus === 1 ? (
                        "PASS"
                    ) : (
                        "FAIL"
                    )}
                </span>
            )
        },
        {
            id: 'inspectionActualDate', label: 'Inspection Actual Date', customRender: (value: any, row: any): JSX.Element => (
                <span>
                    {format(row.inspectionActualDate, 'dd/MM/yyyy hh:mm a')}
                </span>
            )
        },
    ];

    // Define state variables using TypeScript
    const [formData, setFormData] = useState<FormData>({
        venueId: 'All',
        deviceLocation: '',
    });
    const [data, setData] = useState<any[]>([]); // Change data type to any[]
    const [isLoading, setLoading] = useState(false);
    const onClear = () => {
        setFormData({
            venueId: 'All',
            deviceLocation: '',
        })
    }
    // Define the onChange handler
    const onChange = (value: any, name: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Define the getVenueInspectorList function with optional parameters
    const getVenueInspectorList = async (
        employeeNumber: string,
        venueId?: string,
        deviceLocation?: string
    ) => {
        try {
            setLoading(true);
            const res = await getVenueStatusReport(employeeNumber, venueId, deviceLocation);
            setData(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    // Use the employeeNumber constant
    const employeeNumber = "3752";
    useEffect(() => {
        dispatch(getVenue())
    }, [])
    // Define the useEffect hook to fetch data on component mount
    useEffect(() => {
        getVenueInspectorList(employeeNumber);
    }, [employeeNumber]); // Add employeeNumber as a dependency

    // Define the handleSubmit function
    const handelSubmit = () => {
        let venueId = formData.venueId

        if (formData.venueId === "All") {
            venueId = ""
        }

        getVenueInspectorList(employeeNumber, venueId, formData.deviceLocation);
    };

    // Render the VenueStatusReport component
    return (
        <div>
            <VenueStatusFilter
                venueStatusReportData={data}
                formData={formData}
                handelSubmit={handelSubmit}
                onChange={onChange}
                onClear={onClear}
            />
            <CustomTable data={data} headers={headers} isloading={isLoading} />
        </div>
    );
};

// Export the VenueStatusReport component as default
export default VenueStatusReport;
