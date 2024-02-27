import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface CounterState {
  value: {
    isInspectModalOpen:boolean
  }
}

// Define the initial state using that type
const initialState: CounterState = {
  value: {
    isInspectModalOpen:false
  },
}

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setModalInspectOpen: (state, actions) => {
      state.value.isInspectModalOpen = actions.payload
    },
  },
})

export const { setModalInspectOpen } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.modal.value

export default modalSlice.reducer