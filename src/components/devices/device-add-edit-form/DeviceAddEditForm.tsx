import React, { useState } from 'react';
import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Alert, Box, Button, Checkbox, FormControlLabel, Grid, Typography, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { addUpdateDevice } from '@/actions/api';
import { getDevices, setDeviceFilterFormData, setDeviceInfo } from '@/redux/features/DevicesSlice';
import Loading from '@/app/loading';

interface FormData {
    commonAssetName: string;
    venueId: string;
    assetNumber: string;
    manufacturer: string;
    vendor: string;
    modelNumber: string;
    serialNumber: string;
    deviceLocation: string;
    terminalId: string;
    profileId: string;
    ipAddress: string;

    [key: string]: string | boolean; // Index signature
}

const DeviceAddEditForm = () => {
    const dispatch = useAppDispatch()
    const { devicesInfo, deviceSelectedFormData } = useAppSelector((state) => state.devices);
    const filterDeviceForm = useAppSelector((state) => state.devices.formData);
    console.log("filterDeviceForm", filterDeviceForm)

    const { venueDropdown } = useAppSelector(state => state.common)
    const { deviceModalType } = devicesInfo;
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isloading, setLoading] = useState(false);
    const [assetStatus, setAssetStatus] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        commonAssetName: deviceSelectedFormData?.commonAssetName ?? '',
        venueId: deviceSelectedFormData?.venueId ?? 'All',
        assetNumber: deviceSelectedFormData?.assetNumber ?? '',
        manufacturer: deviceSelectedFormData?.manufacturer ?? '',
        vendor: deviceSelectedFormData?.vendor ?? '',
        modelNumber: deviceSelectedFormData?.modelNumber ?? '',
        serialNumber: deviceSelectedFormData?.serialNumber ?? '',
        deviceLocation: deviceSelectedFormData?.deviceLocation ?? '',
        terminalId: deviceSelectedFormData?.terminalId ?? '',
        profileId: deviceSelectedFormData?.profileId ?? '',
        ipAddress: deviceSelectedFormData?.ipAddress ?? '',

    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const is_it = "1";

    const assignedVenue = [
        { label: "ARCHIVED DEVICES", value: "-1" }, { label: "IT STORAGE", value: '-2' }, { label: "SPARE DEVICES", value: "50" }, { label: "RMA DEVICES", value: "0" }
    ]
    let updatedVenueDropdown = [...assignedVenue, ...venueDropdown];
    // if (is_it === "1") {
    //     updatedVenueDropdown = [...updatedVenueDropdown, ...assignedVenue];
    // }

    const onChangeAsset = (e: any) => {
        const value = e.target.checked;
        setAssetStatus(value)
        setFormData((prevData) => ({
            ...prevData,
            assetNumber: value ? '0' : prevData.assetNumber, // Reset asset number if asset status is true
        }));
        const assetName = "assetNumber";
        // Clear validation error when the checkbox is checked
        clearValidationError(assetName);
    };
    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear validation error when the field is changed
        clearValidationError(name);
        setErrorMessage("")
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
        modelNumber: { isRequired: true },
        manufacturer: { isRequired: true },
        vendor: { isRequired: true },
        serialNumber: { isRequired: true },
        deviceLocation: { isRequired: true },
        assetNumber: { isRequired: !assetStatus }
    };
    const isValidIpAddress = (ipAddress: string) => {
        // Regular expression to validate IP address format
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ipAddress);
    };
    const addDevice = async () => {
        const errors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            if (key !== 'assetStatus' && formData[key] === '' && validationSchema[key]?.isRequired) {
                errors[key] = 'This field is required';
            }
        });
        // Add additional validation for assetNumber
        if (!assetStatus && !/^\d+$/.test(formData.assetNumber)) {
            errors['assetNumber'] = 'Asset number must contain only numbers';
        }
        if (formData.ipAddress && !isValidIpAddress(formData.ipAddress)) {
            errors['ipAddress'] = 'Invalid IP address format';
        }
        // If there are validation errors, set them in state and return
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        // If assetStatus is true, clear assetNumber from formData
        if (assetStatus) {
            setFormData((prevData) => ({
                ...prevData,
                assetNumber: '',
            }));
        }

        try {
            setLoading(true);
            let payLoad: any = { ...formData, employeeNumber: "4236" };
            if (deviceSelectedFormData?.deviceId) {
                // If deviceFormData exists and has deviceId property
                payLoad = {
                    ...payLoad, // Spread the existing properties
                    deviceId: deviceSelectedFormData.deviceId // Add or update deviceId property
                };
            }
            const res = await addUpdateDevice(payLoad);
            setMessage(res.message);
            setLoading(false);
            setTimeout(() => {
                setMessage("");
                dispatch(
                    setDeviceInfo({
                        isDeviceModal: false,
                        deviceModalType: "",
                    })
                );
                const obj = {
                    is_It: "1",
                    employeeNumber: "789",
                    venueId: filterDeviceForm.venueId.toString() ?? "All",
                    commonAssetName: filterDeviceForm.commonAssetName ?? "",
                    serialNumber: filterDeviceForm.serialNumber.toString() ?? "",
                    assetNumber: filterDeviceForm.assetNumber.toString() ?? "",
                    terminalId: filterDeviceForm.terminalId ?? "",
                    profileId: filterDeviceForm.profileId ?? "",

                };


                dispatch(getDevices(obj));
            }, 3000);

        } catch (error: any) {
            setLoading(false);
            setErrorMessage(error.message ?? "Something went wrong ");
        }
    };

    return (
        <Grid container spacing={2} mb={2}>
            {isloading && <Loading />}
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
                    isRequired={true}
                />
                {validationErrors?.commonAssetName && (
                    <Alert
                        icon={false}
                        sx={{
                            background: 'unset',
                            color: "#9c4040",
                            padding: "0 10px",
                            '& .mui-1pxa9xg-MuiAlert-message': {
                                padding: '4px 0',
                            },
                        }}
                    >
                        {validationErrors?.commonAssetName}.
                    </Alert>
                )}
            </Grid>
            <Grid item xs={12} md={4}>
                <SelectInput
                    selectedOption={formData.venueId}
                    onChange={onChange}
                    label={'Associated Venue'}
                    options={updatedVenueDropdown}
                    name={'venueId'}
                    id={'venueId'}
                    size={'small'}
                    isRequired={true}
                />
                {validationErrors?.venueId && (
                    <Alert
                        icon={false}
                        sx={{
                            background: 'unset',
                            color: "#9c4040",
                            padding: "0 10px",
                            '& .mui-1pxa9xg-MuiAlert-message': {
                                padding: '4px 0',
                            },
                        }}
                    >
                        {validationErrors?.venueId}.
                    </Alert>
                )}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.assetNumber}
                    onChange={onChange}
                    label={'Asset'}
                    placeholder={"22858"}
                    name={'assetNumber'}
                    id={'assetNumber'}
                    isRequired={!assetStatus}
                    disabled={assetStatus}
                />
                <FormControlLabel
                    sx={{
                        fontSize: "10px",
                        '& .MuiFormControlLabel-label': {
                            fontSize: "10px",
                        },
                    }}
                    control={
                        <Checkbox
                            checked={assetStatus}
                            onChange={onChangeAsset}
                            name="assetStatus"
                        />
                    }
                    label="Not an NQ asset tag not required"
                />
                {validationErrors?.assetNumber && (
                    <Alert
                        icon={false}
                        sx={{
                            background: 'unset',
                            color: "#9c4040",
                            padding: "0 10px",
                            '& .mui-1pxa9xg-MuiAlert-message': {
                                padding: '4px 0',
                            },
                        }}
                    >
                        {validationErrors?.assetNumber}.
                    </Alert>
                )}
            </Grid>

            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.manufacturer ?? ""}
                    onChange={onChange}
                    label={'Manufacturer'}
                    name={'manufacturer'}
                    placeholder={"Agilysys"}
                    id={'manufacturer'}
                    isRequired={true}
                />
                {validationErrors?.manufacturer && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.manufacturer}.</Alert>}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.vendor ?? ""}
                    onChange={onChange}
                    label={'Vendor'}
                    name={'vendor'}
                    id={'vendor'}
                    placeholder={"Par"}
                    isRequired={true}
                />
                {validationErrors?.vendor && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.vendor}.</Alert>}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.modelNumber ?? ""}
                    onChange={onChange}
                    label={'Model'}
                    name={'modelNumber'}
                    id={'modelNumber'}
                    isRequired={true}
                    placeholder={"M5100"}
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
                    placeholder={"P817990211"}
                    maxLength={50}
                />
                {validationErrors?.serialNumber && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.serialNumber}.</Alert>}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.deviceLocation ?? ""}
                    onChange={onChange}
                    label={'Location'}
                    name={'deviceLocation'}
                    id={'deviceLocation'}
                    isRequired={true}
                    placeholder={"2nd from left when facing customers"}
                />
                {validationErrors?.deviceLocation && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.deviceLocation}.</Alert>}
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
                    placeholder={"192.168.123.132"}
                />
                {validationErrors?.ipAddress && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.ipAddress}.</Alert>}
            </Grid>
            <Grid item xs={12} md={12}>
                <Typography>
                    <b>RMA DEVICES:</b> This is for devices that are no longer in use and have been or going to be
                    returned to the vendor
                </Typography>
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