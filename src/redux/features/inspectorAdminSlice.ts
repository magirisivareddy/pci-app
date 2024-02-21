import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'


// Define a type for the slice state
interface CounterState {
    inspectorAdminInfo: {
        isinspectorAdminDeleteModal: boolean
    },
}

// Define the initial state using that type
const initialState: CounterState = {
    inspectorAdminInfo: {
        isinspectorAdminDeleteModal: false,
    },
}

export const inspectorAdminSlice = createSlice({
    name: 'inspectorAdmin',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setinspectorAdminDeleteModal: (state, actions) => {
            state.inspectorAdminInfo.isinspectorAdminDeleteModal = actions.payload
        },
    
    },
})

export const { setinspectorAdminDeleteModal } = inspectorAdminSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectInspectorAdmin = (state: RootState) => state.inspectorAdmin

export default inspectorAdminSlice.reducer