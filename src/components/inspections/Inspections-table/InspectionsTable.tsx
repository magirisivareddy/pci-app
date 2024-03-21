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
import { getInspections, setDeviceStatus, setInitialValues, setSaveReportStatus, setSelectedInspector, setSelectedInspectorType } from '@/redux/features/InspectionsSlice';
import { setModalInspectOpen } from '@/redux/features/ModalSlice';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

import Modal from '@/components/common/modal/Modal';
import Inspector from '../inspector/Inspector';
import InspectionNotes from '../inspection-notes/InspectionNotes';
import CustomTable from '@/components/common/table/Table';
import HelpdeskTicketForm from '../helpdesk-ticket/HelpdeskTicketForm';
import { insertOrUpdateReport } from '@/actions/api';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Loading from '@/app/loading';

interface InspectionsTableProps {
  data: TableRowData[];
  isLoading?: boolean; // Assuming data is an array of TableRowData
  initialPayload?: any
}
type Header = {
  id: string;
  label: string;
  customRender?: (_value: any, row: any) => JSX.Element;
  width: string

};
interface TableRowData {
  status: string;
  reportDate: string;
  weekNumber: number;
  venue: string;
  inspector_enumber: string;
  totalDevices: number;
  totalQuestionableDevices: number;
  totalFailedDevices: number;
  id: number;
}
const InspectionsTable: React.FC<InspectionsTableProps> = ({ data, isLoading }) => {
  const dispatch = useAppDispatch();
  const isInspect = useAppSelector(state => state.modal.value.isInspectModalOpen)
  const { devices, selectedInspector, saveReportStatus, deviceStatus, inspectionFilterData } = useAppSelector(state => state.Inspections)
  const inspectionForm = inspectionFilterData.inspectionForm
  const selectedDateRange = inspectionFilterData.selectedDateRange

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
  const handleInspectClick = (row: any, title: any) => {
    dispatch(setSelectedInspectorType(title))
    dispatch(setSelectedInspector(row))
    dispatch(setModalInspectOpen(true));
  };
  const isValidStatus = (status: any) => {
    const validStatuses = [2, -1, 1];
    return validStatuses.includes(status);
  };

  const handleSave = async () => {
    const obj = {
      inspectorENumber: selectedInspector?.inspector_enumber,
      reportId: selectedInspector.reportId,
      venueId: selectedInspector.venue_id,
      venueName: selectedInspector.venue_name,
    };

    const payload = {
      ...obj,
      devices,
    };

    // Check status field validation
    const invalidStatusDevice = devices.find(device => !isValidStatus(device.status));

    if (invalidStatusDevice) {
      setOpen(true);
      dispatch(setDeviceStatus({
        open: true,
        message: "Please select a status!",
        severity: "error",
      }));
      return;
    }

    // Check notes field validation based on status
    const deviceWithEmptyNotes = devices.find(device => (device.status === -1 || device.status === 2) && !device.notes);
    if (deviceWithEmptyNotes) {
      setOpen(true);
      dispatch(setDeviceStatus({
        open: true,
        message: "Notes cannot be empty for devices with 'Failed' or 'Questionable' status!",
        severity: "error",
      }));
      return;
    }
    const deviceWithInvalidReason = devices.find(device => (device.status === -1 || device.status === 2) && device.reason === "Not Applicable");

    if (deviceWithInvalidReason) {
      setOpen(true);
      dispatch(setDeviceStatus({
        open: true,
        message: "Reason cannot be 'Not Applicable' for devices with 'Failed' or 'Questionable' status!",
        severity: "error",
      }));
      return;
    }
    try {
      dispatch(setSaveReportStatus(true));
      const res = await insertOrUpdateReport(payload);
      dispatch(setDeviceStatus({
        open: true,
        message: `${res.message}!`,
        severity: "success",
      }));
      dispatch(setSaveReportStatus(false));
      setTimeout(() => {
        dispatch(setModalInspectOpen(false));
        dispatch(setDeviceStatus({
          open: false,
          message: "",
          severity: "",
        }));
        const initialPayload = {
          FromDate: selectedDateRange[0] ? format(selectedDateRange[0], 'yyyy/MM/dd') : null,
          ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'yyyy/MM/dd') : null,
          ReportStatus: inspectionForm.reportStatus,
          InspectorNumber: inspectionForm.inspector.toString() ??"All",
          VenueId: inspectionForm.venue.toString() ?? "All",
          Is_it: "1",
          EmployeeNumber: "0004236",
          AdminLevel: "1"
        }
        dispatch(getInspections(initialPayload))
      }, 2000);
    } catch (error: any) {
      dispatch(setSaveReportStatus(false));
      dispatch(setDeviceStatus({
        open: true,
        message: `${error.message}!`,
        severity: "error",
      }));
    }
  };




  const inspectionsTableHeaders: Header[] = [
    {
      id: 'status',
      label: 'Status',
      width: "100px",
      customRender: (value: any, row: any): JSX.Element => {
        const extractedTitle = row.title.match(/title="([^"]+)"/);
        const tooltipTitle = extractedTitle ? extractedTitle[1] : '';

        return (
          <span>
            {row.status === 'To be inspected within 3 days.' ? (
              <Tooltip title={row.title === "Has been inspected." ? row.title : tooltipTitle}>
                <ErrorIcon sx={{ color: "yellow" }} />
              </Tooltip>
            ) : row.status === 'To be inspected within the present week.' ? (
              <Tooltip title={row.title === "Has been inspected." ? row.title : tooltipTitle}>
                <ErrorIcon color='success' />
              </Tooltip>
            ) : row.status === 'To be inspected within 2 days.' ? (
              <Tooltip title={row.title === "Has been inspected." ? row.title : tooltipTitle}>
                <ErrorIcon color='warning' />
              </Tooltip>
            ) : row.status === 'Today is the last day to be inspected.' ? (
              <Tooltip title={row.title === "Has been inspected." ? row.title : tooltipTitle}>
                <ErrorIcon color='error' />
              </Tooltip>
            ) : row.status === 'Was not inspected.' ? (
              <Tooltip title={row.title === "Has been inspected." ? row.title : tooltipTitle}>
                <CloseRoundedIcon color='error' />
              </Tooltip>
            ) : row.status === 'Has been inspected.' ? (
              <Tooltip title={row.title === "Has been inspected." ? row.title : tooltipTitle}>
                <DoneOutlineIcon color='success' />
              </Tooltip>
            ) : null}
          </span>
        )
      }
    },



    { id: 'reportId', label: 'Report Id', width: "100px", },
    { id: 'weekNumber', label: 'Week', width: "100px",},
    {
      id: 'reportDateTime', label: 'Report Date',width: "100px",
    },
    { id: 'venue_name', label: 'Venue', width: "100px", },
    {
      id: 'inspector Employee',
      label: 'Inspector Employee', width: "100px",
      customRender: (value: any, row: any): JSX.Element => {
        const name = `${row.inpsectorLastName} ${row.inpsectorFirstName}`;

        return (
          name.trim() !== '' ? (
            <span>{name} {row.inspector_enumber}</span>
          ) : (
            <span style={{ color: "#F00" }}>
              {row.venue_name !== "SPARE DEVICES" &&
                row.venue_name !== "ARCHIVED DEVICES" &&
                row.venue_name !== "IT STORAGE" &&
                (row.inspector_enumber === 0)
                ? "No Main Inspector assigned"
                : ""}
            </span>
          )
        );
      }

    },
    { id: 'totalDevices', label: 'Total Devices',width: "100px",  },
    { id: 'questionable', label: 'Total Questionable Devices',width: "100px", },
    { id: 'failed', label: 'Total Failed Devices',width: "100px",},
    {
      id: 'inspect',
      label: 'Inspect',
      width: "100px",
   
      customRender: (value: any, row: any): JSX.Element => {
        // console.log("row", row);
        let title = "View";

        if (row.reportId === 0) {
          title = "Inspect";
        } else if (row.questionable !== 0 || row.failed !== 0) {
          title = "Edit";

          if (row.dateDifference && row.dateDifference <= 0) {
            title = "View";
          }
        }

        return (
          <Button size="small" variant="outlined" onClick={() => handleInspectClick(row, title)}>
            {title}
          </Button>
        );
      }
    }
  ];

  let isDisabled = true
  if (selectedInspector.reportId === 0) {
    isDisabled = false
  } else if (selectedInspector.questionable !== 0 || selectedInspector.failed !== 0) {
    isDisabled = false
    if (selectedInspector.dateDifference && selectedInspector.dateDifference <= 0) {
      isDisabled = true
    }
  }
  return (<>

    <Typography
      variant='caption'
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      sx={{ marginLeft: "2px", fontSize: "0.8rem",fontWeight:"600" }}
    >
      NOTES: <FormatListBulletedRoundedIcon color='primary' sx={{ width: "15px", height: '15px', position: 'relative', top: "4px" }} />
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
          isDisabled={selectedInspector.totalDevices === 0 || isDisabled}
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

