import { configureStore } from '@reduxjs/toolkit'
import { headerSlice } from "./features/HeaderSlice"
import { exportSlice } from "./features/ExportSlice"
import { InspectionsSlice } from "./features/InspectionsSlice"
import { devicesSlice } from "./features/DevicesSlice"
import { groupInspectorsSlice } from "./features/GroupInspectorsSlice"
import { inspectorAdminSlice } from "./features/InspectorAdminSlice"
import { modalSlice } from './features/ModalSlice'
import { VenuesSlice } from './features/VenuesSlice'
import { commonSlice } from './features/CommonSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      header: headerSlice.reducer,
      modal: modalSlice.reducer,
      export: exportSlice.reducer,
      Inspections: InspectionsSlice.reducer,
      devices: devicesSlice.reducer,
      groupInspector: groupInspectorsSlice.reducer,
      inspectorAdmin: inspectorAdminSlice.reducer,
      Venues: VenuesSlice.reducer,
      common: commonSlice.reducer
    },
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']