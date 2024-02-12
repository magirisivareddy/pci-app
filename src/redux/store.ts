import { configureStore } from '@reduxjs/toolkit'
import { headerSlice } from "../redux/features/headerSlice"
import { modalSlice } from "./features/ModalSlice"
import {exportSlice} from "../redux/features/exportSlice"
import {inspectFormSlice} from "../redux/features/inspectSlice"


export const makeStore = () => {
  return configureStore({
    reducer: {
      header: headerSlice.reducer,
      modal: modalSlice.reducer,
      export:exportSlice.reducer,
      inspectFormData:inspectFormSlice.reducer
    },
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']