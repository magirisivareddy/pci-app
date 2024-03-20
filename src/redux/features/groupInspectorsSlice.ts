
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store'
import { searchGroupInspectors } from '@/actions/api';


// Define a type for the slice state
interface CounterState {
    groupInspectorsInfo: {
        selectedGroupInspector: any
        isAddVenueToInspectorModal: boolean
        isDeleteInspectorModal: boolean
        groupInspectorModal: boolean
        isdeleteVenuModal: boolean
        deletedVenuId: any,
        receiveNoticeStatus: any,
        receiveNoticeLoading: boolean,
        receiveNoticeStatusError: any
        formData: any

    },
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    groupInspectorsData: any; // Change 'any' to the actual type of your data
    error: string | null;

}

// Define the initial state using that type
const initialState: CounterState = {
    groupInspectorsInfo: {
        selectedGroupInspector: null,
        isAddVenueToInspectorModal: false,
        isDeleteInspectorModal: false,
        groupInspectorModal: false,
        isdeleteVenuModal: false,
        deletedVenuId: null,
        receiveNoticeStatus: "",
        receiveNoticeLoading: false,
        receiveNoticeStatusError: '',
        formData: {
            venue: 'All',
            inspector: 'All'
        }

    },
    status: 'idle',
    groupInspectorsData: [],
    error: null,

}

export const getGroupInspectors = createAsyncThunk('groupInspectors/getGroupInspectors', async (obj: any) => {
    try {
        const response = await searchGroupInspectors(obj);
        return response;
    } catch (error) {
        console.error('Error in getGroupInspectors:', error);
        throw error;
    }
});

export const groupInspectorsSlice = createSlice({
    name: 'groupInspectors',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSelectedGroupInspectors: (state, actions) => {
            state.groupInspectorsInfo.selectedGroupInspector = actions.payload
        },
        setDeletedVenuId: (state, actions) => {
            state.groupInspectorsInfo.deletedVenuId = actions.payload
        },
        setAddVenuToInspectorModal: (state, actions) => {
            state.groupInspectorsInfo.isAddVenueToInspectorModal = actions.payload
        },
        setDeleteInspectorModal: (state, actions) => {
            state.groupInspectorsInfo.isDeleteInspectorModal = actions.payload
        },
        setGroupInspectorModal: (state, actions) => {
            state.groupInspectorsInfo.groupInspectorModal = actions.payload
        },
        setdeleteVenuModal: (state, actions) => {
            state.groupInspectorsInfo.isdeleteVenuModal = actions.payload
        },
        setReceiveNoticeStatus: (state, actions) => {
            state.groupInspectorsInfo.receiveNoticeStatus = actions.payload
        },
        setReceiveNoticeLoading: (state, actions) => {
            state.groupInspectorsInfo.receiveNoticeLoading = actions.payload
        },
        setReceiveNoticeStatusError: (state, actions) => {
            state.groupInspectorsInfo.receiveNoticeStatusError = actions.payload
        },
        setGroupInspectorsFilterFormData: (state, action: PayloadAction<{ value: any; name: string }>) => {
            const { value, name } = action.payload;
            state.groupInspectorsInfo.formData = {
                ...state.groupInspectorsInfo.formData,
                [name]: value,
            };
        },
        setGroupInspectorsFilterClearFormData: (state) => {
            state.groupInspectorsInfo.formData = {
                venue: 'All',
                inspector: 'All'
            };
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroupInspectors.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getGroupInspectors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.groupInspectorsData = action.payload;
            })
            .addCase(getGroupInspectors.rejected, (state, action) => {
                state.status = 'failed';
                state.groupInspectorsData = [];
                state.error = action.error.message || 'An error occurred';
            });
    },
})

export const { setSelectedGroupInspectors, setAddVenuToInspectorModal,
    setDeleteInspectorModal, setGroupInspectorModal, setdeleteVenuModal,
    setDeletedVenuId, setReceiveNoticeStatus, setReceiveNoticeLoading,
    setReceiveNoticeStatusError, setGroupInspectorsFilterFormData,setGroupInspectorsFilterClearFormData } = groupInspectorsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGroupInspector = (state: RootState) => state.groupInspector

export default groupInspectorsSlice.reducer