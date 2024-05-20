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
    selectedOption: any;
    options: Option[];
    size: "small" | "medium";
    onChange: (value: string, name: string) => void;
    isRequired?: boolean;
    disabled?: boolean
}


const SelectInput: React.FC<SelectInputProps> = ({ label, options, name, selectedOption, size = "small", onChange, id, isRequired = false, disabled = false }) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        if (onChange) {
            onChange(event.target.value, name);
        }
    };

    return (
        <div>
            <FormControl fullWidth>
                <label style={{
                    color: "rgba(0, 0, 0, 0.8)",
                    fontWeight: "600",
                    fontSize: "0.6428571428571428rem",
                    lineHeight: "1.66",
                    textAlign: "left",
                    marginTop: "3px",
                    marginLeft: "13px"
                }}>
                    {label} {isRequired && <span style={{ color: "#9c4040" }}>*</span>}
                </label>
                <Select
                    size={size}
                    name={name}
                    id={id}
                    value={selectedOption}
                    disabled={disabled}
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
                        '&.MuiSelect-outlined': {
                            padding: "4px 14px"
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
