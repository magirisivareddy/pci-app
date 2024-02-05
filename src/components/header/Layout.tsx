"use client"

import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header1';
import Sidebar from './Sidebar';

export default function Layout({ children }: any) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [open, setOpen] = useState(isDesktop);
    useEffect(() => {
        setOpen(isDesktop);
    }, [isDesktop]);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: isDesktop ? 'flex' : 'block' }}>
            <CssBaseline />
            <Header onMenuClick={handleDrawerToggle} open={open} />
            <Sidebar open={open} variant={isDesktop ? 'permanent' : 'temporary'} onClose={handleDrawerToggle} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${isDesktop ? (open ? 240 : 73) : 0}px)` },
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
