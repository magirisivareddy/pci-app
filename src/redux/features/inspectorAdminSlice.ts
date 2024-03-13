import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { searchAdmins } from '@/actions/api';

interface CounterState {
    inspectorAdminInfo: {
        isinspectorAdminDeleteModal: boolean;
        selectedAdminRow: any;
        adminLevelStatus:any
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    adminData: any; // Change 'any' to the actual type of your data
    error: string | null;
}

const initialState: CounterState = {
    inspectorAdminInfo: {
        isinspectorAdminDeleteModal: false,
        selectedAdminRow: null,
        adminLevelStatus:null
    },
    status: 'idle',
    adminData: [],
    error: null,
};

export const getAdminList = createAsyncThunk('inspectorAdmin/getAdminList', async (obj: any) => {
    try {
      const response = await searchAdmins(obj);
      return response;
    } catch (error) {
      console.error('Error in getAdminList:', error);
      throw error;
    }
  });

export const inspectorAdminSlice = createSlice({
    name: 'inspectorAdmin',
    initialState,
    reducers: {
        setinspectorAdminDeleteModal: (state, action: PayloadAction<boolean>) => {
            state.inspectorAdminInfo.isinspectorAdminDeleteModal = action.payload;
        },
        setSelectedAdminrow: (state, action: PayloadAction<any>) => {
            state.inspectorAdminInfo.selectedAdminRow = action.payload;
        },
        setAdminLevelStatus: (state, action: PayloadAction<any>) => {
            state.inspectorAdminInfo.adminLevelStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAdminList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adminData = action.payload;
            })
            .addCase(getAdminList.rejected, (state, action) => {
                state.status = 'failed';
                state.adminData = [];
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export const { setinspectorAdminDeleteModal, setSelectedAdminrow, setAdminLevelStatus } = inspectorAdminSlice.actions;

export const selectInspectorAdmin = (state: RootState) => state.inspectorAdmin;

export default inspectorAdminSlice.reducer;
