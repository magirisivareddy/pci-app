"use client"
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

// import { inspectionsTableHeaders } from '@/utils/table-heders';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Popover from '@mui/material/Popover';

import { Box, Button, Tooltip, Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';
import { format } from 'date-fns';
import { getInspections, setDeviceStatus, setInitialValues, setSaveReportStatus, setSelectedInspector, setSelectedInspectorType } from '@/redux/features/InspectionsSlice';
import { setModalInspectOpen } from '@/redux/features/ModalSlice';
// import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import Modal from '@/components/common/modal/Modal';
import Inspector from '../inspector/Inspector';
import InspectionNotes from '../inspection-notes/InspectionNotes';
import CustomTable from '@/components/common/table/Table';
import HelpdeskTicketForm from '../helpdesk-ticket/HelpdeskTicketForm';
import { insertOrUpdateReport } from '@/actions/api';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Loading from '@/app/loading';
import CustomModal from '../confirmation-pop-up/ConfirmationPopUp';


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
const InspectionsTable = () => {
  const dispatch = useAppDispatch();
  const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
  const isInspect = useAppSelector(state => state.modal.value.isInspectModalOpen)
  const { inspectionsList, status } = useAppSelector(state => state.Inspections)

  const { devices, selectedInspector, saveReportStatus, deviceStatus, inspectionFilterData, selectedInspectorType } = useAppSelector(state => state.Inspections)
  const inspectionForm = inspectionFilterData.inspectionForm
  const selectedDateRange = inspectionFilterData.selectedDateRange
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const [isHelpDeskModal, setHelpDeskModal] = useState(false)
  const [open, setOpen] = useState(false);
  const [isSaturday, setIsSaturday] = useState(false)
  const roles = employeeInfo?.role?.split(",").map((role: string) => role?.trim());
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleModalClose = () => {
    setHelpDeskModal(false)
    setIsSaturday(false)
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
  const checkDateInRange = () => {
    const date = new Date();
    const startDate = selectedDateRange[0];
    const endDate = selectedDateRange[1];
    // Check if selectedDateRange is defined and contains valid dates
    if (startDate && endDate) {
      try {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return date >= startDateObj && date <= endDateObj;
      } catch (error) {
        console.error("Error parsing dates:", error);
        return false;
      }
    } else {
      console.error("Invalid selectedDateRange:", selectedDateRange);
      return false;
    }
  }
  // const checkDateInRange = () => {
  //   const currentDate = new Date();
  //   const startDate = selectedDateRange[0];

  //   // Check if selectedDateRange is defined and contains a valid start date
  //   if (startDate) {
  //     try {
  //       const startOfWeek = new Date(startDate);
  //       startOfWeek.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

  //       // Check if the start date of the week is not in the future
  //       return startOfWeek <= currentDate;
  //     } catch (error) {
  //       console.error("Error parsing date:", error);
  //       return false;
  //     }
  //   } else {
  //     console.error("Invalid selectedDateRange:", selectedDateRange);
  //     return false;
  //   }
  // }





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

  const submitReport = async () => {
    setIsSaturday(false)
    const obj = {
      inspectorENumber: employeeInfo?.employeeNumber,
      reportId: selectedInspector.reportId,
      venueId: selectedInspector.venue_id,
      venueName: selectedInspector.venue_name,
    };

    const payload = {
      ...obj,
      devices,
    };
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
          InspectorNumber: roles?.includes("Admin") || roles?.includes("Audit") ? "All" : employeeInfo?.employeeNumber?.toString(),
          VenueId: inspectionForm.venue.toString() ?? "All",
          Is_it: employeeInfo?.role === "IT" ? "1" : "0",
          EmployeeNumber: employeeInfo?.employeeNumber,
          AdminLevel: "1"
        }
        dispatch(getInspections(initialPayload))
      }, 3000);
    } catch (error: any) {
      dispatch(setSaveReportStatus(false));
      dispatch(setDeviceStatus({
        open: true,
        message: `${error.message}!`,
        severity: "error",
      }));
    }

  }

  const handleSave = async () => {
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

    // const deviceWithInvalidReason = devices.find(device => (device.status === -1 || device.status === 2) && device.reason === "Not Applicable");
    const deviceWithInvalidReason = devices.find(device => (
      (device.status === -1 || device.status === 2) &&
      (device.reason === "Not Applicable" || device.reason === null || device.reason === "")
    ));

    if (deviceWithInvalidReason) {
      setOpen(true);
      dispatch(setDeviceStatus({
        open: true,
        message: "Reason cannot be 'Not Applicable' for devices with 'Failed' or 'Questionable' status!",
        severity: "error",
      }));
      return;
    }
    // Check if current day is Saturday (6 corresponds to Saturday, Sunday is 0)
    if (currentDayOfWeek === 6) {
      setIsSaturday(true)
      return;
    }
    submitReport()
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
    { id: 'weekNumber', label: 'Week', width: "100px", },
    {
      id: 'reportDateTime', label: 'Report Date', width: "100px",
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
    { id: 'totalDevices', label: 'Total Devices', width: "100px", },
    {
      id: 'questionable', label: 'Total Questionable Devices', width: "100px", customRender: (value: any, row: any): JSX.Element => {
        const total_q = row.questionable

        return (
          <span style={{ color: total_q ? "#F00" : "" }}>{row.resolutionQuestionable}/{row.questionable}</span>
        )
      }
    },
    {
      id: 'failed', label: 'Total Failed Devices', width: "100px", customRender: (value: any, row: any): JSX.Element => {
        const total_f = row.failed
        return (
          <span style={{ color: total_f ? "#F00" : "" }}>{row.resolutionFailed}/{row.failed}</span>
        )
      }
    },
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
          title = "View";

          if (row.dateDifference && row.dateDifference <= 0) {
            title = "View";
          }
        }

        // const isDisabled = title === "Inspect" && !checkDateInRange();
        const isDisabled = (
          (title === "Inspect" && !checkDateInRange()) ||
          (row.venue_name !== "SPARE DEVICES" &&
            row.venue_name !== "ARCHIVED DEVICES" &&
            row.venue_name !== "IT STORAGE" &&
            (row.inspector_enumber === 0))
        )
        return (
          <Button size="small"
            variant="outlined"
            disabled={isDisabled}
            onClick={() => handleInspectClick(row, title)}>
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
    isDisabled = true
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
      sx={{ marginLeft: "2px", fontSize: "0.8rem", fontWeight: "600" }}
    >
      NOTES: <InfoOutlinedIcon color='primary' sx={{ width: "17px", height: '17px', position: 'relative', top: "4px" }} />
    </Typography>

    <CustomTable
      data={inspectionsList}
      headers={inspectionsTableHeaders}
      isloading={status === "loading"}
      isRefresh={true}
    />
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
          buttonText={selectedInspectorType === "Edit" ? "Update" : "Submit"}
          isDisabled={selectedInspector.totalDevices === 0 || isDisabled}
          footerLink="Report a Finding / Raise a ticket"
          onFooterLink={onHelpDeskModal}

        />
      </form> : null}
    <CustomModal
      open={isSaturday}
      submitReport={submitReport}
    />
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

