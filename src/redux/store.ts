import { configureStore } from '@reduxjs/toolkit'
import { headerSlice } from "../redux/features/headerSlice"
import {exportSlice} from "../redux/features/exportSlice"
import {InspectionsSlice} from "./features/inspectionsSlice"
import {devicesSlice} from "../redux/features/devicesSlice"
import {groupInspectorsSlice} from "../redux/features/groupInspectorsSlice"
import {inspectorAdminSlice} from "../redux/features/inspectorAdminSlice"
import { modalSlice } from './features/modalSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      header: headerSlice.reducer,
      modal: modalSlice.reducer,
      export:exportSlice.reducer,
      Inspections:InspectionsSlice.reducer,
      devices:devicesSlice.reducer,
      groupInspector:groupInspectorsSlice.reducer,
      inspectorAdmin:inspectorAdminSlice.reducer
    },
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']