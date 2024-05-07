"use client"
import React, { useEffect, useState } from 'react'
import InspectionsFilters from './inspections-filters/InspectionsFilters'
import InspectionsTable from './Inspections-table/InspectionsTable'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getInspections, setInspectionFilterFormData, setSelectedDateRange } from '@/redux/features/InspectionsSlice';
import { format } from 'date-fns';
import { fetchInspectors, fetchVenue } from '@/actions/api';
import Loading from '@/app/loading';
import { getVenue, getInspectors } from '@/redux/features/CommonSlice';
import { handlePreviousWeek } from '@/utils/helpers';




const Inspections = () => {
    const dispatch = useAppDispatch()
    const { userInfo } = useAppSelector((state: { common: any; }) => state.common)
    const { selectedDateRange, inspectionForm } = useAppSelector(state => state.Inspections?.inspectionFilterData)
    const { inspectionsList, status } = useAppSelector(state => state.Inspections)
    const { isloading } = useAppSelector(state => state.common)
    const [startDate, endDate] = selectedDateRange;
    let dateRange = selectedDateRange
    const previousWeekRange:any = handlePreviousWeek(startDate);
    // if (userInfo?.role === "Auditor") {
    //     const previousWeekRange = handlePreviousWeek(startDate);
    //     dateRange = previousWeekRange
    // }
    const initialPayload = {
        FromDate:userInfo?.role === "Auditor"? previousWeekRange && format(previousWeekRange[0], 'yyyy/MM/dd') : previousWeekRange[0] ? format(dateRange[0], 'yyyy/MM/dd') : null,
        ToDate: userInfo?.role === "Auditor"? previousWeekRange && format(previousWeekRange[1], 'yyyy/MM/dd') : previousWeekRange[1] ? format(dateRange[1], 'yyyy/MM/dd') : null,
        InspectorNumber: "All",
        ReportStatus: userInfo?.role === "Auditor"?"inspected":"to be inspected",
        VenueId: "All",
        Is_it: "1",
        EmployeeNumber: "0004236",
        AdminLevel: "1"
    }
    useEffect(() => {
        if (userInfo?.role === "Auditor") {
            const previousWeekRange = handlePreviousWeek(startDate);
            dateRange = previousWeekRange
            dispatch(setSelectedDateRange(dateRange));
        }
    }, [userInfo]);
    useEffect(() => {
        dispatch(getInspections(initialPayload))
    }, [userInfo]);
    useEffect(() => {
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
            <InspectionsTable />
        </>
    )
}

export default Inspections

