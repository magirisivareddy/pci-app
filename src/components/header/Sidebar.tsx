import React, { useCallback, useEffect, useState } from 'react';
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
    useMediaQuery,
} from '@mui/material';
import { usePathname } from "next/navigation";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

interface SidebarProps {
    open: boolean;
    variant: "permanent" | "persistent" | "temporary";
    onClose: () => void;
}

const drawerWidth = 240;
const miniDrawerWidth = 73;

const Sidebar: React.FC<SidebarProps> = React.memo(({ open, variant, onClose }) => {
    const theme: Theme = useTheme();
    const path = usePathname();
    const router = useRouter();
    const { userInfo } = useAppSelector(state => state.common);
    const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const iconColor = "#008c99";
    const hoverBackgroundColor = "#f1fafb";
    const activeBackgroundColor = "#9ddbe0";

    console.log("userInfo", userInfo);

    useEffect(() => {
        const storedOpenSubMenus = localStorage.getItem('openSubMenus');

        if (storedOpenSubMenus) {
            setOpenSubMenus(JSON.parse(storedOpenSubMenus));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('openSubMenus', JSON.stringify(openSubMenus));
    }, [openSubMenus]);

    const handleSubMenuClick = (index: string, item: MenuItem) => {
        const newOpenSubMenusState = { ...openSubMenus };
        const isCurrentlyOpen = !!newOpenSubMenusState[index];

        Object.keys(newOpenSubMenusState).forEach(key => {
            if (!index.startsWith(key)) {
                newOpenSubMenusState[key] = false;
            }
        });

        newOpenSubMenusState[index] = !isCurrentlyOpen;

        setOpenSubMenus(newOpenSubMenusState);

        if (item.path && (!item.children || !isCurrentlyOpen)) {
            handleNavigation(item.path);
            if (isMobile) {
                onClose();
            }
        }
    };

    const handleNavigation = (path?: string) => {
        if (path) router.push(path);
    };
    const handleEffect = useCallback(() => {
        if (userInfo?.role === "IT") {
            console.log("calll");
            router.push('/venues/');
        }
    }, [userInfo, router]);

    useEffect(handleEffect, [userInfo]);
    interface MenuItem {
        text: string;
        icon: React.ReactNode;
        path?: string;
        children?: MenuItem[];
    }

    let menuItems: MenuItem[] = [];

    if (userInfo?.role === "Admin") {
        menuItems = [
            { text: 'Inspections', icon: <ManageSearchOutlinedIcon />, path: '/' },
      
            { text: 'Venues', icon: <PinDropOutlinedIcon />, path: '/venues/' },
            { text: 'Devices', icon: <DeviceHubOutlinedIcon />, path: '/devices/' },
            { text: 'Group Inspectors', icon: <Diversity1OutlinedIcon />, path: '/groupinspectors/' },
            { text: 'Information', icon: <InfoOutlinedIcon />, path: '/information/' },
            { text: 'Inspector Admin', icon: <PersonAddAltOutlinedIcon />, path: '/inspector-admin/' },
            {
                text: 'Report', icon: <AssessmentOutlinedIcon />, children: [
                    { text: 'Venue Status Report', icon: <StarBorder />, path: '/report/venue-status-report/' },
                    { text: 'Venue Summary', icon: <StarBorder />, path: '/report/venue-summary/' },
                    { text: 'Failed Devices Report', icon: <StarBorder />, path: '/report/failed-devices-report/' },
                    { text: 'Venue Personnel', icon: <StarBorder />, path: '/report/venue-personnel/' },
                    { text: 'Missed Inspection', icon: <StarBorder />, path: '/report/missed-inspection/' },
                ]
            },
        ];
    } else if (userInfo?.role === "Inspector") {
        menuItems.push(
            { text: 'Inspections', icon: <ManageSearchOutlinedIcon />, path: '/' },
            { text: 'Venues', icon: <PinDropOutlinedIcon />, path: '/venues/' },
            { text: 'Devices', icon: <DeviceHubOutlinedIcon />, path: '/devices/' },
            { text: 'Information', icon: <InfoOutlinedIcon />, path: '/information/' },
            {
                text: 'Report', icon: <AssessmentOutlinedIcon />, children: [
                    { text: 'Venue Status Report', icon: <StarBorder />, path: '/report/venue-status-report/' },
                    { text: 'Venue Summary', icon: <StarBorder />, path: '/report/venue-summary/' },
                    { text: 'Failed Devices Report', icon: <StarBorder />, path: '/report/failed-devices-report/' },
                    { text: 'Venue Personnel', icon: <StarBorder />, path: '/report/venue-personnel/' },
                    { text: 'Missed Inspection', icon: <StarBorder />, path: '/report/missed-inspection/' },
                ]
            },
        );

    } else if (userInfo?.role === "IT") {
        menuItems.push(
            { text: 'Venues', icon: <PinDropOutlinedIcon />, path: '/venues/' },
            { text: 'Devices', icon: <DeviceHubOutlinedIcon />, path: '/devices/' },
        );
    } else if (userInfo?.role === "Auditor") {
        menuItems.push(
            { text: 'Inspections', icon: <ManageSearchOutlinedIcon />, path: '/' },
            { text: 'Venues', icon: <PinDropOutlinedIcon />, path: '/venues/' },
            { text: 'Information', icon: <InfoOutlinedIcon />, path: '/information/' },
        );
    }
    else if (userInfo?.role === "Group Inspector") {
        menuItems.push(
            { text: 'Inspections', icon: <ManageSearchOutlinedIcon />, path: '/' },
            { text: 'Venues', icon: <PinDropOutlinedIcon />, path: '/venues/' },
            { text: 'Devices', icon: <DeviceHubOutlinedIcon />, path: '/devices/' },
            { text: 'Group Inspectors', icon: <Diversity1OutlinedIcon />, path: '/groupinspectors/' },
            { text: 'Information', icon: <InfoOutlinedIcon />, path: '/information/' },
            {
                text: 'Report', icon: <AssessmentOutlinedIcon />, children: [
                    { text: 'Venue Status Report', icon: <StarBorder />, path: '/report/venue-status-report/' },
                    { text: 'Venue Summary', icon: <StarBorder />, path: '/report/venue-summary/' },
                    { text: 'Failed Devices Report', icon: <StarBorder />, path: '/report/failed-devices-report/' },
                    { text: 'Venue Personnel', icon: <StarBorder />, path: '/report/venue-personnel/' },
                    { text: 'Missed Inspection', icon: <StarBorder />, path: '/report/missed-inspection/' },
                ]
            },
        );
    }

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
});

export default Sidebar;
