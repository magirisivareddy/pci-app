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
    const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
    const { selectedDateRange, inspectionForm } = useAppSelector(state => state.Inspections?.inspectionFilterData)
    const { isloading } = useAppSelector(state => state.common)
    const [startDate, endDate] = selectedDateRange;
    let dateRange = selectedDateRange
    const roles = employeeInfo?.role?.split(",").map((role: string) => role?.trim());
    const previousWeekRange: any = handlePreviousWeek(startDate);

    const initialPayload = {
        
        FromDate: format(dateRange[0], 'yyyy/MM/dd'),
        ToDate: format(dateRange[1], 'yyyy/MM/dd'),
        InspectorNumber:roles?.includes("Admin") || roles?.includes("Audit") ? "All" : employeeInfo?.employeeNumber?.toString(),
        ReportStatus: "to be inspected",
        VenueId: "All",
        Is_it: employeeInfo?.role === "IT" ? "1" : "0",
        EmployeeNumber: employeeInfo?.employeeNumber,
        AdminLevel: "1"
    }
    useEffect(() => {
        if (employeeInfo?.role === "Audit") {
            const previousWeekRange = handlePreviousWeek(startDate);
            dateRange = previousWeekRange
            dispatch(setSelectedDateRange(dateRange));
            const value = roles?.includes("Audit") ? "inspected" : "to be inspected"
            dispatch(setInspectionFilterFormData({ name: "reportStatus", value: value }))
        }
    }, [employeeInfo]);
    useEffect(() => {
        if (employeeInfo?.role === "Audit") {
            const auditPayload = {
                FromDate: format(previousWeekRange[0], 'yyyy/MM/dd'),
                ToDate: format(previousWeekRange[1], 'yyyy/MM/dd'),
                InspectorNumber:roles?.includes("Admin") || roles?.includes("Audit") ? "All" : employeeInfo?.employeeNumber?.toString(),
                ReportStatus: "inspected",
                VenueId: "All",
                Is_it: employeeInfo?.role === "IT" ? "1" : "0",
                EmployeeNumber: employeeInfo?.employeeNumber,
                AdminLevel: "1"
            };
            dispatch(getInspections(auditPayload));
        }
    }, [employeeInfo]);

    useEffect(() => {
        if (employeeInfo?.role && employeeInfo.role !== "Audit") {
            dispatch(getInspections(initialPayload));
        }
    }, [employeeInfo]);
    useEffect(() => {
        dispatch(getVenue());
        dispatch(getInspectors());
    }, []); // Empty dependency array to ensure it runs only once
    const handelSubmit = async () => {
        const obj = {
            FromDate: selectedDateRange[0] ? format(selectedDateRange[0], 'yyyy/MM/dd') : null,
            ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'yyyy/MM/dd') : null,
            InspectorNumber:roles?.includes("Admin") || roles?.includes("Audit") ?  inspectionForm.inspector.toString() : employeeInfo?.employeeNumber?.toString(),
            ReportStatus: inspectionForm.reportStatus,
            VenueId: inspectionForm.venue.toString(),
            Is_it: employeeInfo?.role === "IT" ? "1" : "0",
            EmployeeNumber: employeeInfo?.employeeNumber,
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

