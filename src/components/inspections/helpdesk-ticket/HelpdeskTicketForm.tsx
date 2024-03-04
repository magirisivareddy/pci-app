import DatePicker from 'react-datepicker';
import TextInput from '@/components/common/input/Input'
import SelectInput from '@/components/common/input/SelectInput'
import { Button, Grid, TextField } from '@mui/material'

import React, { useState } from 'react'

const HelpdeskTicketForm = ({ handleModalClose }: any) => {
    const [startDate, setStartDate] = useState(new Date());
    const onChange = () => {

    }
    let handleColor = (time: any) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
    };
    return (
        <Grid container spacing={2} mb={2} pr={1} >
            <Grid item xs={12} md={4} >
                <SelectInput
                    selectedOption={"Not Applicable"}
                    onChange={onChange}
                    label={'Reason'}
                    options={[{ value: "Not Applicable", label: "Not Applicable" },
                    { value: "Device present but not listed", label: "Device present but not listed" },
                    { value: "Device listed but not present", label: "Device listed but not present" },
                    { value: "Device serial no is incorrect", label: "Device serial no is incorrect" },
                    { value: "Device missing serial number label", label: "Device missing serial number label" },
                    { value: "Device serial number is unverifiable", label: "Device serial number is unverifiable" },
                    { value: "Device location in venue is incorrect", label: "Device location in venue is incorrect" },
                    { value: "Device evidence of tampering", label: "Device evidence of tampering" },
                    { value: "Device not found / A new device is missing", label: "Device not found / A new device is missing" },
                    { value: "Others", label: "Others" }]}
                    name={'reason'}
                    id={'reason'}
                    size={'small'}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput defaultValue={""} onChange={onChange} label={'Name of Device'} name={'deviceName'} id={'deviceName'} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput defaultValue={""} onChange={onChange} label={'Serial Number'} name={'serialNumber'} id={'serialNumber'} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput defaultValue={""} onChange={onChange} label={'Name of Venue'} name={'venueName'} id={'venueName'} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput defaultValue={""} onChange={onChange} label={'Name of Venue'} name={'venueName'} id={'venueName'} />
            </Grid>
            <Grid item xs={12} md={4}>
                <div className={"date-picker-container"}>
                    <label htmlFor="date-range">Date / Time</label>
                    <DatePicker
                        showTimeSelect
                        selected={startDate}
                        className={"custom-date-picker"}
                        onChange={(date: any) => setStartDate(date)}
                        timeClassName={handleColor}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                <div className={"date-picker-container"}>
                    <label htmlFor="date-range">Date / Time</label>
                    <TextField
                        multiline
                        size="small"
                        name={"notes"}
                        rows={3}
                        variant="outlined"
                        onChange={onChange}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={12} gap={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant='contained'>
                    Submit
                </Button>
            </Grid>
        </Grid>

    )
}

export default HelpdeskTicketForm