"use client"

import React from 'react'


import { Box, useMediaQuery, useTheme } from '@mui/material';
import { tokens } from '@/theme/theme';
import { useAppSelector } from '@/redux/hooks';
import SideBarTabs from './SideBar';

const PciSideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSideBar = useAppSelector((state) => state.header.value.isSideBar)
    return (
        <Box
            className="sidebar"
            sx={{
                display: 'flex', height: '100vh',
            }}
        >
            {!isSideBar ? <SideBarTabs /> : <div />}

        </Box>
    )
}

export default PciSideBar