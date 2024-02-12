import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface ExportState {
    value: {
        body: [],
        header: []
    }
}

// Define the initial state using that type
const initialState: ExportState = {
    value: {
        body: [],
        header: []
    },
}

export const exportSlice = createSlice({
    name: 'export',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setBodyData: (state, actions) => {
            state.value.body = actions.payload
        },
        setHeaderData: (state, actions) => {
            state.value.header = actions.payload
        }
    },
})

export const { setBodyData, setHeaderData } = exportSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.export.value

export default exportSlice.reducer