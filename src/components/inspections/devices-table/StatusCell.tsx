import { updateRow } from '@/redux/features/InspectionsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';

const StatusCell = ({ row }: any) => {
    const [deviceStatus, setDeviceStatus] = useState(row?.deviceStatus ?? null)
    const dispatch = useAppDispatch(); // Use the useAppDispatch hook here

    let defaultValue;
    if (deviceStatus === 1) {
        defaultValue = "pass";
    } else if (deviceStatus === -1) {
        defaultValue = "fail";
    } else if (deviceStatus === 2) {
        defaultValue = "Questionable";
    } else {
        defaultValue = null;
    }
    const handleStatusChange = (event: any) => {
        if (event.target.value === "fail") {
            console.log("{ inspectedId: row.inspectedId, status: -1 }",{ inspectedId: row.inspectedId, status: -1 })
            dispatch(updateRow({ inspectedId: row.inspectedId, status: -1 }));
        }
        if (event.target.value === "Questionable") {
            dispatch(updateRow({ inspectedId: row.inspectedId, status: 2 }));
        }
        if (event.target.value === "pass") {
            dispatch(updateRow({ inspectedId: row.inspectedId, status: 1 }));
            dispatch(updateRow({ inspectedId: row.inspectedId, reason: "" }));
        } else {
            dispatch(updateRow({ inspectedId: row.inspectedId, reason: "Not Applicable" }));
        }
    }

    return (
        <>
            {defaultValue === "pass" ? <Typography color={"green"}> Pass</Typography> : <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={defaultValue}
                    name="status"
                    onChange={handleStatusChange}
                >
                    <FormControlLabel value="pass" control={<Radio />} label="Pass" />
                    <FormControlLabel value="fail" control={<Radio />} label="Fail" />
                    <FormControlLabel value="Questionable" control={<Radio />} label="Questionable" />
                </RadioGroup>
            </FormControl>}

        </>

    );
}

export default StatusCell;
