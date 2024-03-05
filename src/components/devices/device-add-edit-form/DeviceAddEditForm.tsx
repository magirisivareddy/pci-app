import React, { useState } from 'react';
import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    useMediaQuery,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { addUpdateDevice } from '@/actions/api';
import { getDevices, setDeviceInfo } from '@/redux/features/DevicesSlice';

interface FormData {
    commonAssetName: string;
    venueId: string;
    asset: string;
    manufacturer: string;
    vendor: string;
    modelNumber: string;
    serialNumber: string;
    deviceLocation: string;
    terminalId: string;
    profileId: string;
    ipAddress: string;
    // assetStatus: boolean;
    [key: string]: string | boolean; // Index signature
}

const DeviceAddEditForm = ({ venueDropdown }: any) => {
    const dispatch = useAppDispatch()
    const { devicesInfo, deviceFormData } = useAppSelector(
        (state) => state.devices
    );
    const { deviceModalType } = devicesInfo;
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const [formData, setFormData] = useState<FormData>({
        commonAssetName: deviceFormData?.commonAssetName ?? '',
        venueId: deviceFormData?.venueId ?? '',
        asset: deviceFormData?.asset ?? '',
        manufacturer: deviceFormData?.manufacturer ?? '',
        vendor: deviceFormData?.vendor ?? '',
        modelNumber: deviceFormData?.modelNumber ?? '',
        serialNumber: deviceFormData?.serialNumber ?? '',
        deviceLocation: deviceFormData?.deviceLocation ?? '',
        terminalId: deviceFormData?.terminalId ?? '',
        profileId: deviceFormData?.profileId ?? '',
        ipAddress: deviceFormData?.ipAddress ?? '',
        // assetStatus: false,
    });
    console.log("formData", formData)
    // "deviceId": 0,
    // "assetNumber": "string",
    // "serialNumberNumber": "string",
    // "slotNumber": "string",
    // "employeeNumber": "string"

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>(
        {}
    );

    const onChangeAsset = (e: any) => {
        const value = e.target.checked;
        const name = e.target.name;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear validation error when the checkbox is checked
        clearValidationError(name);
    };
    console.log("validationErrors", validationErrors)
    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear validation error when the field is changed
        clearValidationError(name);

    };

    const clearValidationError = (name: string) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };
    const validationSchema: Record<string, { isRequired: boolean }> = {
        commonAssetName: { isRequired: true },
        venueId: { isRequired: true },
        asset: { isRequired: true },
        modelNumber: { isRequired: true },

    };
    const addDevice = async () => {
        const errors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            if (key !== 'assetStatus' && formData[key] === '' && validationSchema[key]?.isRequired) {
                errors[key] = 'This field is required';
            }
        });
        // If there are validation errors, set them in state and return
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            const res = await addUpdateDevice(formData)
            setMessage(res.message)
            setTimeout(() => {
                setMessage("")
                dispatch(setDeviceInfo({
                    isDeviceModal: false,
                    deviceModalType: ""
                  }))
                const obj = {
                    "is_It": "1",
                    "venueId": "All",
                    "commonAssetName": "",
                    "serialNumber": "",
                    "assetNumber": "",
                    "terminalId": "",
                    "profileId": "",
                    "employeeNumber": "789"
                }
                dispatch(getDevices(obj))
            }, 3000)
        } catch (error: any) {
            setErrorMessage(error.message ?? "something went wrong ")
        }

        // Reset form data after successful submission (if needed)
        // setFormData({
        //     commonAssetName: '',
        //     venueId: '',
        //     asset: '',
        //     manufacturer: '',
        //     vendor: '',
        //     modelNumber: '',
        //     serialNumber: '',
        //     deviceLocation: '',
        //     terminalId: '',
        //     profileId: '',
        //     ipAddress: '',
        //     assetStatus: false,
        // });
    };

    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={4}>
                <SelectInput
                    selectedOption={formData.commonAssetName}
                    onChange={onChange}
                    label={'Common Asset Name'}
                    options={[
                        { label: "Apple Pay Change Point", value: "Apple Pay Change Point" },
                        { label: "ATM", value: "ATM" },
                        { label: "Credit card terminal", value: "Credit card terminal" },
                        { label: "Desktop, Laptop, Tablet", value: "Desktop, Laptop, Tablet" },
                        { label: "Fastbar CC Reader", value: "Fastbar CC Reader" },
                        { label: "Fastbar POS", value: "Fastbar POS" },
                        { label: "POS Card Reader", value: "POS Card Reader" },
                        { label: "POS System", value: "POS System" },
                        { label: "Receipt Printer", value: "Receipt Printer" },
                        { label: "USB credit card swiper", value: "USB credit card swiper" },
                    ]}
                    name={'commonAssetName'}
                    id={'commonAssetName'}
                    size={'small'}
                    isRequired={true} />
                {validationErrors?.commonAssetName && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.commonAssetName}.</Alert>}

            </Grid>
            <Grid item xs={12} md={4}>
                <SelectInput
                    selectedOption={formData.venueId}
                    onChange={onChange}
                    label={'Associated Venue'}
                    options={venueDropdown}
                    name={'venueId'}
                    id={'venueId'}
                    size={'small'}
                    isRequired={true}
                />
                {validationErrors?.venueId && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.venueId}.</Alert>}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.asset}
                    onChange={onChange}
                    label={'Asset'}
                    name={'asset'}
                    id={'asset'}
                    isRequired={true}
                />
                <FormControlLabel
                    sx={{
                        fontSize: "10px", '& .MuiFormControlLabel-label': {
                            fontSize: "10px"
                        }
                    }}
                    control={
                        <Checkbox checked={false} onChange={onChangeAsset} name="assetStatus" />
                    }
                    label="Not an NQ asset tag not required"
                />
                {validationErrors?.asset && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.asset}.</Alert>}
            </Grid>

            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.manufacturer ?? ""}
                    onChange={onChange}
                    label={'Manufacturer'}
                    name={'manufacturer'}
                    id={'manufacturer'}
                    isRequired={true}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.vendor ?? ""}
                    onChange={onChange}
                    label={'Vendor'}
                    name={'vendor'}
                    id={'vendor'}
                    isRequired={true}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.modelNumber ?? ""}
                    onChange={onChange}
                    label={'Model'}
                    name={'modelNumber'}
                    id={'modelNumber'}
                    isRequired={true}
                />
                {validationErrors?.modelNumber && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.modelNumber}.</Alert>}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.serialNumber ?? ""}
                    onChange={onChange}
                    label={'Serial'}
                    name={'serialNumber'}
                    id={'serialNumber'}
                    isRequired={true}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.deviceLocation ?? ""}
                    onChange={onChange}
                    label={'Location'}
                    name={'deviceLocation'}
                    id={'deviceLocation'}
                    isRequired={true}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.terminalId ?? ""}
                    onChange={onChange}
                    label={'Terminal id'}
                    name={'terminalId'}
                    id={'terminalId'}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.profileId ?? ""}
                    onChange={onChange}
                    label={'Profile id'}
                    name={'profileId'}
                    id={'profileId'}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.ipAddress ?? ""}
                    onChange={onChange}
                    label={'Ip Address'}
                    name={'ipAddress'}
                    id={'ipAddress'}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <Box sx={{ display: "flex", justifyContent: 'flex-end', alignItems: "end", textAlign: "end" }} >
                    <Button
                        fullWidth={isMobile}
                        sx={{ marginTop: "22px" }}
                        onClick={addDevice}
                        variant='contained'> {deviceModalType === "Add" ? "Add" : "Update"} </Button>
                </Box>
                {message && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                    {message}
                </Alert>}

                {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                    {errorMessage}
                </Alert>}

            </Grid>

        </Grid>
    )
}

export default DeviceAddEditForm