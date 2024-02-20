import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface CounterState {
    groupInspectorsInfo: {
        selectedGroupInspector: any,
        isAddInspectorModal:boolean,
        isDeleteInspectorModal:boolean,
        groupInspectorModal:boolean
        isdeleteVenuModal:boolean

    },

}

// Define the initial state using that type
const initialState: CounterState = {
    groupInspectorsInfo: {
        selectedGroupInspector: null,
        isAddInspectorModal:false,
        isDeleteInspectorModal:false,
        groupInspectorModal:false,
        isdeleteVenuModal:false
  
    },
 
}

export const groupInspectorsSlice = createSlice({
    name: 'groupInspectors',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSelectedGroupInspectors: (state, actions) => {
            state.groupInspectorsInfo.selectedGroupInspector = actions.payload
        },
        setInspectorModal: (state, actions) => {
            state.groupInspectorsInfo.isAddInspectorModal = actions.payload
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
        
     
    },
})

export const { setSelectedGroupInspectors,setInspectorModal,setDeleteInspectorModal,setGroupInspectorModal,setdeleteVenuModal } = groupInspectorsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGroupInspector = (state: RootState) => state.groupInspector

export default groupInspectorsSlice.reducer