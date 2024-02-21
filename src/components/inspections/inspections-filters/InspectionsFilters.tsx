
import React from 'react'
import RangeDatePicker from '@/components/common/datepicker/DatePicker';
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import SelectInput from '@/components/common/input/SelectInput';

interface InspectionsFiltersProps {
  venueDropdown: Array<{ label: string; value: string }>;
  handelSubmit: () => void;
  inspectorsDropdown: Array<{ label: string; value: string }>;
  formData: {
    venue: string;
    inspector: string;
    reportStatus: string;
  };
  handleDateRangeChange: (dateRange: [Date | null, Date | null]) => void;
  onChange: (value: string, name: string) => void;
  selectedDateRange: [Date | null, Date | null];
}

const InspectionsFilters: React.FC<InspectionsFiltersProps> = ({
  venueDropdown,
  handelSubmit,
  inspectorsDropdown,
  formData,
  handleDateRangeChange,
  onChange,
  selectedDateRange,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
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
          size={'small'}
        />
      </Grid>
      <Grid item xs={12} md={2.3}>
        <SelectInput
          selectedOption={formData.inspector}
          onChange={onChange}
          label={'Inspector'}
          options={inspectorsDropdown}
          name={'inspector'}
          id={'inspector'}
          size={'small'} />
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