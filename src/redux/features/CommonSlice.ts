import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'
import { fetchInspectors, fetchVenue, searchDevices } from '@/actions/api';


// Define a type for the slice state
interface CommonState {
    isloading: 'idle' | 'loading' | 'succeeded' | 'failed';
    venueDropdown: any; // Change 'any' to the actual type of your data
    error: string | null;
    inspectorDropdown:any
    userInfo:any
}

// Define the initial state using that type
const initialState: CommonState = {
    isloading: 'idle',
    venueDropdown: [],
    error: null,
    inspectorDropdown:[],
    userInfo: {
        userName: "siva",
        role: "Admin",
   
      }
}

export const getVenue = createAsyncThunk('devices/getVenue', async () => {
    try {
      const response = await fetchVenue();
      return response;
    } catch (error) {
      console.error('Error in getVenue:', error);
      throw error;
    }
  });
  export const getInspectors = createAsyncThunk('devices/getInspectors', async () => {
    try {
      const response = await fetchInspectors();
      return response;
    } catch (error) {
      console.error('Error in getInspectors:', error);
      throw error;
    }
});
export const commonSlice = createSlice({
    name: 'common',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setUserInfo: (state, actions) => {
        state.userInfo = actions.payload
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVenue.pending, (state) => {
                state.isloading = 'loading';
            })
            .addCase(getVenue.fulfilled, (state, action) => {
                state.isloading = 'succeeded';
                state.venueDropdown = action.payload;
            })
            .addCase(getVenue.rejected, (state, action) => {
                state.isloading = 'failed';
                state.venueDropdown = [];
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(getInspectors.pending, (state) => {
                state.isloading = 'loading';
            })
            .addCase(getInspectors.fulfilled, (state, action) => {
                state.isloading = 'succeeded';
                state.inspectorDropdown = action.payload;
            })
            .addCase(getInspectors.rejected, (state, action) => {
                state.isloading = 'failed';
                state.inspectorDropdown = [];
                state.error = action.error.message || 'An error occurred';
            });
    },
})

export const {setUserInfo } = commonSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCommon = (state: RootState) => state.common

export default commonSlice.reducer