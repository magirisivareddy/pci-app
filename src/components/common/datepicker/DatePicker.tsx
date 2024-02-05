import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "./customDatePicker.module.css";

type DateRange = [Date | null, Date | null];

// Add default props as parameters with default values
const RangeDatePicker: React.FC<{defaultDateRange?: DateRange}> = ({defaultDateRange = [null, null]}) => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [startDate, endDate] = dateRange;

  const handleSelect = (dates: DateRange, event: React.SyntheticEvent<any> | undefined) => {
    setDateRange(dates);
  };

  return (
    <div className={styles["date-picker-container"]}>
      <label htmlFor="date-range">Date From - To</label>
      <DatePicker
      
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleSelect}
        isClearable={true}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date range"
        id="date-range"
        className={styles["custom-date-picker"]}
        popperClassName={styles["custom-datepicker-popper"]}
      />
    </div>
  );
};

export default RangeDatePicker;