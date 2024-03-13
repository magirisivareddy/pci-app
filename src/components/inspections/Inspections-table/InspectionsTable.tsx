"use client"
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

// import { inspectionsTableHeaders } from '@/utils/table-heders';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Popover from '@mui/material/Popover';

import { Button, Tooltip, Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';
import { format } from 'date-fns';
import { setDeviceStatus, setInitialValues, setSaveReportStatus, setSelectedInspector } from '@/redux/features/InspectionsSlice';
import { setModalInspectOpen } from '@/redux/features/ModalSlice';

import Modal from '@/components/common/modal/Modal';
import Inspector from '../inspector/Inspector';
import InspectionNotes from '../inspection-notes/InspectionNotes';
import CustomTable from '@/components/common/table/Table';
import HelpdeskTicketForm from '../helpdesk-ticket/HelpdeskTicketForm';
import { insertOrUpdateReport } from '@/actions/api';
import Loading from '@/app/loading';

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
  const { devices, selectedInspector, saveReportStatus, deviceStatus } = useAppSelector(state => state.Inspections)

  const [isHelpDeskModal, setHelpDeskModal] = useState(false)
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleModalClose = () => {
    setHelpDeskModal(false)
  }
  const onHelpDeskModal = () => {
    setHelpDeskModal(true)
  }
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopOver = Boolean(anchorEl);
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setDeviceStatus({
      open: false,
      message: "",
      severity: ''
    }))

    setOpen(false);
  };
  const handleClose = () => {
    dispatch(setModalInspectOpen(false));
    dispatch(setInitialValues([]));

    dispatch(setDeviceStatus({
      open: false,
      message: "",
      severity: ''
    }))
  };
  const handleInspectClick = (row: any) => {
    dispatch(setSelectedInspector(row))
    dispatch(setModalInspectOpen(true));
  };
  const handleSave = async () => {
    const obj = {
      inspectorENumber: selectedInspector?.inspectorEmployeenumber,
      reportId: selectedInspector.reportId,
      venueId: selectedInspector.venue_id,
      venueName: selectedInspector.venue_name,
    };
    const payload = {
      ...obj,
      devices,
    };
  
    // Check status field validation
    const invalidStatusDevice = devices.find(device => {
      if (!device.status) return true; // Check if status is undefined or null
      return !["fail", "Questionable", "pass"].includes(device.status.toLowerCase());
    });
  
    if (invalidStatusDevice) {
      setOpen(true);
      dispatch(setDeviceStatus({
        open: true,
        message: "Invalid status value found!",
        severity: "error",
      }))
      return;
    }
  
    // Check notes field validation based on status
    const deviceWithEmptyNotes = devices.find(device => (
      (device.status === "fail" || device.status === "Questionable") && !device.notes
    ));
  
    if (deviceWithEmptyNotes) {
      setOpen(true);
  
      dispatch(setDeviceStatus({
        open: true,
        message: "Notes cannot be empty for devices with 'Failed' or 'Questionable' status!",
        severity: "error",
      }))
      return;
    }
  
    try {
      dispatch(setSaveReportStatus(true));
      const res = await insertOrUpdateReport(payload);
      dispatch(setDeviceStatus({
        open: true,
        message: `${res.message}!`,
        severity: "success",
      }))
  
      dispatch(setSaveReportStatus(false));
      setTimeout(() => {
        dispatch(setModalInspectOpen(false));
        dispatch(setDeviceStatus({
          open: false,
          message: "",
          severity: "",
        }))
  
      }, 3000);
    } catch (error: any) {
      dispatch(setSaveReportStatus(false));
      dispatch(setDeviceStatus({
        open: true,
        message: `${error.message}!`,
        severity: "error",
      }))
  
    }
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
      id: 'inspector Employee',
      label: 'Inspector Employee',
      customRender: (value: any, row: any): JSX.Element => {
        const name = `${row.inpsectorLastName} ${row.inpsectorFirstName}`;

        return (
          name.trim() !== '' ? (
            <span>{name} {row.inspectorEmployeenumber}</span>
          ) : (
            <span style={{ color: "#F00" }}>
              {row.venue_name !== "SPARE DEVICES" &&
                row.venue_name !== "ARCHIVED DEVICES" &&
                row.venue_name !== "IT STORAGE" &&
                (row.inspectorEmployeenumber === 0)
                ? "No Main Inspector assigned"
                : ""}
            </span>
          )
        );
      }

    },
    { id: 'totalDevices', label: 'Total Devices' },
    { id: 'questionable', label: 'Total Questionable Devices' },
    { id: 'failed', label: 'Total Failed Devices' },
    {
      id: 'inspect',
      label: 'Inspect',
      customRender: (value: any, row: any): JSX.Element => {
        // console.log("row", row);
        let title = "";

        if (row.reportId === 0) {
          title = "Inspect";
        } else if (row.questionable !== 0 || row.failed !== 0) {
          title = "Edit";

          if (row.dateDifference && row.dateDifference <= 0) {
            title = "View";
          }
        }

        return (
          <Button size="small" variant="outlined" onClick={() => handleInspectClick(row)}>
            {title}
          </Button>
        );
      }
    }

  ];
  return (<>

    <Typography
      variant='caption'
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      sx={{marginLeft:"2px"}}
    >
      NOTES:
    </Typography>

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
          isDisabled={selectedInspector.totalDevices === 0}
          footerLink="Report a Finding / Raise a ticket"
          onFooterLink={onHelpDeskModal}

        />
      </form> : null}
    <Modal
      title={'Helpdesk Ticket'}
      open={isHelpDeskModal}
      scroll={'paper'}
      handleClose={handleModalClose}
      contentComponent={(props) => <HelpdeskTicketForm handleModalClose={handleModalClose} />}
      fullWidth={true}


      maxWidth={"md"}
    />
    <Snackbar anchorOrigin={{ horizontal: "center", vertical: 'bottom', }} sx={{ width: "80%", bottom: "20px" }} open={deviceStatus.open} autoHideDuration={6000} onClose={handleCloseAlert}>
      <Alert
        onClose={handleCloseAlert}
        severity={deviceStatus.severity as AlertProps['severity']}
        variant="filled"
        sx={{ width: '100%', alignItems: "center" }}
      >
        {deviceStatus.message}
      </Alert>

    </Snackbar>
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
      }}
      open={openPopOver}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <InspectionNotes />
    </Popover>

  </>
  )
}

export default InspectionsTable

