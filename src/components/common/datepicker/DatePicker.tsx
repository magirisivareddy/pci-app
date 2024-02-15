import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./customDatePicker.css";
import { IconButton, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type DateRange = [Date | null, Date | null];

interface RangeDatePickerProps {
  defaultDateRange?: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({ defaultDateRange, onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange || getDefaultWeekRange());
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    // Call the callback when dateRange changes
    onDateRangeChange(dateRange);
  }, [dateRange, onDateRangeChange]);

  const handleSelect = (dates: DateRange, event: React.SyntheticEvent<any> | undefined) => {
    setDateRange(dates);
  };

  const handlePreviousWeek = () => {
    const newEndDate = new Date(startDate || new Date());
    const newStartDate = new Date(newEndDate);

    newStartDate.setDate(newStartDate.getDate() - (newStartDate.getDay() + 6) % 7); // Set to Monday of the previous week
    newEndDate.setDate(newEndDate.getDate() - (newEndDate.getDay() + 1) % 7); // Set to Sunday of the previous week

    setDateRange([newStartDate, newEndDate]);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(endDate || new Date());
    const newEndDate = new Date(newStartDate);
  
    newStartDate.setDate(newStartDate.getDate() + (8 - newStartDate.getDay()) % 7); // Set to Monday of the next week
    newEndDate.setDate(newStartDate.getDate() + 5); // Set to Saturday of the next week
  
    setDateRange([newStartDate, newEndDate]);
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
          isClearable={true}
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
function getDefaultWeekRange(): DateRange {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to Monday of the current week

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday of the current week

  return [startOfWeek, endOfWeek];
}