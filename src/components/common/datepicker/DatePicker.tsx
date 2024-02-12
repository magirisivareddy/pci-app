import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "./customDatePicker.module.css";
import { IconButton, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type DateRange = [Date | null, Date | null];

const RangeDatePicker: React.FC<{ defaultDateRange?: DateRange }> = ({ defaultDateRange = [null, null] }) => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [startDate, endDate] = dateRange;
  const handleSelect = (dates: DateRange, event: React.SyntheticEvent<any> | undefined) => {
    setDateRange(dates);
  };

  const handlePreviousWeek = () => {
    const currentDate = startDate || new Date();
    const newStartDate = new Date(currentDate);
    const newEndDate = new Date(currentDate);

    newStartDate.setDate(currentDate.getDate() - 7);
    newEndDate.setDate(currentDate.getDate() - 1);

    setDateRange([newStartDate, newEndDate]);
  };

  const handleNextWeek = () => {
    const currentDate = endDate || new Date();
    const newStartDate = new Date(currentDate);
    const newEndDate = new Date(currentDate);

    newStartDate.setDate(currentDate.getDate() + 1);
    newEndDate.setDate(currentDate.getDate() + 7);

    setDateRange([newStartDate, newEndDate]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.previousWeek}>
        <Tooltip color='primary' title="Previous Week">
          <IconButton onClick={handlePreviousWeek} aria-label="Previous Week">
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className={styles["date-picker-container"]}>
        <label htmlFor="date-range">Date From - To</label>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          name={"dateRangevalues"}
          onChange={handleSelect}
          isClearable={true}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select a date range"
          id="date-range"
          className={styles["custom-date-picker"]}
          popperClassName={styles["custom-datepicker-popper"]}
        />
      </div>
      <div className={styles.nextWeek}>
        <Tooltip color='primary' title="Next Week">
          <IconButton onClick={handleNextWeek} aria-label="Next Week">
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
};

export default RangeDatePicker;
