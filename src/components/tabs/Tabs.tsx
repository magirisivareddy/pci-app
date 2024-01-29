"use client"
import {  useMediaQuery } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppBar } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@emotion/react';

const tabRoutes = [
  { name: "Inspections", path: "/" },
  { name: "Venues", path: "/venues" },
  { name: "Admins", path: "/admins" },
  { name: "Group Inspectors", path: "/groupinspectors" },
  { name: "Devices", path: "/devices" },
];

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  // Find the current tab index based on the route
  const currentTabIndex = tabRoutes.findIndex(route => route.path === router.pathname);

  return (
    <Box sx={{ width: '100%', margin: '0 auto', marginTop: '10px' }}>
      <AppBar position="static" sx={{ background: "#1CA5D4" }}>
        <Tabs
          value={currentTabIndex === -1 ? false : currentTabIndex}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "on" : "auto"}
          allowScrollButtonsMobile
          aria-label="full width tabs example"
        >
          {tabRoutes.map((route, index) => (
            <Link key={route.name} href={route.path} passHref>
              <Tab
                label={route.name}
                value={index}
                {...a11yProps(index)}
                sx={{
                  color: "#fff",
                  '&.Mui-selected': {
                    background: '#00FFFF',
                    color: "#000",
                    borderBottom: '2px solid #00FFFF',
                  }
                }}
              />
            </Link>
          ))}
        </Tabs>
      </AppBar>
    </Box>
  );
}
