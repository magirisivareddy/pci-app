import { Box, MenuItem, Select } from '@mui/material'
import React from 'react'

const InspectorAdminLevelCell = ({row}:any) => {
  return (
    <Box sx={{ width: "65%", }}>
    <Select
        size='small'
        value={row.level}
        sx={{
            '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
            '&.Mui-focused': {
                border: '1px solid #008c99',
            },
           
            borderRadius: '4px',
            border: '1px solid #ddd',
            color: "rgb(157 148 148)",
            '& .MuiSelect-select, & .MuiOutlinedInput-input': {
                padding: '4px 6px',
              },
            '&:hover': {
                border: '1px solid #008c99',
                borderColor: 'none',
            },
        }}
        //   onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
    >

        <MenuItem value={"1"}>1</MenuItem>
        <MenuItem value={"2"}>2</MenuItem>
        <MenuItem value={"3"}>3</MenuItem>
    </Select>
</Box>
  )
}

export default InspectorAdminLevelCell