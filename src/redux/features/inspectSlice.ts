import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Row {
  id: string;
  status?: string;
  notes?: string;
}

interface InspectorFormState {
  inspectorData: {
    [key: string]: string | null;
  };
  devices: Row[];
  selectedInspector:any
}

const initialState: InspectorFormState = {
  inspectorData: {
    inspector: "Venkat Nayak",
    employee: "111111",
    venue: "Accounting- Casino",
  },
  devices: [],
  selectedInspector:{}
};

export const inspectFormSlice = createSlice({
  name: 'inspectFormData',
  initialState,
  reducers: {
    updateInspectorData: (state, action: PayloadAction<{ name: string; value: string | null }>) => {
      state.inspectorData[action.payload.name] = action.payload.value;
    },
    updateRow: (state, action: PayloadAction<Partial<Row>>) => {
      const { id, status, notes } = action.payload;
      const deviceIndex = state.devices.findIndex(device => device.id === id);
      if (deviceIndex !== -1) {
        if (status !== undefined) {
          state.devices[deviceIndex].status = status;
        }
        if (notes !== undefined) {
          state.devices[deviceIndex].notes = notes;
        }
      }
    },
    
    setInitialValues: (state, action: PayloadAction<{ id: string; status: string; notes: string }>) => {
      const { id, status, notes } = action.payload;

      const deviceIndex = state.devices.findIndex(device => device.id === id);

      if (deviceIndex !== -1) {
        state.devices[deviceIndex] = {
          ...state.devices[deviceIndex],
          status: status || '',
          notes: notes || '',
        };
      } else {
        state.devices.push({ id, status: status || '', notes: notes || '' });
      }
    },
    setSelectedInspector: (state, action: PayloadAction<{ reportId: string; venueId: string | null }>) => {
      state.selectedInspector = action.payload;
    },
  },
});

export const { updateInspectorData, updateRow, setInitialValues, setSelectedInspector } = inspectFormSlice.actions;

export const selectInspectFormData = (state: RootState) => state.inspectFormData;

export default inspectFormSlice.reducer;