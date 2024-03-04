"use client"
import React, { useEffect, useState } from 'react'
import InspectionsFilters from './inspections-filters/InspectionsFilters'
import InspectionsTable from './Inspections-table/InspectionsTable'
import { fetchInspections } from '@/actions/api';
import { useAppSelector } from '@/redux/hooks';



interface InspectionsProps {
    venueDropdown: Array<{ label: string; value: string }>;
    inspectorsDropdown: Array<{ label: string; value: string }>;
}

const Inspections: React.FC<InspectionsProps> = ({ venueDropdown, inspectorsDropdown }) => {
    const { selectedDateRange, inspectionForm } = useAppSelector(state => state.Inspections.inspectionFilterData)
    const [isLoading, setLoading] = useState(true)
    const [inspections, setInspectionsData] = useState([])
    const fetchDataAndSetDate = async () => {

        const obj = {
            //  FromDate : selectedDateRange[0] ? format(selectedDateRange[0], 'dd/MM/yyyy') : null,
            //  ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'dd/MM/yyyy') : null,
            FromDate: selectedDateRange[0],
            ToDate: selectedDateRange[1],
            InspectorNumber: inspectionForm.inspector,
            ReportStatus: inspectionForm.reportStatus,
            VenueId: inspectionForm.venue,
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



    const handelSubmit = async () => {
        const obj = {
            FromDate: selectedDateRange[0],
            ToDate: selectedDateRange[1],
            // FromDate : selectedDateRange[0] ? format(selectedDateRange[0], 'dd/MM/yyyy') : null,
            // ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'dd/MM/yyyy') : null,
            InspectorNumber: inspectionForm.inspector.toString(),
            ReportStatus: inspectionForm.reportStatus,
            VenueId: inspectionForm.venue.toString(),
            Is_it: "1",
            EmployeeNumber: "789",
            AdminLevel: "1"
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
                handelSubmit={handelSubmit}
            />
            <InspectionsTable data={inspections} isLoading={isLoading} />
        </>
    )
}

export default Inspections

