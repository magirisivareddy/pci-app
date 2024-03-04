import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getDefaultWeekRange } from '@/utils/helpers';

interface Row {
  id: string;
  status?: string;
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
  selectedInspector: any
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
  selectedInspector: {}
};

export const InspectionsSlice = createSlice({
  name: 'Inspections',
  initialState,
  reducers: {
    setInspectionFilterFormData: (state, action) => {
      const { name, value } = action.payload;
      state.inspectionFilterData.inspectionForm[name] = value;
    },
    setSelectedDateRange: (state, action) => {
      state.inspectionFilterData.selectedDateRange = action.payload;
    },
    updateInspectorData: (state, action: PayloadAction<{ name: string; value: string | null }>) => {
      state.inspectorData[action.payload.name] = action.payload.value;
    },
    updateRow: (state, action: PayloadAction<Partial<Row>>) => {
      const { id, status, notes, reason } = action.payload;
      const deviceIndex = state.devices.findIndex(device => device.id === id);
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
  },
});

export const { updateInspectorData, updateRow, setInitialValues, setSelectedInspector, setInspectionFilterFormData, setSelectedDateRange } = InspectionsSlice.actions;

export const selectInspections = (state: RootState) => state.Inspections;

export default InspectionsSlice.reducer;
