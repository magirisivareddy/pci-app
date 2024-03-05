import { updateRow } from '@/redux/features/InspectionsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react'

const StatusCell = ({ row }: any) => {
    const dispatch = useAppDispatch(); // Use the useAppDispatch hook here
    const handleStatusChange = (event: any) => {
        dispatch(updateRow({ deviceId: row.deviceId, status: event.target.value }));
    }
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={row.status}
                name="status"
                onChange={handleStatusChange}

            >
                <FormControlLabel value="pass" control={<Radio />} label="Pass" />
                <FormControlLabel value="fail" control={<Radio />} label="Fail" />
                <FormControlLabel value="Questionable" control={<Radio />} label="Questionable" />
            </RadioGroup>
        </FormControl>
    );
}


export default StatusCell