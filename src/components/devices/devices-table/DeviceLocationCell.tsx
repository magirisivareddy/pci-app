import { updatePciLabeled } from '@/actions/api'
import { getDevices, setDeviceLocationErrorMessage, setDeviceLocationStatus, setDeviceLocationSuccessMessage } from '@/redux/features/DevicesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Checkbox, Typography } from '@mui/material'
import React, { useState } from 'react'


const DeviceLocationCell = ({ row }: any) => {
    const dispatch = useAppDispatch()
    const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
    const deviceId = row.deviceId
    const defaultPciLabeled = row.pciLabeled === 1 ? true : false
    const [pciLabeled, setPciLabeled] = useState(defaultPciLabeled)
    const employeeNumber = employeeInfo?.employeeNumber;
    const isViewList = ["Inspector", "GroupInspector","BackupInspector","MainInspector"]
    const onChangeDeviceLocation = async (e: any) => {
        setPciLabeled(e.target.checked);
        dispatch(setDeviceLocationStatus(true))
        try {
            const res = await updatePciLabeled(deviceId, employeeNumber)
            dispatch(setDeviceLocationSuccessMessage(res.message))
            dispatch(setDeviceLocationStatus(false))
            const obj = {
                "is_It": employeeInfo?.role === "IT" ? "1" : "0",
                "venueId": "All",
                "commonAssetName": "",
                "serialNumber": "",
                "assetNumber": "",
                "terminalId": "",
                "profileId": "",
                "employeeNumber": employeeNumber
            }
            dispatch(getDevices(obj))
            setTimeout(() => {
                dispatch(setDeviceLocationSuccessMessage(""))
            }, 3000)

        } catch (error: any) {

            dispatch(setDeviceLocationErrorMessage(error.message))
            setTimeout(() => {
                setPciLabeled(defaultPciLabeled);
                dispatch(setDeviceLocationSuccessMessage(""))
            }, 3000)

            dispatch(setDeviceLocationStatus(false))
        }
    }
    const label = { inputProps: { 'aria-label': 'device location' } };
    return (
        <>
            <Typography>{row.deviceLocation}</Typography>
            <Checkbox
                onChange={onChangeDeviceLocation}
                disabled={isViewList.includes(employeeInfo?.role)}
                sx={{ paddingTop: "0", paddingBottom: "0" }}
                {...label}
                checked={pciLabeled}
            /><span style={{ position: "relative", top: "3px", right: "5px" }}>Is labeled</span>
        </>


    )
}

export default DeviceLocationCell