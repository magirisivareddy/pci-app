"use client"
import React, { useState } from 'react';

import {
    Collapse,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    IconButton,
    Divider,
    Theme,
} from '@mui/material';
import { usePathname } from "next/navigation";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MailIcon from '@mui/icons-material/Mail';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    open: boolean;
    variant: "permanent" | "persistent" | "temporary";
    onClose: () => void;
}



const drawerWidth = 240;
const miniDrawerWidth = 73;

const Sidebar: React.FC<SidebarProps> = ({ open, variant, onClose }) => {
    const theme: Theme = useTheme();
    const path = usePathname()
    const router = useRouter(); // Use the useRouter hook
    const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

    const iconColor = "#008c99";
    const hoverBackgroundColor = "#f1fafb";
    const activeBackgroundColor = "#9ddbe0";
    const handleSubMenuClick = (index: string, item: MenuItem) => {
        // Copy the current state to a new object to modify.
        const newOpenSubMenusState = { ...openSubMenus };

        // Determine if the current menu item is being opened or closed.
        const isCurrentlyOpen = !!newOpenSubMenusState[index];

        // Close all submenus except the current one's ancestors.
        Object.keys(newOpenSubMenusState).forEach(key => {
            // Keep ancestor menus open by checking if the current index starts with the key (indicating the key is an ancestor).
            if (!index.startsWith(key)) {
                newOpenSubMenusState[key] = false;
            }
        });

        // Toggle the current menu's state based on its previous state.
        newOpenSubMenusState[index] = !isCurrentlyOpen;

        // Update the state to reflect these changes.
        setOpenSubMenus(newOpenSubMenusState);

        // Navigate if the item has a path and it's either being opened or has no children.
        // This prevents navigation from occurring on the closing of a menu or if the intent is to just open a submenu.
        if (item.path && (!item.children || !isCurrentlyOpen)) {
            handleNavigation(item.path);
        }
    };


    const handleNavigation = (path?: string) => {
        if (path) router.push(path);
    };

    interface MenuItem {
        text: string;
        icon: React.ReactNode;
        path?: string;
        children?: MenuItem[];
    }

    const menuItems: MenuItem[] = [
        { text: 'Inspections', icon: <ManageSearchOutlinedIcon />, path: '/' },
        { text: 'Venues', icon: <PinDropOutlinedIcon />, path: '/venues' },
        { text: 'Devices', icon: <DeviceHubOutlinedIcon />, path: '/devices' },
        { text: 'Group Inspectors', icon: <Diversity1OutlinedIcon />, path: '/groupinspectors' },
        { text: 'Information', icon: <InfoOutlinedIcon />, path: '/information' },
        { text: 'Inspector Admin', icon: <PersonAddAltOutlinedIcon />, path: '/inspector-admin' },
        {
            text: 'Report', icon: <AssessmentOutlinedIcon />, children: [
                { text: 'Venue Status Report', icon: <StarBorder />, path: '/report/venue-status-report' },
                { text: 'Venue Summary', icon: <StarBorder />, path: '/report/venue-summary' },
                { text: 'Failed Devices Report', icon: <StarBorder />, path: '/report/failed-devices-report' },
                { text: 'Venue Personnel', icon: <StarBorder />, path: '/report/venue-personnel' },
                { text: 'Log Report', icon: <StarBorder />, path: '/report/log-report' },
                // { text: 'Device Log Report', icon: <StarBorder />, path: '/report/device-log-report' }
            ]
        },
        // {
        //     text: 'Admins',
        //     icon: <PersonAddAltOutlinedIcon />,
        //     path: '/admins',
        //     children: [
        //         {
        //             text: 'Submenu 1',
        //             icon: <StarBorder />,
        //             path: '/admins/submenu1',
        //             children: [
        //                 { text: 'Sub-child 1', icon: <StarBorder />, path: '/admins/submenu1/subchild1' },
        //                 { text: 'Sub-child 2', icon: <StarBorder />, path: '/admins/submenu1/subchild2' },
        //             ],
        //         },
        //         { text: 'Submenu 2', icon: <StarBorder />, path: '/admins/submenu2' },
        //     ],
        // },


    ];
    ;

    const renderMenuItems = (items: MenuItem[], level = 0, parentIndex = ''): React.ReactNode => {
        return items.map((item, index) => {
            const currentIndex = `${parentIndex}${index}`;
            const childrenExist = item.children && item.children.length > 0;

            return (
                <React.Fragment key={currentIndex}>
                    <ListItem
                        button
                        onClick={() => handleSubMenuClick(currentIndex, item)}
                        sx={{
                            pl: theme.spacing(level * 2),
                            '&:hover': {
                                backgroundColor: path === item.path ? activeBackgroundColor : hoverBackgroundColor,
                            },
                            backgroundColor: path === item.path ? activeBackgroundColor : "inherit",
                            color: path === item.path ? "#fff" : "inherit"
                        }}
                    >
                        <ListItemIcon sx={{ color: iconColor, paddingLeft: !open ? "5px" : "16px", }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ display: open ? 'block' : 'none' }} />
                        {childrenExist ? (openSubMenus[currentIndex] ? <ExpandLess sx={{ color: iconColor }} /> : <ExpandMore sx={{ color: iconColor }} />) : null}
                    </ListItem>
                    {childrenExist && (
                        <Collapse in={openSubMenus[currentIndex]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {renderMenuItems(item.children!, level + 1, `${currentIndex}-`)}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            );
        });
    };

    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            sx={{
                width: open ? drawerWidth : miniDrawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : miniDrawerWidth,
                    boxSizing: 'border-box',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            }}
        >
            <Toolbar>
                <IconButton onClick={onClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {renderMenuItems(menuItems)}
            </List>
        </Drawer>
    );
};

export default Sidebar;
