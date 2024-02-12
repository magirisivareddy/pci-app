import React, { useState } from 'react';
import { FormControl, MenuItem, Select, InputLabel, SelectChangeEvent } from '@mui/material';

interface SelectInputProps {
    label: string;
    name: string;
    id: string;
    options: string[];
    onChange?: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options, name, onChange, id }) => {
    const [selectedOption, setSelectedOption] = useState<string>('All');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedOption(event.target.value);

        if (onChange) {
            onChange(event.target.value);
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
                            borderColor: 'none', // Add your desired additional hover color here
                        },
                    }}
                >
                    <MenuItem value="All">
                        All
                    </MenuItem>
                    {options.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectInput;
