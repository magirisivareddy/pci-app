import React, { useState, ChangeEvent } from 'react';
import { FormControl, InputBase, InputLabel, alpha, styled } from '@mui/material';

interface TextInputProps {
    label: string;
    name: string;
    defaultValue?: string;
    id: string;
    onChange?: (name: string, value: string) => void;
    isRequired?: boolean;

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

const TextInput: React.FC<TextInputProps> = ({ label, defaultValue = '', name, onChange, id, isRequired = false }) => {

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
                color:"rgba(0, 0, 0, 0.6)",
                fontWeight: "400",
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
                placeholder={`${label}...`}
                onChange={handleInputChange}
                id={id} />
        </FormControl>
    );
};

export default TextInput;
