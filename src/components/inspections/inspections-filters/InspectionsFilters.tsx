
import React, { useEffect } from 'react'
import RangeDatePicker from '@/components/common/datepicker/DatePicker';
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setInspectionFilterFormData, setIntialFilterFormData, setSelectedDateRange } from '@/redux/features/InspectionsSlice';
import { getDefaultWeekRange } from '@/utils/helpers';

interface InspectionsFiltersProps {
  handelSubmit: () => void;
}

const InspectionsFilters: React.FC<InspectionsFiltersProps> = ({
  handelSubmit,
}) => {
  const dispatch = useAppDispatch()
  const { inspectionForm, selectedDateRange } = useAppSelector(state => state.Inspections?.inspectionFilterData)
  const { venueDropdown, inspectorDropdown } = useAppSelector(state => state.common)
  useEffect(() => {
    dispatch(setIntialFilterFormData({
      venue: 'All',
      inspector: 'All',
      reportStatus: 'to be inspected',
    }))
    const date = getDefaultWeekRange()
    dispatch(setSelectedDateRange(date))

  }, []);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const onChange = (value: any, name: any) => {
    dispatch(setInspectionFilterFormData({ name: name, value: value }))
  }
  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    dispatch(setSelectedDateRange(dateRange));
  };
  const handleClear = () => {
    dispatch(setIntialFilterFormData({
      venue: 'All',
      inspector: 'All',
      reportStatus: 'to be inspected',
    }))
    const date = getDefaultWeekRange()
    dispatch(setSelectedDateRange(date))

  }
  const updatedVenueDropdown = [{ label: "All", value: "All" }, ...venueDropdown];
  const updatedInspectorsDropdown = [{ label: "All", value: "All" }, ...inspectorDropdown];
  return (<>
    <Grid container spacing={2} mb={2} pr={1}>
      <Grid item xs={12} md={3.6} >
        <RangeDatePicker
          defaultDateRange={selectedDateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </Grid>
      <Grid item xs={12} md={2}>
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
      <Grid item xs={12} md={2}>
        <SelectInput
          selectedOption={inspectionForm.inspector}
          onChange={onChange}
          label={'Inspector'}
          options={updatedInspectorsDropdown}
          name={'inspector'}
          id={'inspector'}
          size={'small'} />
      </Grid>
      <Grid item xs={12} md={2}>
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
      <Grid item xs={12} md={2.2} gap={2}>
        <Button onClick={handleClear} sx={{ marginTop: "22px", marginRight: "3px", width: isDesktop ? "auto" : "100%", padding: "6px 16px " }} variant='outlined'>clear</Button>
        <Button onClick={handelSubmit} sx={{ marginTop: "22px", width: isDesktop ? "auto" : "100%" }} variant='contained'>Search</Button>
      </Grid>
    </Grid>
  </>


  )
}

export default InspectionsFilters