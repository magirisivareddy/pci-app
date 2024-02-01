import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface CounterState {
  value: {
    isSideBar:boolean
  }
}

// Define the initial state using that type
const initialState: CounterState = {
  value: {
    isSideBar:false
  },
}

export const headerSlice = createSlice({
  name: 'header',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMobileView: (state, actions) => {
      state.value.isSideBar = actions.payload
    },
  },
})

export const { setMobileView } = headerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.header.value

export default headerSlice.reducer