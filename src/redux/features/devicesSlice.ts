import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface CounterState {
    devicesInfo: {
        isDeviceModal: boolean
        deviceModalType: string
    },
    deviceFormData: any,
    deviceHistory: {
        isDeviceHistoryModal: boolean
    }
}

// Define the initial state using that type
const initialState: CounterState = {
    devicesInfo: {
        isDeviceModal: false,
        deviceModalType: ""
    },
    deviceHistory: {
        isDeviceHistoryModal: false,
    },
    deviceFormData: null
}

export const devicesSlice = createSlice({
    name: 'devices',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setDeviceInfo: (state, actions) => {
            state.devicesInfo = actions.payload
        },
        setDeviceFormData: (state, actions) => {
            state.deviceFormData = actions.payload
        },
        setDeviceHistoryInfo: (state, actions) => {
            state.deviceHistory.isDeviceHistoryModal = actions.payload
        },
    },
})

export const { setDeviceInfo, setDeviceFormData, setDeviceHistoryInfo } = devicesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDevices = (state: RootState) => state.devices.devicesInfo

export default devicesSlice.reducer