import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'
import { searchDevices } from '@/actions/api';


// Define a type for the slice state
interface CounterState {
    devicesInfo: {
        isDeviceModal: boolean
        deviceModalType: string
    },
    deviceFormData: any,
    deviceHistory: {
        isDeviceHistoryModal: boolean
    },
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    devicesData: any; // Change 'any' to the actual type of your data
    error: string | null;
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
    deviceFormData: null,
    status: 'idle',
    devicesData: [],
    error: null,
}

export const getDevices = createAsyncThunk('devices/getDevices', async (obj: any) => {
    try {
      const response = await searchDevices(obj);
      return response;
    } catch (error) {
      console.error('Error in getDevices:', error);
      throw error;
    }
  });
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
    extraReducers: (builder) => {
        builder
            .addCase(getDevices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDevices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.devicesData = action.payload;
            })
            .addCase(getDevices.rejected, (state, action) => {
                state.status = 'failed';
                state.devicesData = [];
                state.error = action.error.message || 'An error occurred';
            });
    },
})

export const { setDeviceInfo, setDeviceFormData, setDeviceHistoryInfo } = devicesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDevices = (state: RootState) => state.devices.devicesInfo

export default devicesSlice.reducer