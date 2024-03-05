
import React from 'react'
import RangeDatePicker from '@/components/common/datepicker/DatePicker';
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setInspectionFilterFormData, setSelectedDateRange } from '@/redux/features/InspectionsSlice';

interface InspectionsFiltersProps {
  venueDropdown: Array<{ label: string; value: string }>;
  handelSubmit: () => void;
  inspectorsDropdown: Array<{ label: string; value: string }>;
}

const InspectionsFilters: React.FC<InspectionsFiltersProps> = ({
  venueDropdown,
  handelSubmit,
  inspectorsDropdown,
}) => {
  const dispatch = useAppDispatch()
  const { inspectionForm,selectedDateRange } = useAppSelector(state => state.Inspections.inspectionFilterData)
  
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const onChange = (value: any, name: any) => {
    dispatch(setInspectionFilterFormData({ name: name, value: value }))
  }
  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    const serializedDateRange = dateRange.map(date => (date ? date.toISOString() : null));
  
    // Check if the date range has changed before updating the state
    if (JSON.stringify(serializedDateRange) !== JSON.stringify(dateRange)) {
      dispatch(setSelectedDateRange(serializedDateRange));

    }
  };
  const updatedVenueDropdown = [...venueDropdown, { label: "All", value: "All" }];
  const updatedInspectorsDropdown = [...inspectorsDropdown, { label: "All", value: "All" }];
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
          selectedOption={inspectionForm.venue}
          onChange={onChange}
          label={'Venue'}
          options={updatedVenueDropdown}
          name={'venue'}
          id={'venue'}
          size={'small'}
        />
      </Grid>
      <Grid item xs={12} md={2.3}>
        <SelectInput
          selectedOption={inspectionForm.inspector}
          onChange={onChange}
          label={'Inspector'}
          options={updatedInspectorsDropdown}
          name={'inspector'}
          id={'inspector'}
          size={'small'} />
      </Grid>
      <Grid item xs={12} md={2.3}>
        <SelectInput
          selectedOption={inspectionForm.reportStatus}
          onChange={onChange}
          label={'Report Status'}
          options={[
            { label: "Inspected", value: "inspected" },
            { label: "Missed Inspection", value: "missed" },
            { label: "Inspected: Not Resolved", value: "unresolved" },
            { label: "To Be Inspected", value: "to be inspected" }
          ]}
          name={'reportStatus'}
          id={'reportStatus'} size={'small'}
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
      </Grid>
    </Grid>
  </>


  )
}

export default InspectionsFilters