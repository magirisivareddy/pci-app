"use client"
import React from "react";

type Header = {
    id: string;
    label: string;
    customRender?: (_value: any, row: any) => JSX.Element;
};

export const inspectionsTableHeaders: Header[] = [
    {
        id: 'status',
        label: 'Status',
        customRender: (value: any, row: any): JSX.Element => (
            <span>{row.status === 'Active' ? 'Active' : 'Inactive'}</span>
        )
    },
    { id: 'reportDate', label: 'Report Date' },
    { id: 'weekNumber', label: 'Week' },
    { id: 'venue', label: 'Venue' },
    { id: 'inspectorEmployeeNumber', label: 'Employee Number' },
    { id: 'totalDevices', label: 'Total Devices' },
    { id: 'totalQuestionableDevices', label: 'Total Questionable Devices' },
    { id: 'totalFailedDevices', label: 'Total Failed Devices' },
];
