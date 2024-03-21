import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { FormControl, InputBase, InputLabel, alpha, styled } from '@mui/material';

interface TextInputProps {
    label: string;
    name: string;
    defaultValue?: string;
    id: string;
    onChange?: (name: string, value: string) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    disabled?:boolean
    placeholder?:any
    maxLength?:any

}

const BootstrapInput = styled(InputBase)(({ theme }) => ({

    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '',
        fontSize: 12,
        padding: '10px 12px',

        color: 'rgba(0, 0, 0, 0.7)',
        '&:focus': {
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            // borderColor: theme.palette.primary.main,
        },
        '&:hover': {
            border: '1px solid #008c99',
            borderColor: 'none',
        },
    },
}));

const TextInput: React.FC<TextInputProps> = ({ label, defaultValue = '', name, onChange,onBlur, id, isRequired = false, disabled=false,placeholder="",maxLength }) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name
        if (onChange) {
            onChange(value, name);
        }
    };

    return (
        <FormControl fullWidth>
            <label style={{
                color:"rgba(0, 0, 0, 0.8)",
                fontWeight: "600",
                fontSize: " 0.6428571428571428rem",
                lineHeight: "1.66",
                textAlign: "left",
                marginTop: "3px",
                marginLeft: "13px"
            }}>
                {label} {isRequired && <span style={{color:"#9c4040"}}>*</span>}
            </label>
            <BootstrapInput
                fullWidth
                sx={{ width: { xs: '100%', md: 'auto' } }}
                value={defaultValue}
                name={name}
                placeholder={placeholder !== "" ? placeholder : label}
                onChange={handleInputChange}
                onBlur={onBlur}
                id={id} 
                inputProps={maxLength ? { maxLength: maxLength } : undefined}
                disabled={disabled}
                />
        </FormControl>
    );
};

export default TextInput;
