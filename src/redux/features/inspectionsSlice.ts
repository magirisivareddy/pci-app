import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getDefaultWeekRange } from '@/utils/helpers';
import { fetchInspections } from '@/actions/api';

interface Row {
  deviceId: string;
  status?: any;
  notes?: string;
  reason?: string
}

interface InspectorFormState {
  inspectorData: {
    [key: string]: string | null;
  };
  inspectionFilterData: {
    inspectionForm: any
    selectedDateRange: any
  }
  devices: Row[];
  saveReportStatus: boolean
  selectedInspector: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  inspectionsList: any; // Change 'any' to the actual type of your data
  error: string | null;
  deviceStatus:any
}

const initialState: InspectorFormState = {
  inspectorData: {
    inspector: "Venkat Nayak",
    employee: "111111",
    venue: "Accounting- Casino",
  },
  inspectionFilterData: {
    inspectionForm: {
      venue: 'All',
      inspector: 'All',
      reportStatus: 'to be inspected',
    },
    selectedDateRange: getDefaultWeekRange()
  },
  devices: [],
  saveReportStatus: false,
  selectedInspector: {},
  status: 'idle',
  inspectionsList: [], // Change 'any' to the actual type of your data
  error: null,
  deviceStatus:{
    open: false,
    message: "",
    severity: ''

  }
};
export const getInspections = createAsyncThunk('inspections/getInspections', async (obj: any) => {
  try {
    const response = await fetchInspections(obj);
    return response;
  } catch (error) {
    console.error('Error in getInspections:', error);
    throw error;
  }
});
export const InspectionsSlice = createSlice({
  name: 'Inspections',
  initialState,
  reducers: {
    setIntialFilterFormData: (state, action) => {
      state.inspectionFilterData.inspectionForm = action.payload;
    },
    setInspectionFilterFormData: (state, action) => {
      const { name, value } = action.payload;
      state.inspectionFilterData.inspectionForm[name] = value;
    },
    setSelectedDateRange: (state, action) => {
      console.log("action.payload",action.payload)
      state.inspectionFilterData.selectedDateRange = action.payload;
    },
    setSaveReportStatus: (state, action) => {
      state.saveReportStatus = action.payload;
    },
    updateInspectorData: (state, action: PayloadAction<{ name: string; value: string | null }>) => {
      state.inspectorData[action.payload.name] = action.payload.value;
    },
    updateRow: (state, action: PayloadAction<Partial<Row>>) => {
      const { deviceId, status, notes, reason } = action.payload;
      const deviceIndex = state.devices.findIndex(device => device.deviceId === deviceId);
      if (deviceIndex !== -1) {
        if (status !== undefined) {
          state.devices[deviceIndex].status = status;
        }
        if (notes !== undefined) {
          state.devices[deviceIndex].notes = notes;
        }
        if (reason !== undefined) {
          state.devices[deviceIndex].reason = reason;
        }
      }
    },

    // Inside inspectSlice.ts
    setInitialValues: (state, action: PayloadAction<Row[]>) => {
      const initialValues = action.payload;

      if (Array.isArray(initialValues)) {
        // Clear existing devices
        state.devices = [];

        // Set initial values for each device
        initialValues.forEach(device => {
          state.devices.push({ ...device });
        });
      }
    },
    setSelectedInspector: (state, action: PayloadAction<{ reportId: string; venueId: string | null }>) => {
      state.selectedInspector = action.payload;
    },
    setDeviceStatus: (state, action: PayloadAction<any>) => {
      state.deviceStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInspections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInspections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.inspectionsList = action.payload;
      })
      .addCase(getInspections.rejected, (state, action) => {
        state.status = 'failed';
        state.inspectionsList = [];
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { updateInspectorData, updateRow, setInitialValues, setSelectedInspector, setInspectionFilterFormData, setSelectedDateRange, setSaveReportStatus,setDeviceStatus,setIntialFilterFormData } = InspectionsSlice.actions;

export const selectInspections = (state: RootState) => state.Inspections;

export default InspectionsSlice.reducer;
