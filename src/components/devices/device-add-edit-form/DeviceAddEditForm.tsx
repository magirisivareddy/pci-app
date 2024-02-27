import React, { useState } from 'react';
import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppSelector } from '@/redux/hooks';
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

interface FormData {
    commonAssetName: string;
    associatedVenue: string;
    asset: string;
    manufacturer: string;
    vendor: string;
    model: string;
    serial: string;
    location: string;
    terminalId: string;
    profileId: string;
    ipAddress: string;
    assetStatus: boolean;
    [key: string]: string | boolean; // Index signature
}

const DeviceAddEditForm = () => {
    const { devicesInfo, deviceFormData } = useAppSelector(
        (state) => state.devices
    );
    const { deviceModalType } = devicesInfo;
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState<FormData>({
        commonAssetName: deviceFormData?.commonAssetName ?? '',
        associatedVenue: deviceFormData?.associatedVenue ?? '',
        asset: deviceFormData?.asset ?? '',
        manufacturer: deviceFormData?.manufacturer ?? '',
        vendor: deviceFormData?.vendor ?? '',
        model: deviceFormData?.model ?? '',
        serial: deviceFormData?.serial ?? '',
        location: deviceFormData?.location ?? '',
        terminalId: deviceFormData?.terminalId ?? '',
        profileId: deviceFormData?.profileId ?? '',
        ipAddress: deviceFormData?.ipAddress ?? '',
        assetStatus: false,
    });

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
        associatedVenue: { isRequired: true },
        asset: { isRequired: true },
        model: { isRequired: true },

    };
    const addDevice = () => {
        // Validate fields before proceeding
        const errors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            // Check if the field is required and not filled in
            if (key !== 'assetStatus' && formData[key] === '' && validationSchema[key]?.isRequired) {
                errors[key] = 'This field is required';
            }
        });

        // If there are validation errors, set them in state and return
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        // Continue with your addDevice logic here
        // ...

        // Reset form data after successful submission (if needed)
        setFormData({
            commonAssetName: '',
            associatedVenue: '',
            asset: '',
            manufacturer: '',
            vendor: '',
            model: '',
            serial: '',
            location: '',
            terminalId: '',
            profileId: '',
            ipAddress: '',
            assetStatus: false,
        });
    };

    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={4}>
                <SelectInput
                    selectedOption={formData.commonAssetName}
                    onChange={onChange}
                    label={'Common Asset Name'}
                    options={[
                        { label: "Inspected", value: "inspected" },
                        { label: "Missed Inspection", value: "missed_inspection" },
                        { label: "Inspected: Not Resolved", value: "inspected_not_resolved" },
                        { label: "To Be Inspected", value: "to_be_inspected" }
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
                    selectedOption={formData.associatedVenue}
                    onChange={onChange}
                    label={'Associated Venue'}
                    options={[
                        { label: "Inspected", value: "inspected" },
                        { label: "Missed Inspection", value: "missed_inspection" },
                        { label: "Inspected: Not Resolved", value: "inspected_not_resolved" },
                        { label: "To Be Inspected", value: "to_be_inspected" }
                    ]}
                    name={'associatedVenue'}
                    id={'associatedVenue'}
                    size={'small'}
                    isRequired={true}
                />
                {validationErrors?.associatedVenue && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.associatedVenue}.</Alert>}
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
                    sx={{ fontSize: "10px", '& .MuiFormControlLabel-label':{
                        fontSize:"10px"
                    } }}
                    control={
                        <Checkbox checked={formData.assetStatus} onChange={onChangeAsset} name="assetStatus" />
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
                    defaultValue={formData.model ?? ""}
                    onChange={onChange}
                    label={'Model'}
                    name={'model'}
                    id={'model'}
                    isRequired={true}
                />
                   {validationErrors?.model && <Alert icon={false} sx={{
                    background: 'unset',
                    color: "#9c4040",
                    padding: "0 10px",
                    '& .mui-1pxa9xg-MuiAlert-message': {
                        padding: '4px 0',
                    },
                }}  >{validationErrors?.model}.</Alert>}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.serial ?? ""}
                    onChange={onChange}
                    label={'Serial'}
                    name={'serial'}
                    id={'serial'}
                    isRequired={true}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.location ?? ""}
                    onChange={onChange}
                    label={'Location'}
                    name={'location'}
                    id={'location'}
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
            </Grid>

        </Grid>
    )
}

export default DeviceAddEditForm