import React, { useState } from 'react';
import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Alert, Box, Button, Checkbox, FormControlLabel, Grid, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { addUpdateDevice } from '@/actions/api';
import { getDevices, setDeviceInfo } from '@/redux/features/DevicesSlice';
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

const DeviceAddEditForm = ({ venueDropdown }: any) => {
    const dispatch = useAppDispatch()
    const { devicesInfo, deviceFormData } = useAppSelector((state) => state.devices);
    const { deviceModalType } = devicesInfo;
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isloading, setLoading] = useState(false);
    const [assetStatus, setAssetStatus] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        commonAssetName: deviceFormData?.commonAssetName ?? '',
        venueId: deviceFormData?.venueId ?? '',
        assetNumber: deviceFormData?.assetNumber ?? '',
        manufacturer: deviceFormData?.manufacturer ?? '',
        vendor: deviceFormData?.vendor ?? '',
        modelNumber: deviceFormData?.modelNumber ?? '',
        serialNumber: deviceFormData?.serialNumber ?? '',
        deviceLocation: deviceFormData?.deviceLocation ?? '',
        terminalId: deviceFormData?.terminalId ?? '',
        profileId: deviceFormData?.profileId ?? '',
        ipAddress: deviceFormData?.ipAddress ?? '',

    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const is_it = "1";
    let updatedVenueDropdown = [{ label: "All", value: "All" }, ...venueDropdown];
    const assignedVenue = [{ label: "IT STORAGE", value: '-2' }, { label: "RMA DEVICES", value: "0" }];

    if (is_it === "1") {
        updatedVenueDropdown = [...updatedVenueDropdown, ...assignedVenue];
    }

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
            const payLoad = {
                ...formData, employeeNumber: "4236"
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
                    venueId: "All",
                    commonAssetName: "",
                    serialNumber: "",
                    assetNumber: "",
                    terminalId: "",
                    profileId: "",
                    employeeNumber: "789",
                };
                dispatch(getDevices(obj));
            }, 2000);
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