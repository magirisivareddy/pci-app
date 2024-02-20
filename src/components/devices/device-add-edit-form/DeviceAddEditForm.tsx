import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput'
import { useAppSelector } from '@/redux/hooks';
import { Box, Button, Checkbox, FormControlLabel, Grid, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
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
    ipAddress: string
    assetStatus: boolean
}
const DeviceAddEditForm = () => {
    const { devicesInfo, deviceFormData } = useAppSelector(state => state.devices)
    const { deviceModalType } = devicesInfo
    // const theme = useTheme();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    console.log("deviceFormData",deviceFormData)
    const [formData, setFormData] = useState<FormData>({
        commonAssetName: deviceFormData?.commonAssetName ?? "",
        associatedVenue:deviceFormData?.associatedVenue ?? "",
        asset: deviceFormData?.asset ??"",
        manufacturer: deviceFormData?.manufacturer ??"",
        vendor: deviceFormData?.vendor ??"",
        model: deviceFormData?.model ??"",
        serial: deviceFormData?.serial ??"",
        location: deviceFormData?.location ??"",
        terminalId: deviceFormData?.terminalId ??"",
        profileId: deviceFormData?.profileId ??"",
        ipAddress: deviceFormData?.ipAddress ??"",
        assetStatus: false
    });
    console.log("formData", formData)
    const onChangeAsset = (e: any) => {
        const value = e.target.checked;
        const name = e.target.name;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={4}>
                <SelectInput
                    selectedOption={formData.commonAssetName}
                    onChange={onChange}
                    label={'Common Asset Name *'}
                    options={[
                        { label: "Inspected", value: "inspected" },
                        { label: "Missed Inspection", value: "missed_inspection" },
                        { label: "Inspected: Not Resolved", value: "inspected_not_resolved" },
                        { label: "To Be Inspected", value: "to_be_inspected" }
                    ]}
                    name={'commonAssetName'}
                    id={'commonAssetName'}
                />
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
                    id={'associatedVenue'} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.asset}
                    onChange={onChange}
                    label={'Asset'}
                    name={'asset'}
                    id={'asset'}
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={formData.assetStatus} onChange={onChangeAsset} name="assetStatus" />
                    }
                    label="Not an NQ asset tag not required"
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.manufacturer ?? ""}
                    onChange={onChange}
                    label={'Manufacturer'}
                    name={'manufacturer'}
                    id={'manufacturer'}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.vendor ?? ""}
                    onChange={onChange}
                    label={'Vendor'}
                    name={'vendor'}
                    id={'vendor'}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.model ?? ""}
                    onChange={onChange}
                    label={'Model'}
                    name={'model'}
                    id={'model'}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.serial ?? ""}
                    onChange={onChange}
                    label={'Serial'}
                    name={'serial'}
                    id={'serial'}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput
                    defaultValue={formData.location ?? ""}
                    onChange={onChange}
                    label={'Location'}
                    name={'location'}
                    id={'location'}
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
                        variant='contained'> {deviceModalType === "Add" ? "Add" : "Update"} </Button>
                </Box>
            </Grid>

        </Grid>
    )
}

export default DeviceAddEditForm