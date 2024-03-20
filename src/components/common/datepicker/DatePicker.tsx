import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./customDatePicker.css";
import { IconButton, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getDefaultWeekRange } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSelectedDateRange } from '@/redux/features/InspectionsSlice';

type DateRange = [Date | null, Date | null];

interface RangeDatePickerProps {
  defaultDateRange?: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({ defaultDateRange, onDateRangeChange }) => {
  const dispatch = useAppDispatch()
  const { selectedDateRange } = useAppSelector(state => state.Inspections?.inspectionFilterData)
  // const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange || getDefaultWeekRange());
  const [startDate, endDate] = selectedDateRange;

  useEffect(() => {
    // Call the callback when dateRange changes
    onDateRangeChange(selectedDateRange);
  }, [selectedDateRange, onDateRangeChange]);
  useEffect(() => {
    const defaultWeekRange = getDefaultWeekRange();
    return () => {
      dispatch(setSelectedDateRange(defaultWeekRange));
    };
  }, []);
  const handleSelect = (dates: DateRange, event: React.SyntheticEvent<any> | undefined) => {
    dispatch(setSelectedDateRange(dates));
    // setDateRange(dates);
  };
  const handlePreviousWeek = () => {
    const newEndDate = new Date(startDate || new Date());
    const newStartDate = new Date(newEndDate);

    // Calculate the days to Monday and Sunday
    const daysToMonday = (newStartDate.getDay() + 7) % 7; // Calculate days from current day to Monday
    const daysToSunday = (newEndDate.getDay() + 7) % 6; // Calculate days from current day to Sunday

    // Calculate the start and end dates for the previous week
    newStartDate.setDate(newStartDate.getDate() - daysToMonday - 6); // Set to Monday of the previous week
    newEndDate.setDate(newEndDate.getDate() - daysToSunday); // Set to Sunday of the previous week
    // setDateRange([newStartDate, newEndDate]);
    dispatch(setSelectedDateRange([newStartDate, newEndDate]));
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(endDate || new Date());
    const newEndDate = new Date(newStartDate);

    const daysToAdd = (8 - newStartDate.getDay()) % 7; // Calculate days to the next Monday
    newStartDate.setDate(newStartDate.getDate() + daysToAdd); // Set to Monday of the next week

    // Check if the end date needs to be in the next month
    if (newStartDate.getMonth() !== newEndDate.getMonth()) {
      newEndDate.setMonth(newStartDate.getMonth());
    }

    newEndDate.setDate(newStartDate.getDate() + 5); // Set to Saturday of the next week

    // setDateRange([newStartDate, newEndDate]);
    dispatch(setSelectedDateRange([newStartDate, newEndDate]));
  };



  return (
    <div className={"container"}>
      <div className={"previousWeek"}>
        <Tooltip color='primary' title="Previous Week">
          <IconButton onClick={handlePreviousWeek} aria-label="Previous Week">
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className={"date-picker-container"}>
        <label htmlFor="date-range">Date From - To</label>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          name={"dateRangevalues"}
          onChange={handleSelect}
          // isClearable={true}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date range"
          id="date-range"
          className={"custom-date-picker"}
          popperClassName={"custom-datepicker-popper"}
        />
      </div>
      <div className={"nextWeek"}>
        <Tooltip color='primary' title="Next Week">
          <IconButton onClick={handleNextWeek} aria-label="Next Week">
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default RangeDatePicker;

// Function to get the default date range for the current week

