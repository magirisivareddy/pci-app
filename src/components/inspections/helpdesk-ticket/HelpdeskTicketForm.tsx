import DatePicker from 'react-datepicker';
import TextInput from '@/components/common/input/Input'
import SelectInput from '@/components/common/input/SelectInput'
import { Alert, Button, Grid, TextField } from '@mui/material'

import React, { useState } from 'react'
import { helpDeskTicket } from '@/actions/api';
import Loading from '@/app/loading';
import 'react-datepicker/dist/react-datepicker.css';

interface HelpDeskFormState {
    reason: string;
    deviceName: string;
    serialNumber: string;
    venueName: string;
    locationName: string;
    notes: string;
    [key: string]: string; // Index signature allowing arbitrary string keys
}


const HelpdeskTicketForm: React.FC<{ handleModalClose: () => void }> = ({ handleModalClose }) => {
    const [entryDate, setEntryDate] = useState(new Date());
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isloading, setLoading] = useState<boolean>(false);

    const [helpDeskForm, setHelpDeskForm] = useState<HelpDeskFormState>({
        reason: "Not Applicable",
        deviceName: "",
        serialNumber: "",
        venueName: "",
        locationName: "",
        notes: "",
    });

    const onClose = () => {
        setHelpDeskForm({
            reason: "Not Applicable",
            deviceName: "",
            serialNumber: "",
            venueName: "",
            locationName: "",
            notes: "",
        });
        setEntryDate(new Date());
        handleModalClose();
    };
    const onChange = (value: string, name: string) => {
        setErrorMessage("")
        setHelpDeskForm(prevhelpDeskForm => ({
            ...prevhelpDeskForm,
            [name]: value,
        }));
        
    };
    const onSubmitHelpDeskTicket = async () => {
        // Validate required fields
        const requiredFields = ['deviceName', 'serialNumber', 'venueName', 'locationName'];
        const emptyFields = requiredFields.filter(field => !helpDeskForm[field]);

        if (emptyFields.length > 0) {
            setErrorMessage(`Please fill in the required fields: ${emptyFields.join(', ')}`);
            return;
        }

        const payload = {
            ...helpDeskForm,
            entryDate,
        };

        try {
            setLoading(true);
            const res = await helpDeskTicket(payload);
            setMessage(res.message);
            setLoading(false);
            setTimeout(() => {
                setMessage("");
                handleModalClose();
            }, 3000);
        } catch (error: any) {
            setLoading(false);
            setErrorMessage(error.message ?? "Something went wrong");
        }
    }

    return (
        <>

            {isloading && <Loading />}
            <Grid container spacing={2} mb={2} pr={1} >

                <Grid item xs={12} md={4} >
                    <SelectInput
                        selectedOption={helpDeskForm.reason}
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
                    <TextInput defaultValue={helpDeskForm.deviceName} onChange={onChange} label={'Name of Device'} name={'deviceName'} id={'deviceName'} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextInput defaultValue={helpDeskForm.serialNumber} onChange={onChange} label={'Serial Number'} name={'serialNumber'} id={'serialNumber'} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextInput defaultValue={helpDeskForm.venueName} onChange={onChange} label={'Name of Venue'} name={'venueName'} id={'venueName'} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextInput defaultValue={helpDeskForm.locationName} onChange={onChange} label={'Name of Location'} name={'locationName'} id={'locationName'} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className={"date-picker-container"}>
                        <label htmlFor="date-range">Date / Time</label>
                        <DatePicker
                            // showTimeSelect
                            selected={entryDate}
                            dateFormat="dd/MM/yyyy"
                            className={"custom-date-picker"}
                            name='entryDate'
                            onChange={(date: any) => setEntryDate(date)}
                        // timeClassName={handleColor}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className={"date-picker-container"}>
                        <label htmlFor="date-range">Notes</label>
                        <TextField
                            multiline
                            size="small"
                            name={"notes"}
                            rows={3}
                            variant="outlined"
                            onChange={(e) => { onChange(e.target.value, e.target.name) }}

                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={12} gap={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='contained' onClick={onSubmitHelpDeskTicket}>
                        Submit
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    {message && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                        {message}
                    </Alert>}

                    {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                        {errorMessage}
                    </Alert>}
                </Grid>
            </Grid>
        </>


    )
}

export default HelpdeskTicketForm