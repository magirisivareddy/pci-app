

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const inspectFormSlice = createSlice({
    name: 'inspectFormData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: [],
    reducers: {
        updateRow: (state, action) => {
            const rowIndex = state.findIndex(row => row.id === action.payload.id);
            if (rowIndex !== -1) {
              // If the row exists, update it
              state[rowIndex] = action.payload;
            } else {
              // If the row doesn't exist, push a new object
              state.push(action.payload);
            }
          },
          
    },
})

export const { updateRow } = inspectFormSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectInspectFormData = (state: RootState) => state.inspectFormData

export default inspectFormSlice.reducer