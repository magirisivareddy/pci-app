"use client"
import React, { useEffect, useState } from 'react'
import InspectionsFilters from './inspections-filters/InspectionsFilters'
import InspectionsTable from './Inspections-table/InspectionsTable'
import { fetchInspections } from '@/actions/api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getInspections } from '@/redux/features/InspectionsSlice';



interface InspectionsProps {
    venueDropdown: Array<{ label: string; value: string }>;
    inspectorsDropdown: Array<{ label: string; value: string }>;
}

const Inspections: React.FC<InspectionsProps> = ({ venueDropdown, inspectorsDropdown }) => {
    const dispatch = useAppDispatch()
    const { selectedDateRange, inspectionForm } = useAppSelector(state => state.Inspections.inspectionFilterData)
    const { inspectionsList, status } = useAppSelector(state => state.Inspections)
    useEffect(() => {
        const obj = {
            //  FromDate : selectedDateRange[0] ? format(selectedDateRange[0], 'dd/MM/yyyy') : null,
            //  ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'dd/MM/yyyy') : null,
            FromDate: selectedDateRange[0],
            ToDate: selectedDateRange[1],
            InspectorNumber: inspectionForm.inspector,
            ReportStatus: inspectionForm.reportStatus,
            VenueId: inspectionForm.venue,
            Is_it: "1",
            EmployeeNumber: "0004236",
            AdminLevel: "1"
        }
        dispatch(getInspections(obj))
     
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
            EmployeeNumber: "0004236",
            AdminLevel: "1"
        }
        dispatch(getInspections(obj))
      

    }
    return (
        <>
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

