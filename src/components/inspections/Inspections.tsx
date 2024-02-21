"use client"
import React, { useEffect, useState } from 'react'
import InspectionsFilters from './inspections-filters/InspectionsFilters'
import InspectionsTable from './Inspections-table/InspectionsTable'
import { fetchInspections } from '@/actions/api';


interface FormData {
    venue: string;
    inspector: string;
    reportStatus: string;
}
type DateRange = [Date | null, Date | null];
interface InspectionsProps {
    venueDropdown: Array<{ label: string; value: string }>;
    inspectorsDropdown: Array<{ label: string; value: string }>;
  }
function getDefaultWeekRange(): DateRange {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    const diff = (dayOfWeek + 6) % 7; // Calculate the difference from Sunday to Monday
    startOfWeek.setDate(currentDate.getDate() - diff);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5); // Set to Saturday of the current week
    return [startOfWeek, endOfWeek];
}
const Inspections: React.FC<InspectionsProps> = ({ venueDropdown, inspectorsDropdown }) => {
    const [isLoading, setLoading] = useState(true)
    const [formData, setFormData] = useState<FormData>({
        venue: 'All',
        inspector: 'All',
        reportStatus: 'to be inspected',
    });
    const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>(getDefaultWeekRange);
    const [inspections, setInspectionsData] = useState([])
    const fetchDataAndSetDate = async () => {

        const obj = {
            //  FromDate : selectedDateRange[0] ? format(selectedDateRange[0], 'dd/MM/yyyy') : null,
            //  ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'dd/MM/yyyy') : null,
            FromDate: selectedDateRange[0],
            ToDate: selectedDateRange[1],
            InspectorNumber: formData.inspector,
            ReportStatus: formData.reportStatus,
            VenueId: formData.venue,
            Is_it: "1",
            EmployeeNumber: "789",
            AdminLevel: "1"
        }
        try {
            setLoading(true);
            const inspections = await fetchInspections(obj);
            setInspectionsData(inspections);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAndSetDate();
    }, []);

    const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
        setSelectedDateRange(dateRange);
    };
    const onChange = (value: any, name: any) => {

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handelSubmit = async (event: any) => {
        const obj = {
            FromDate: selectedDateRange[0],
            ToDate: selectedDateRange[1],
            InspectorNumber: formData.inspector.toString(),
            ReportStatus: formData.reportStatus,
            VenueId: formData.venue.toString(),
            Is_it: "Yes",
            EmployeeNumber: "789",
            AdminLevel: "Admin"
        }

        try {
            setLoading(true);
            const inspections = await fetchInspections(obj);
            setInspectionsData(inspections);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            <InspectionsFilters
                venueDropdown={venueDropdown}
                inspectorsDropdown={inspectorsDropdown}
                formData={formData}
                handleDateRangeChange={handleDateRangeChange}
                onChange={onChange}
                selectedDateRange={selectedDateRange}
                handelSubmit={handelSubmit}

            />
            <InspectionsTable data={inspections} isLoading={isLoading} />
        </>
    )
}

export default Inspections