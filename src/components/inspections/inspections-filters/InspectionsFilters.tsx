"use client"
import React from 'react'
import RangeDatePicker from '@/components/common/datepicker/DatePicker';
import styles from "./Inspections-filters.module.css"
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, useTheme } from '@mui/material';

const InspectionsFilters = () => {
  const theme = useTheme();
  return (<>
    <div className={styles["search-form"]}>
      {/* <div className={styles['form-item']}>
        <RangeDatePicker />
      </div> */}
      <div className={styles['form-item']} style={{ minWidth: "220px" }}>
        <FormControl sx={{ width: "100%" }} >
          <FormHelperText  >Change week</FormHelperText>
          <Stack direction="row" spacing={2}>
            <Button sx={{ padding: "8px 15px" }} size='medium' variant="outlined">Previous Week</Button>
            <Button sx={{ padding: "8px 15px" }} size='medium' variant="outlined">Next Week</Button>
          </Stack>
        </FormControl>

      </div>
      <div className={styles['form-item']}>
        <FormControl sx={{ width: "100%" }} >
          <FormHelperText>Venue</FormHelperText>
          <Select
            value={""}
            size='small'
            // onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              border: '1px solid #008c99',
              '&.Mui-focused': {
                borderColor: '#008c99',
              },
              color: 'rgb(0, 140, 153)',
              borderRadius: '4px',
            }}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

      </div>
      <div className={styles['form-item']} >
        <FormControl sx={{ width: "100%" }}  >
          <FormHelperText>Inspector</FormHelperText>
          <Select
            value={""}
            size='small'
            className={styles.selectCustom}
            // onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              border: '1px solid #008c99',
              '&.Mui-focused': {
                borderColor: '#008c99',
              },
              color: 'rgb(0, 140, 153)',
              borderRadius: '4px',
            }}
          >
            <MenuItem value="">
              All
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

        </FormControl>
      </div>
      <div className={styles['form-item']}>
        <FormControl sx={{ width: "100%" }} >
          <FormHelperText>Report Status</FormHelperText>
          <Select
            value={""}
            size='small'
            className={styles.selectCustom}
            // onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              border: '1px solid #008c99',
              '&.Mui-focused': {
                borderColor: '#008c99',
              },
              color: 'rgb(0, 140, 153)',
              borderRadius: '4px',
            }}
          >
            <MenuItem value="">
              All
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

        </FormControl>
      </div>
      <div className={styles['form-item']}

      >
        <Button variant="outlined" className={styles.btn} >Search</Button>
      </div>
    </div>
  </>


  )
}

export default InspectionsFilters