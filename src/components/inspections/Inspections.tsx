"use client"
import React, { useEffect, useState } from 'react'
import InspectionsFilters from './inspections-filters/InspectionsFilters'
import InspectionsTable from './Inspections-table/InspectionsTable'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getInspections, setInspectionFilterFormData } from '@/redux/features/InspectionsSlice';
import { format } from 'date-fns';
import { fetchInspectors, fetchVenue } from '@/actions/api';
import Loading from '@/app/loading';




const Inspections = () => {
    const dispatch = useAppDispatch()
    const [venueDropdown, setVenueDropdown] = useState([])
    const [inspectorsDropdown, setInspectorsDropdown] = useState([])
    const [isloading, setLoading] = useState(true)
    const { selectedDateRange, inspectionForm } = useAppSelector(state => state.Inspections?.inspectionFilterData)
    const { inspectionsList, status } = useAppSelector(state => state.Inspections)

    const initialPayload = {
        FromDate: selectedDateRange[0] ? format(selectedDateRange[0], 'yyyy/MM/dd') : null,
        ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'yyyy/MM/dd') : null,
        InspectorNumber:"All",
        ReportStatus: inspectionForm.reportStatus,
        VenueId: "All",
        Is_it: "1",
        EmployeeNumber: "0004236",
        AdminLevel: "1"
    }
    const getVenueInspectorData = async () => {
        try {
            const [venues, inspectors] = await Promise.all([fetchVenue(), fetchInspectors()]);
            setVenueDropdown(venues);
            setInspectorsDropdown(inspectors);
        } catch (error) {
            // Handle error if necessary
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        dispatch(getInspections(initialPayload))
        getVenueInspectorData()

    }, []);
    const handelSubmit = async () => {
        const obj = {
            FromDate: selectedDateRange[0] ? format(selectedDateRange[0], 'yyyy/MM/dd') : null,
            ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'yyyy/MM/dd') : null,
            InspectorNumber: inspectionForm.inspector.toString(),
            ReportStatus: inspectionForm.reportStatus,
            VenueId: inspectionForm.venue.toString(),
            Is_it: "1",
            EmployeeNumber: "0004236",
            AdminLevel: "1"
        }
        dispatch(getInspections(obj))


    }
    return (
        <>
            {isloading && <Loading />}
            <InspectionsFilters
                venueDropdown={venueDropdown}
                inspectorsDropdown={inspectorsDropdown}
                handelSubmit={handelSubmit}
            />
            <InspectionsTable data={inspectionsList} isLoading={status === "loading"} />
        </>
    )
}

export default Inspections

