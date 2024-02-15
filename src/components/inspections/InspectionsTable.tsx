"use client"
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CustomTable from '../common/table/Table';
// import { inspectionsTableHeaders } from '@/utils/table-heders';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '../common/modal/Modal';
import { setModalInspectOpen } from '@/redux/features/ModalSlice';
import { downloadExcel } from 'react-export-table-to-excel';
import Inspector from './inspector/Inspector';
import { Button, Tooltip } from '@mui/material';
import InspectionNotes from './inspection-notes/InspectionNotes';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { format } from 'date-fns';
import { setSelectedInspector } from '@/redux/features/inspectSlice';

interface InspectionsTableProps {
  data: TableRowData[];
  isLoading?: boolean; // Assuming data is an array of TableRowData
}
type Header = {
  id: string;
  label: string;
  customRender?: (_value: any, row: any) => JSX.Element;
};
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
const InspectionsTable: React.FC<InspectionsTableProps> = ({ data, isLoading }) => {
  const dispatch = useAppDispatch();
  const isInspect = useAppSelector(state => state.modal.value.isInspectModalOpen)
  const { inspectorData, devices } = useAppSelector(state => state.inspectFormData)
  const { header, body } = useAppSelector(state => state.export.value)
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({
    open: false,
    message: "",
    severity: ''

  })
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setStatus({
      open: false,
      message: "",
      severity: ''
    })
    setOpen(false);
  };
  const handleClose = () => {
    dispatch(setModalInspectOpen(false));
    setStatus({
      open: false,
      message: "",
      severity: ''
    })
  };
  const handleInspectClick = (row: any) => {
    dispatch(setSelectedInspector({
      reportId:row.reportId.toString(),
      venueId:row.venue_id

    }))
    dispatch(setModalInspectOpen(true));
  };

  const handleSave = () => {
    const deviceWithEmptyStatusOrNotes = devices.find(device => !device.status || !device.notes);
    if (deviceWithEmptyStatusOrNotes) {
      setOpen(true)
      setStatus({
        ...status,
        open: true,
        message: " Status and Notes cannot be empty for all devices!",
        severity: "error"
      });
      return
    }
    setStatus({
      ...status,
      open: true,
      // You can also update other properties if needed
      // For example, message and severity
      message: "Data submitted successfully!",
      severity: "success"
    });

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
  const inspectionsTableHeaders: Header[] = [
    {
      id: 'status',
      label: 'Status',
      customRender: (value: any, row: any): JSX.Element => (
        <span>
          {row.status === 'Active' ? (
            <Tooltip title="Active">
              <DoneOutlineIcon color="success" />
            </Tooltip>
          ) : (
            <Tooltip title="To be inspected in 72 hours">
              <ErrorIcon color="success" />
            </Tooltip>
          )}
        </span>
      )
    },
    
    { id: 'reportId', label: 'Report Id' },
    { id: 'weekNumber', label: 'Week' },
    {
      id: 'reportDateTime', label: 'Report Date',
      customRender: (value: any, row: any): JSX.Element => (
        <span>
          {format(row.reportDateTime, 'dd/MM/yyyy hh:mm a')}
        </span>
      )
    },
    { id: 'venue_name', label: 'Venue' },
    {
      id: 'inspectorEmployeenumber', label: 'Employee Number', customRender: (value: any, row: any): JSX.Element => (
        row.inspectorEmployeeNumber ? <span>{row.inspectorEmployeeNumber}</span> : <span>No main inspector assigned</span>
      )
    },
    { id: 'totalDevices', label: 'Total Devices' },
    { id: 'questionable', label: 'Total Questionable Devices' },
    { id: 'failed', label: 'Total Failed Devices' },
    {
      id: 'inspect', label: 'Inspect', customRender: (value: any, row: any): JSX.Element => {
        return (
          <Button size="small" variant="outlined" onClick={() => handleInspectClick(row)}>
            Inspect
          </Button>
        );
      }
    },
  ];
  return (<>
    {/* <Box display="flex" justifyContent="flex-end" marginBottom={1}>
      <Button onClick={handleExport} sx={{ marginRight: '16px', marginTop: '8px' }}>Export to Excel</Button>
    </Box> */}

    <CustomTable data={data} headers={inspectionsTableHeaders} isloading={isLoading} />
    {isInspect ?
      <form >
        <Modal
          open={isInspect}
          fullWidth={true}
          maxWidth='lg'
          title='INSPECT'
          scroll={"paper"}
          showCloseIcon={true}
          handleClose={handleClose}
          contentComponent={Inspector}
          handleCancel={handleClose}
          handleSubscribe={handleSave}
          buttonType="submit"
          buttonText="Submit"

        />
      </form> : null}
    <InspectionNotes />
    <Snackbar anchorOrigin={{ horizontal: "center", vertical: 'bottom' }} open={status.open} autoHideDuration={6000} onClose={handleCloseAlert}>
      <Alert
        onClose={handleCloseAlert}
        severity={status.severity}
        variant="filled"
        sx={{ width: '100%', alignItems: "center" }}
      >
        {status.message}
      </Alert>
    </Snackbar>

  </>
  )
}

export default InspectionsTable

