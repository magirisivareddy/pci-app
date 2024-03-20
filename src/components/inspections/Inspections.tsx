"use client"
import React, { useEffect, useState } from 'react'
import InspectionsFilters from './inspections-filters/InspectionsFilters'
import InspectionsTable from './Inspections-table/InspectionsTable'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getInspections, setInspectionFilterFormData } from '@/redux/features/InspectionsSlice';
import { format } from 'date-fns';
import { fetchInspectors, fetchVenue } from '@/actions/api';
import Loading from '@/app/loading';
import { getVenue, getInspectors } from '@/redux/features/CommonSlice';




const Inspections = () => {
    const dispatch = useAppDispatch()
    const { selectedDateRange, inspectionForm } = useAppSelector(state => state.Inspections?.inspectionFilterData)
    const { inspectionsList, status } = useAppSelector(state => state.Inspections)
    const {  isloading } = useAppSelector(state => state.common)
    const initialPayload = {
        FromDate: selectedDateRange[0] ? format(selectedDateRange[0], 'yyyy/MM/dd') : null,
        ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'yyyy/MM/dd') : null,
        InspectorNumber: "All",
        ReportStatus: inspectionForm.reportStatus,
        VenueId: "All",
        Is_it: "1",
        EmployeeNumber: "0004236",
        AdminLevel: "1"
    }
    useEffect(() => {
        dispatch(getInspections(initialPayload))
        dispatch(getVenue())
        dispatch(getInspectors())
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
            {isloading === "loading" && <Loading />}
            <InspectionsFilters
                handelSubmit={handelSubmit}
            />
            <InspectionsTable data={inspectionsList}   isLoading={status === "loading"} />
        </>
    )
}

export default Inspections

