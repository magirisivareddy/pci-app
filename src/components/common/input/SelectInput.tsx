import React, { useState } from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    label: string;
    name: string;
    id: string;
    selectedOption: string;
    options: Option[];
    onChange: (value: string, name: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options, name, selectedOption, onChange, id }) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        if (onChange) {
            onChange(event.target.value, name);
        }
    };

    return (
        <div>
            <FormControl fullWidth>
                <label style={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: "400",
                    fontSize: "0.6428571428571428rem",
                    lineHeight: "1.66",
                    textAlign: "left",
                    marginTop: "3px",
                    marginLeft: "13px"
                }}>{label}</label>
                <Select
                    size='small'
                    name={name}
                    id={id}
                    value={selectedOption}
                    onChange={handleChange}
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
                        '&:hover': {
                            border: '1px solid #008c99',
                            borderColor: 'none',
                        },
                    }}
                >
                    <MenuItem value="All">All</MenuItem>
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectInput;
