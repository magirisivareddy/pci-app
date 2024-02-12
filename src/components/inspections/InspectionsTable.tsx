"use client"
import React from 'react'
import CustomTable from '../common/table/Table';
import { inspectionsTableHeaders } from '@/utils/table-heders';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '../common/modal/Modal';
import { setModalInspectOpen } from '@/redux/features/ModalSlice';
import { downloadExcel } from 'react-export-table-to-excel';
import Inspector from './inspector/Inspector';


interface InspectionsTableProps {
  data: TableRowData[];
  islodaing: boolean; // Assuming data is an array of TableRowData
}

interface TableRowData {
  status: string;
  reportDate: string;
  weekNumber: number;
  venue: string;
  inspectorEmployeeNumber: string;
  totalDevices: number;
  totalQuestionableDevices: number;
  totalFailedDevices: number;
  id: number;
}
const InspectionsTable: React.FC<InspectionsTableProps> = ({ data, islodaing }) => {
  const dispatch = useAppDispatch();
  const isInspect = useAppSelector(state => state.modal.value.isInspectModalOpen)
  const { header, body } = useAppSelector(state => state.export.value)
  const handleClose = () => {
    dispatch(setModalInspectOpen(false));
  };
  const handleSave = () => {
    console.log("call")
  }
  const handleExport = () => {
    downloadExcel({
      fileName: "Inspections",
      sheet: "data",
      tablePayload: {
        header,
        body
      }
    });
  };
  return (<>
    {/* <Box display="flex" justifyContent="flex-end" marginBottom={1}>
      <Button onClick={handleExport} sx={{ marginRight: '16px', marginTop: '8px' }}>Export to Excel</Button>
    </Box> */}
    <CustomTable data={data} headers={inspectionsTableHeaders} dispatch={dispatch} isloading={false} />
    {isInspect ?
      <form >
        <Modal
          open={isInspect}
          fullWidth={true}
          maxWidth='md'
          title='INSPECT'
          scroll={"paper"}
          showCloseIcon={true}
          handleClose={handleClose}
          contentComponent={Inspector}
          handleCancel={handleClose}
          handleSubscribe={handleSave}
          buttonType="submit"

        /> </form> : null}
  </>
  )
}

export default InspectionsTable

