"use client"

import React, { Fragment } from 'react'
import Link from 'next/link';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { tokens } from '@/theme/theme';

const PciSideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const tabRoutes = [
        { name: "Inspections", path: "/" },
        { name: "Venues", path: "/venues" },
        { name: "Admins", path: "/admins" },
        { name: "Group Inspectors", path: "/groupinspectors" },
        { name: "Devices", path: "/devices" },
    ];
    const clicktest = (e) => {
        console.log("e", e)
    }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (

        <Box className='test'
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
            
        >
            <Sidebar breakPoint={!isMobile ? "sm":""}>
                <Menu>
                    <Menu>
                        <SubMenu
                            defaultOpen
                            label="Inspections"
                            component={<Link href={'/'} />}
                            // rootStyles={{
                            //     ['& > .' + menuClasses.button]: {
                            //         backgroundColor: '#eaabff',
                            //         color: '#9f0099',
                            //         '&:hover': {
                            //             backgroundColor: '#eecef9',
                            //         },
                            //     },
                            //     ['.' + menuClasses.subMenuContent]: {
                            //         backgroundColor: '#fbedff',
                            //     },
                            // }}
                        >
                            <MenuItem> Pie charts</MenuItem>
                            <MenuItem> Line charts</MenuItem>
                            <MenuItem> Bar charts</MenuItem>
                        </SubMenu>
                        <SubMenu label="Venues"  component={<Link href={'/venues'} />}>
                        <MenuItem component={<Link href={'/addvenue'} />}> Add Venue</MenuItem>
                    
                        </SubMenu>
                        <SubMenu label="Theme" onOpenChange={clicktest}>
                            <MenuItem > Dark</MenuItem>
                            <MenuItem> Light</MenuItem>
                        </SubMenu>
                    </Menu>
                </Menu>
            </Sidebar>
        </Box>
 
    )
}

export default PciSideBar