import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'
import { searchDevices, searchVenues } from '@/actions/api';


// Define a type for the slice state
interface CounterState {
    venueInfo: {
        selectedVenueRow: any
        isAddOrEditVenueModal:boolean
        isDeletVenueModal:boolean
        showInspector:boolean
        isDeletInspectionModal:boolean
        selectedVenueInspector:any
    },

    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    venuesData: any; // Change 'any' to the actual type of your data
    error: string | null;
}

// Define the initial state using that type
const initialState: CounterState = {
    venueInfo: {
        selectedVenueRow: null,
        isAddOrEditVenueModal:false,
        isDeletVenueModal:false,
        showInspector:false,
        isDeletInspectionModal:false,
        selectedVenueInspector:null
    },
    status: 'idle',
    venuesData: [],
    error: null,
}
export const getVenues = createAsyncThunk('venues/getVenues', async (obj: any) => {
    try {
        const response = await searchVenues(obj);
        return response;
    } catch (error) {
        console.error('Error in getVenues:', error);
        throw error;
    }
});
export const VenuesSlice = createSlice({
    name: 'Venues',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        selectedVenueRow: (state, action: PayloadAction<boolean>) => {
            state.venueInfo.selectedVenueRow = action.payload;
        },
        setAddOrEditVenueModal: (state, action: PayloadAction<boolean>) => {
            state.venueInfo.isAddOrEditVenueModal = action.payload;
        },
        setDeletVenueModal: (state, action: PayloadAction<boolean>) => {
            state.venueInfo.isDeletVenueModal = action.payload;
        },
        setShowInspector: (state, action: PayloadAction<boolean>) => {
            state.venueInfo.showInspector = action.payload;
        },
        setDeletInspectionModal: (state, action: PayloadAction<boolean>) => {
            state.venueInfo.isDeletInspectionModal = action.payload;
        },
        setSelectedVenueInspector: (state, action: PayloadAction<boolean>) => {
            state.venueInfo.selectedVenueInspector = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVenues.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getVenues.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.venuesData = action.payload;
            })
            .addCase(getVenues.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An error occurred';
            });
    },
})

export const {selectedVenueRow, setAddOrEditVenueModal,setDeletVenueModal,setShowInspector,setDeletInspectionModal,setSelectedVenueInspector } = VenuesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectVenues = (state: RootState) => state.Venues

export default VenuesSlice.reducer