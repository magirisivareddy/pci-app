"use client"
import React, { useEffect, useState } from 'react'
import RangeDatePicker from '@/components/common/datepicker/DatePicker';
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';

import SelectInput from '@/components/common/input/SelectInput';
import { fetchInspections } from '@/actions/api';
import InspectionsTable from '../InspectionsTable';
import { format } from 'date-fns';
// Function to get the default date range for the current week

type DateRange = [Date | null, Date | null];

interface FormData {
  venue: string;
  inspector: string;
  reportStatus: string;
}
function getDefaultWeekRange(): DateRange {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay();
  const diff = (dayOfWeek + 6) % 7; // Calculate the difference from Sunday to Monday

  startOfWeek.setDate(currentDate.getDate() - diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 5); // Set to Saturday of the current week

  return [startOfWeek, endOfWeek];
}


const InspectionsFilters = ({ venueDropdown, inspectorsDropdown }: any) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [inspections, setInspectionsData] = useState([])
  const [isLoading, setLoading] = useState(true)

  const [formData, setFormData] = useState<FormData>({
    venue: 'All',
    inspector: 'All',
    reportStatus: 'to be inspected',
  });
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>(getDefaultWeekRange);
  const fetchDataAndSetDate = async () => {

    const obj = {
      //  FromDate : selectedDateRange[0] ? format(selectedDateRange[0], 'dd/MM/yyyy') : null,
      //  ToDate: selectedDateRange[1] ? format(selectedDateRange[1], 'dd/MM/yyyy') : null,
      FromDate: selectedDateRange[0],
      ToDate: selectedDateRange[1],
      InspectorNumber: formData.inspector,
      ReportStatus: formData.reportStatus,
      VenueId: formData.venue,
      Is_it: "1",
      EmployeeNumber: "789",
      AdminLevel: "1"
    }
    try {
      setLoading(true);
      const inspections = await fetchInspections(obj);
      setInspectionsData(inspections);
      // setDate({ inspections, venue, devices });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataAndSetDate();
  }, []);

  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    setSelectedDateRange(dateRange);
  };
  const onChange = (value: any, name: any) => {

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handelSubmit = async (event: any) => {
    const obj = {
      FromDate: selectedDateRange[0],
      ToDate: selectedDateRange[1],
      InspectorNumber: formData.inspector.toString(),
      ReportStatus: formData.reportStatus,
      VenueId: formData.venue.toString(),
      Is_it: "Yes",
      EmployeeNumber: "789",
      AdminLevel: "Admin"
    }

    try {
      setLoading(true);
      const inspections = await fetchInspections(obj);
      setInspectionsData(inspections);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }

  }

  return (<>

    <Grid container spacing={2} mb={2} pr={1}>
      <Grid item xs={12} md={4} >
        <RangeDatePicker
          defaultDateRange={selectedDateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </Grid>
      <Grid item xs={12} md={2.3}>
        <SelectInput
          selectedOption={formData.venue}
          onChange={onChange}
          label={'Venue'}
          options={venueDropdown}
          name={'venue'}
          id={'venue'}
        />
      </Grid>
      <Grid item xs={12} md={2.3}>
        <SelectInput
          selectedOption={formData.inspector}
          onChange={onChange}
          label={'Inspector'}
          options={inspectorsDropdown}
          name={'inspector'}
          id={'inspector'} />
      </Grid>
      <Grid item xs={12} md={2.3}>
        <SelectInput
          selectedOption={formData.reportStatus}
          onChange={onChange}
          label={'Report Status'}
          options={[
            { label: "Inspected", value: "inspected" },
            { label: "Missed Inspection", value: "missed" },
            { label: "Inspected: Not Resolved", value: "unresolved" },
            { label: "To Be Inspected", value: "to be inspected" }
          ]}
          name={'reportStatus'}
          id={'reportStatus'}
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
      </Grid>
    </Grid>
    <InspectionsTable data={inspections} isLoading={isLoading} />
  </>


  )
}

export default InspectionsFilters